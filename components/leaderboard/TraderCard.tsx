"use client";
import { Trophy } from "lucide-react";

interface TraderCardProps {
    rank: number;
    name: string;
    avatar: string;
    rankBadge: string;
    latestStats: string;
    winRate: string;
    kda: string;
}

const TraderCard = ({
    rank,
    name,
    avatar,
    rankBadge,
    latestStats,
    winRate,
    kda
}: TraderCardProps) => {
    const getTrophyColor = () => {
        switch (rank) {
            case 1:
                return "text-yellow-400";
            case 2:
                return "text-slate-300";
            case 3:
                return "text-amber-600";
            default:
                return "text-slate-500";
        }
    };

    const getWinRateColor = () => {
        const rate = parseInt(winRate);
        if (rate >= 60) return "text-green-500";
        if (rate >= 50) return "text-primary";
        return "text-slate-400";
    };

    const getProgressColor = () => {
        switch (rank) {
            case 1:
                return "bg-yellow-500";
            case 2:
                return "bg-slate-400";
            case 3:
                return "bg-amber-600";
            default:
                return "bg-slate-600";
        }
    };

    return (
        <div className="bg-background-secondary rounded-lg p-4 flex items-center gap-4 hover:bg-background-tertiary transition-colors border border-slate-700/50">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-background-tertiary">
                    <img
                        src={avatar}
                        alt={name}
                        className="w-full h-full object-cover"
                        style={{ imageRendering: 'pixelated' }}
                    />
                </div>
            </div>

            {/* Trophy Icon with Rank Number */}
            <div className="flex-shrink-0 relative">
                <Trophy
                    className={`w-6 h-6 ${getTrophyColor()}`}
                    fill="currentColor"
                />
                <span className="absolute inset-0 flex -mt-2 items-center justify-center text-[10px] font-bold text-background-secondary" style={{ paddingTop: '2px' }}>
                    {rank}
                </span>
            </div>

            {/* Info Section */}
            <div className="flex-1 min-w-0">
                {/* Name and Badge */}
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold text-base truncate">
                        {name}
                    </h3>
                </div>

                {/* Rank Badge */}
                <div className="flex items-center gap-1 mb-3">
                    <svg className="w-3 h-3 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-slate-400 text-xs uppercase tracking-wide">
                        {rankBadge}
                    </span>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                        <p className="text-muted-foreground text-[10px] uppercase mb-1">Placed/Played</p>
                        <p className="text-white text-sm font-medium">{latestStats}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-[10px] uppercase mb-1">Win rate</p>
                        <p className={`text-sm font-medium ${getWinRateColor()}`}>{winRate}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-[10px] uppercase mb-1">Earnings</p>
                        <p className="text-white text-sm font-medium">{kda}</p>
                    </div>
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-1 bg-background-tertiary rounded-full overflow-hidden">
                        <div className={`h-full ${getProgressColor()}`} style={{ width: '70%' }}></div>
                    </div>
                    <div className="h-1 bg-background-tertiary rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: winRate }}></div>
                    </div>
                    <div className="h-1 bg-background-tertiary rounded-full overflow-hidden">
                        <div className={`h-full ${getProgressColor()}`} style={{ width: '60%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TraderCard;