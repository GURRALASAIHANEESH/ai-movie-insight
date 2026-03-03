export default function SkeletonLoader() {
    return (
        <div className="w-full max-w-4xl mx-auto mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Poster skeleton */}
                <div className="skeleton w-full md:w-56 h-80 rounded-xl flex-shrink-0" />

                {/* Details skeleton */}
                <div className="flex-1 space-y-4">
                    <div className="skeleton h-8 w-3/4 rounded-lg" />
                    <div className="skeleton h-4 w-1/3 rounded-md" />
                    <div className="skeleton h-4 w-1/4 rounded-md" />

                    <div className="space-y-2 pt-2">
                        <div className="skeleton h-3 w-full rounded-md" />
                        <div className="skeleton h-3 w-full rounded-md" />
                        <div className="skeleton h-3 w-2/3 rounded-md" />
                    </div>

                    {/* Cast skeleton */}
                    <div className="flex gap-2 flex-wrap pt-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="skeleton h-7 w-24 rounded-full" />
                        ))}
                    </div>

                    {/* Sentiment skeleton */}
                    <div className="skeleton h-24 w-full rounded-xl mt-4" />
                </div>
            </div>
        </div>
    );
}
