"use client";

import { useState } from "react";

interface Props {
    onSearch: (id: string) => void;
    isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: Props) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    function validate(id: string): boolean {
        if (!id.trim()) {
            setError("Please enter an IMDb ID.");
            return false;
        }
        if (!/^tt\d{7,8}$/.test(id.trim())) {
            setError("Invalid format. Use: tt1234567 or tt12345678");
            return false;
        }
        setError("");
        return true;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (validate(value)) onSearch(value.trim());
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        if (error) validate(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="Enter IMDb ID — e.g. tt0133093"
                        disabled={isLoading}
                        className={`w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 text-sm outline-none transition-all duration-200
              focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-rose-500/60" : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20"}`}
                    />
                    {error && (
                        <p className="absolute -bottom-5 left-1 text-xs text-rose-400">{error}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                >
                    {isLoading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                    stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                            </svg>
                            Analyze
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
