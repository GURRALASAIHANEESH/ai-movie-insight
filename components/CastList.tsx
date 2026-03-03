interface Props {
    cast: string[];
}

const AVATAR_COLORS = [
    "bg-indigo-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-amber-500",
];

export default function CastList({ cast }: Props) {
    if (!cast || cast.length === 0) {
        return (
            <p className="text-sm text-white/40 italic">No cast information available.</p>
        );
    }

    return (
        <div className="flex flex-wrap gap-2">
            {cast.map((actor, index) => (
                <div
                    key={actor}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200"
                >
                    <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]
                            }`}
                    >
                        {actor.charAt(0)}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-white/80">{actor}</span>
                </div>
            ))}
        </div>
    );
}
