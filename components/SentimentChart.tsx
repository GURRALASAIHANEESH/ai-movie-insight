"use client";

import { SentimentResult } from "@/types/movie";

interface Props {
    sentiment: SentimentResult;
}

const BARS = [
    { label: "Positive", key: "positive", color: "bg-emerald-400" },
    { label: "Mixed", key: "mixed", color: "bg-amber-400" },
    { label: "Negative", key: "negative", color: "bg-rose-400" },
];

function getBarWidths(sentiment: "positive" | "mixed" | "negative", confidence: number) {
    const high = Math.round(confidence * 100);
    const low = Math.round(((1 - confidence) / 2) * 100);

    return {
        positive: sentiment === "positive" ? high : sentiment === "mixed" ? low + 10 : low,
        mixed: sentiment === "mixed" ? high : 40,
        negative: sentiment === "negative" ? high : sentiment === "mixed" ? low + 10 : low,
    };
}

export default function SentimentChart({ sentiment }: Props) {
    const widths = getBarWidths(sentiment.sentiment, sentiment.confidence);

    return (
        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                Sentiment Distribution
            </p>
            {BARS.map(({ label, key, color }) => (
                <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-white/60">
                        <span>{label}</span>
                        <span>{widths[key as keyof typeof widths]}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${color} transition-all duration-700`}
                            style={{ width: `${widths[key as keyof typeof widths]}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
