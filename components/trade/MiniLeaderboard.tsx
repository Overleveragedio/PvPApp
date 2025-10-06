"use client";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
    rank: number;
    username: string;
    avatar: string;
    gain: string;
}

const mockData: LeaderboardEntry[] = [
    {
        rank: 1,
        username: "BabyKnight",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=BabyKnight",
        gain: "+45.32%"
    },
    {
        rank: 2,
        username: "Rootless",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rootless",
        gain: "+38.75%"
    },
    {
        rank: 3,
        username: "Teodor2000",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Teodor2000",
        gain: "+32.18%"
    },
    {
        rank: 4,
        username: "CryptoNinja",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=CryptoNinja",
        gain: "+28.94%"
    },
    {
        rank: 5,
        username: "MoonWalker",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=MoonWalker",
        gain: "+25.67%"
    }
];

const MiniLeaderboard = () => {
    const getTrophyColor = (rank: number) => {
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

    return (
        <div className="bg-slate-800/40 backdrop-blur-md rounded-lg border border-slate-700/50 p-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <h3 className="text-white font-semibold text-sm">Top Traders</h3>
                </div>
                <a href="/leaderboard" className="text-primary text-xs hover:underline">
                    View All
                </a>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-2">
                {mockData.map((entry) => (
                    <div
                        key={entry.rank}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition-colors"
                    >
                        {/* Rank */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {entry.rank <= 3 ? (
                                <Trophy
                                    className={`w-3.5 h-3.5 ${getTrophyColor(entry.rank)}`}
                                    fill="currentColor"
                                />
                            ) : (
                                <span className="text-slate-500 text-xs font-medium w-3.5 text-center">
                                    {entry.rank}
                                </span>
                            )}
                        </div>

                        {/* Avatar */}
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-background-tertiary flex-shrink-0">
                            <img
                                src={entry.avatar}
                                alt={entry.username}
                                className="w-full h-full object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>

                        {/* Username */}
                        <span className="text-white text-xs font-medium flex-1 truncate">
                            {entry.username}
                        </span>

                        {/* Gain */}
                        <span className="text-green-500 text-xs font-semibold flex-shrink-0">
                            {entry.gain}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MiniLeaderboard;