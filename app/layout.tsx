import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "AI Movie Insight Builder",
    description:
        "Enter an IMDb ID to get movie details and AI-powered audience sentiment analysis.",
    keywords: ["movies", "IMDb", "AI", "sentiment", "film analysis"],
    openGraph: {
        title: "AI Movie Insight Builder",
        description: "AI-powered movie sentiment analysis",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${inter.variable} font-sans antialiased transition-colors duration-300`}
            >
                {children}
            </body>
        </html>
    );
}
