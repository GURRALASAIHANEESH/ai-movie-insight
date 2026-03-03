import { NextRequest, NextResponse } from "next/server";
import { fetchMovieFromOMDb } from "@/lib/omdb";
import { analyzeSentiment } from "@/lib/sentiment";
import { movieCache } from "@/lib/cache";
import { isValidImdbId, sanitizeImdbId } from "@/lib/validators";
import { ApiErrorResponse, MovieInsight } from "@/types/movie";

// Simple in-memory rate limiter: max 10 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
        return false;
    }

    if (entry.count >= 10) return true;

    entry.count += 1;
    return false;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    // --- Rate Limiting ---
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json<ApiErrorResponse>(
            { error: "Too many requests. Please wait a moment.", code: "RATE_LIMIT" },
            { status: 429 }
        );
    }

    // --- Input Validation ---
    const { searchParams } = new URL(req.url);
    const rawId = searchParams.get("id") ?? "";

    if (!rawId) {
        return NextResponse.json<ApiErrorResponse>(
            { error: "IMDb ID is required.", code: "INVALID_ID" },
            { status: 400 }
        );
    }

    const imdbId = sanitizeImdbId(rawId);

    if (!isValidImdbId(imdbId)) {
        return NextResponse.json<ApiErrorResponse>(
            {
                error: "Invalid IMDb ID format. Expected format: tt1234567",
                code: "INVALID_ID",
            },
            { status: 400 }
        );
    }

    // --- Cache Check ---
    const cached = movieCache.get<MovieInsight>(imdbId);
    if (cached) {
        return NextResponse.json<MovieInsight>(cached, {
            status: 200,
            headers: { "X-Cache": "HIT" },
        });
    }

    // --- Fetch Movie Data ---
    let movie;
    try {
        movie = await fetchMovieFromOMDb(imdbId);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";

        if (message.toLowerCase().includes("not found")) {
            return NextResponse.json<ApiErrorResponse>(
                { error: `No movie found for ID "${imdbId}".`, code: "NOT_FOUND" },
                { status: 404 }
            );
        }

        return NextResponse.json<ApiErrorResponse>(
            { error: "Failed to fetch movie data. Please try again.", code: "API_FAILURE" },
            { status: 502 }
        );
    }

    // --- AI Sentiment Analysis ---
    const sentiment = await analyzeSentiment(movie.title, movie.plot, movie.cast);

    // --- Build & Cache Response ---
    const result: MovieInsight = { movie, sentiment };
    movieCache.set(imdbId, result);

    return NextResponse.json<MovieInsight>(result, {
        status: 200,
        headers: { "X-Cache": "MISS" },
    });
}
