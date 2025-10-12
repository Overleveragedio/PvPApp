import { Skeleton } from "@/components/ui/skeleton";

const CompetitionCardSkeleton = () => {
    return (
        <div className="bg-[#252D36] border border-slate-700/50 rounded-xl p-6">
            {/* Status badges */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-24 rounded-full !bg-slate-700/40" />
                    <Skeleton className="h-7 w-16 rounded-full !bg-slate-700/40" />
                </div>
            </div>

            {/* Title and Description */}
            <div className="mb-6">
                <Skeleton className="h-6 w-3/4 mb-2 !bg-slate-700/40" />
                <Skeleton className="h-4 w-full mb-1 !bg-slate-700/40" />
                <Skeleton className="h-4 w-5/6 !bg-slate-700/40" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <Skeleton className="h-3 w-20 mb-2 !bg-slate-700/40" />
                    <Skeleton className="h-6 w-24 !bg-slate-700/40" />
                </div>
                <div>
                    <Skeleton className="h-3 w-20 mb-2 !bg-slate-700/40" />
                    <Skeleton className="h-6 w-16 !bg-slate-700/40" />
                </div>
                <div>
                    <Skeleton className="h-3 w-20 mb-2 !bg-slate-700/40" />
                    <Skeleton className="h-6 w-16 !bg-slate-700/40" />
                </div>
                <div>
                    <Skeleton className="h-3 w-20 mb-2 !bg-slate-700/40" />
                    <Skeleton className="h-6 w-20 !bg-slate-700/40" />
                </div>
            </div>

            {/* Trading Pair */}
            <div className="flex gap-2 mb-6">
                <Skeleton className="h-7 w-24 rounded-lg !bg-slate-700/40" />
            </div>

            {/* Action Button */}
            <Skeleton className="h-11 w-full rounded-lg !bg-slate-700/40" />
        </div>
    );
};

export default CompetitionCardSkeleton;