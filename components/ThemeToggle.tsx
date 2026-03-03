"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const dark = stored ? stored === "dark" : true; // Default to dark mode
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    function toggle() {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    }

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-200 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white"
        >
            {isDark ? (
                // Sun icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71M17.66 17.66l.71.71M6.34 6.34l.71.71M12 7a5 5 0 100 10A5 5 0 0012 7z" />
                </svg>
            ) : (
                // Moon icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            )}
        </button>
    );
}
