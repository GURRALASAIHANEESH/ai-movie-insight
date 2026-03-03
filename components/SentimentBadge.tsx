import { SentimentResult } from "@/types/movie";

interface Props {
    sentiment: SentimentResult;
}

const SENTIMENT_CONFIG = {
    positive: {
        label: "Positive",
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/40",
        text: "text-emerald-400",
        dot: "bg-emerald-400",
        bar: "bg-emerald-400",
    },
    mixed: {
        label: "Mixed",
        bg: "bg-amber-500/20",
        border: "border-amber-500/40",
        text: "text-amber-400",
        dot: "bg-amber-400",
        bar: "bg-amber-400",
    },
    negative: {
        label: "Negative",
        bg: "bg-rose-500/20",
        border: "border-rose-500/40",
        text: "text-rose-400",
        dot: "bg-rose-400",
        bar: "bg-rose-400",
    },
};

export default function SentimentBadge({ sentiment }: Props) {
    const config = SENTIMENT_CONFIG[sentiment.sentiment];
    const confidencePct = Math.round(sentiment.confidence * 100);

    return (
        <div
            className={`rounded-xl border p-4 ${config.bg} ${config.border} animate-fade-in-delay-3`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                    <span className="text-sm font-semibold text-gray-600 dark:text-white/80 uppercase tracking-wider">
                        AI Sentiment
                    </span>
                </div>
                <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${config.bg} ${config.border} ${config.text}`}
                >
                    {config.label}
                </span>
            </div>

            {/* Summary */}
            <p className="text-sm text-gray-700 dark:text-white/70 leading-relaxed mb-3">
                {sentiment.summary}
            </p>

            {/* Confidence bar */}
            {confidencePct > 0 && (
                <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-white/40">
                        <span>Confidence</span>
                        <span>{confidencePct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ${config.bar}`}
                            style={{ width: `${confidencePct}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
