"use client";

import Image from "next/image";
import { useState } from "react";
import { MovieInsight } from "@/types/movie";
import SentimentBadge from "./SentimentBadge";
import CastList from "./CastList";
import SentimentChart from "./SentimentChart";

interface Props {
    data: MovieInsight;
}

export default function MovieCard({ data }: Props) {
    const { movie, sentiment } = data;
    const [copied, setCopied] = useState(false);

    function copySummary() {
        navigator.clipboard.writeText(sentiment.summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur-sm overflow-hidden animate-fade-in">
            <div className="flex flex-col md:flex-row gap-0">

                {/* Poster */}
                <div className="relative w-full md:w-56 h-80 md:h-auto flex-shrink-0 bg-white/5">
                    {movie.poster ? (
                        <Image
                            src={movie.poster}
                            alt={`${movie.title} poster`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 224px"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">
                            No Poster
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-5">

                    {/* Title + Meta */}
                    <div className="animate-fade-in-delay-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                            {movie.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-white/50">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.runtime}</span>
                            <span>•</span>
                            <span>{movie.genre}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-yellow-400 font-semibold text-sm">{movie.rating}</span>
                            <span className="text-white/30 text-xs ml-1">IMDb</span>
                        </div>
                    </div>

                    {/* Plot */}
                    <div className="animate-fade-in-delay-2">
                        <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">{movie.plot}</p>
                        <p className="text-xs text-gray-400 dark:text-white/30 mt-1">Dir. {movie.director}</p>
                    </div>

                    {/* Cast */}
                    <div className="animate-fade-in-delay-2">
                        <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                            Cast
                        </p>
                        <CastList cast={movie.cast} />
                    </div>

                    {/* Sentiment Badge */}
                    <SentimentBadge sentiment={sentiment} />

                    {/* Sentiment Chart */}
                    <SentimentChart sentiment={sentiment} />

                    {/* Copy Button */}
                    <button
                        onClick={copySummary}
                        className="flex items-center gap-2 text-xs text-gray-400 dark:text-white/50 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                    >
                        {copied ? (
                            <>
                                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-emerald-400">Copied!</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy AI Summary
                            </>
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
}
