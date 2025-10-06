"use client";

interface LeaderboardEntry {
    rank: number;
    username: string;
    avatar: string;
    trades: number;
    totalGainUSD: string;
    percentageGained: string;
}

interface LeaderboardTableProps {
    data: LeaderboardEntry[];
}

const LeaderboardTable = ({ data }: LeaderboardTableProps) => {
    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "text-yellow-400 font-bold";
            case 2:
                return "text-slate-300 font-bold";
            case 3:
                return "text-amber-600 font-bold";
            default:
                return "text-slate-400";
        }
    };

    const getPercentageColor = (percentage: string) => {
        const value = parseFloat(percentage);
        if (value > 0) return "text-green-500";
        if (value < 0) return "text-red-500";
        return "text-slate-400";
    };

    return (
        <div className="space-y-2">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3">
                <div className="col-span-1 text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                    Rank
                </div>
                <div className="col-span-5 text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                    Username
                </div>
                <div className="col-span-3 text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                    Trades
                </div>
                <div className="col-span-3 text-right text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                    Total Gain
                </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
                {data.map((entry) => (
                    <div
                        key={entry.rank}
                        className="bg-background-secondary rounded-lg p-4 grid grid-cols-12 gap-4 items-center hover:bg-background-tertiary transition-colors border border-slate-700/50"
                    >
                        {/* Rank */}
                        <div className="col-span-1">
                            <span className={`text-base font-semibold ${getRankColor(entry.rank)}`}>
                                #{entry.rank}
                            </span>
                        </div>

                        {/* Username with Avatar */}
                        <div className="col-span-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-background-tertiary flex-shrink-0">
                                    <img
                                        src={entry.avatar}
                                        alt={entry.username}
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </div>
                                <span className="text-white font-medium truncate">
                                    {entry.username}
                                </span>
                            </div>
                        </div>

                        {/* Amount of Trades */}
                        <div className="col-span-3">
                            <span className="text-white font-medium">
                                {entry.trades.toLocaleString()}
                            </span>
                        </div>

                        {/* Total Gain - USD and Percentage */}
                        <div className="col-span-3 text-right">
                            <span className={`font-semibold ${getPercentageColor(entry.percentageGained)}`}>
                                ${entry.totalGainUSD} ({parseFloat(entry.percentageGained) > 0 ? '+' : ''}{entry.percentageGained}%)
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardTable;