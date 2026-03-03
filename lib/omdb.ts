import { MovieData } from "@/types/movie";

const OMDB_BASE_URL = "https://www.omdbapi.com";

interface OMDbResponse {
    Response: "True" | "False";
    Error?: string;
    Title?: string;
    Year?: string;
    Poster?: string;
    imdbRating?: string;
    Plot?: string;
    Actors?: string;
    Genre?: string;
    Director?: string;
    Runtime?: string;
    imdbID?: string;
}

export async function fetchMovieFromOMDb(imdbId: string): Promise<MovieData> {
    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) throw new Error("OMDB_API_KEY is not configured");

    const url = `${OMDB_BASE_URL}/?i=${imdbId}&plot=short&apikey=${apiKey}`;

    const res = await fetch(url, {
        next: { revalidate: 1800 }, // Cache for 30 mins via Next.js fetch cache
    });

    if (!res.ok) throw new Error(`OMDb network error: ${res.status}`);

    const data: OMDbResponse = await res.json();

    if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
    }

    return {
        imdbID: data.imdbID ?? imdbId,
        title: data.Title ?? "Unknown Title",
        year: data.Year ?? "N/A",
        poster: data.Poster && data.Poster !== "N/A" ? data.Poster : "",
        rating: data.imdbRating ?? "N/A",
        plot: data.Plot ?? "No plot available.",
        cast: data.Actors ? data.Actors.split(",").map((a) => a.trim()) : [],
        genre: data.Genre ?? "N/A",
        director: data.Director ?? "N/A",
        runtime: data.Runtime ?? "N/A",
    };
}
