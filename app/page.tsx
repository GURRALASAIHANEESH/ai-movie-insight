"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import MovieCard from "@/components/MovieCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import ThemeToggle from "@/components/ThemeToggle";
import { MovieInsight, ApiErrorResponse } from "@/types/movie";

const EXAMPLE_IDS = ["tt0133093", "tt0111161", "tt0468569"];

export default function Home() {
    const [insight, setInsight] = useState<MovieInsight | null>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSearch(imdbId: string) {
        setIsLoading(true);
        setError("");
        setInsight(null);

        try {
            const res = await fetch(`/api/movie?id=${encodeURIComponent(imdbId)}`);
            const data = await res.json();

            if (!res.ok) {
                const errData = data as ApiErrorResponse;
                setError(errData.error ?? "Something went wrong. Please try again.");
                return;
            }

            setInsight(data as MovieInsight);
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-white px-4 py-12 transition-colors duration-300">

            {/* Header */}
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h6l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
                            Movie Insight
                        </span>
                    </div>
                    <ThemeToggle />
                </div>

                {/* Hero */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-indigo-600 to-indigo-400 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent pb-2">
                        AI Movie Insight Builder
                    </h1>
                    <p className="text-gray-500 dark:text-white/50 text-base sm:text-lg max-w-lg mx-auto">
                        Enter an IMDb ID to instantly get movie details and an
                        AI-powered audience sentiment analysis.
                    </p>
                </div>

                {/* Search */}
                <SearchForm onSearch={handleSearch} isLoading={isLoading} />

                {/* Example IDs */}
                <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                    <span className="text-xs text-gray-400 dark:text-white/30">Try:</span>
                    {EXAMPLE_IDS.map((id) => (
                        <button
                            key={id}
                            onClick={() => handleSearch(id)}
                            disabled={isLoading}
                            className="text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 underline underline-offset-2 transition-colors disabled:opacity-40"
                        >
                            {id}
                        </button>
                    ))}
                </div>

                {/* Error State */}
                {error && (
                    <div className="mt-10 max-w-4xl mx-auto px-5 py-4 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-start gap-3 animate-fade-in">
                        <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <p className="text-sm text-rose-300">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && <SkeletonLoader />}

                {/* Result */}
                {!isLoading && insight && <MovieCard data={insight} />}

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 dark:text-white/20 mt-16">
                    Powered by OMDb API + Groq AI · Built with Next.js
                </p>
            </div>
        </main>
    );
}
