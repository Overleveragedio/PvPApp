"use client";
import { Trophy } from "lucide-react";

interface TraderTickerItem {
    rank: number;
    username: string;
    avatar: string;
    gain: string;
}

const topTraders: TraderTickerItem[] = [
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
    },
    {
        rank: 6,
        username: "DiamondHands",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=DiamondHands",
        gain: "+22.41%"
    },
    {
        rank: 7,
        username: "WhaleTrader",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=WhaleTrader",
        gain: "+19.85%"
    },
    {
        rank: 8,
        username: "BullRunner",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=BullRunner",
        gain: "+15.23%"
    },
    {
        rank: 9,
        username: "SatoshiFan",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=SatoshiFan",
        gain: "+12.56%"
    },
    {
        rank: 10,
        username: "DegenKing",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=DegenKing",
        gain: "+8.94%"
    }
];

const TraderTicker = () => {
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

    // Duplicate the array for seamless infinite scroll
    const duplicatedTraders = [...topTraders, ...topTraders];

    return (
        <div className="relative backdrop-blur-md border-b border-slate-700/50 overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900/50 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling content */}
            <div className="flex animate-scroll hover:pause-animation">
                {duplicatedTraders.map((trader, index) => (
                    <div
                        key={`${trader.rank}-${index}`}
                        className="flex items-center gap-2 px-4 py-1 flex-shrink-0 border-r border-slate-700/30"
                    >
                        {/* Rank with Trophy */}
                        <div className="flex items-center gap-1">
                            {trader.rank <= 3 ? (
                                <Trophy
                                    className={`w-3.5 h-3.5 ${getTrophyColor(trader.rank)}`}
                                    fill="currentColor"
                                />
                            ) : (
                                <span className="text-slate-400 text-xs font-semibold">
                                    #{trader.rank}
                                </span>
                            )}
                        </div>

                        {/* Avatar */}
                        <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-slate-700/50">
                            <img
                                src={trader.avatar}
                                alt={trader.username}
                                className="w-full h-full object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>

                        {/* Username */}
                        <span className="text-white text-xs font-medium">
                            {trader.username}
                        </span>

                        {/* Gain */}
                        <span className="text-green-500 text-xs font-semibold">
                            {trader.gain}
                        </span>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll {
                    display: flex;
                    animation: scroll 40s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

export default TraderTicker;