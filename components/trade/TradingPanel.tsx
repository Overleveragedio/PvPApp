"use client"
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ChevronDown, Trophy } from "lucide-react";
import SectionHeading from "../typography/SectionHeading";

interface CompetitionTrader {
    rank: number;
    username: string;
    avatar: string;
    gain: string;
    isCurrentUser?: boolean;
}

const mockCompetitionData: CompetitionTrader[] = [
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
        gain: "+25.67%",
        isCurrentUser: true
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

const TradingPanel = () => {
    const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Pro'>('Market');
    const [tradeType, setTradeType] = useState<'Buy' | 'Sell'>('Buy');
    const [size, setSize] = useState('');
    const [leverage, setLeverage] = useState(52);
    const [asset, setAsset] = useState('');
    // Timer state - Initialize with 42 minutes and 18 seconds (in seconds)
    const [timeRemaining, setTimeRemaining] = useState(42 * 60 + 18);

    const orderTypes = ['Market'] as const;

    const handleLeverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLeverage(Number(e.target.value));
    };

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1:
                return "text-yellow-400";
            case 2:
                return "text-slate-300";
            case 3:
                return "text-amber-600";
            default:
                return "text-slate-400";
        }
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        }
        return `${minutes}m ${secs}s`;
    };

    return (
        <div className="h-full bg-background border-l border-border flex flex-col">

            {/* Competition Info Header - Fixed */}
            <div className="p-3 bg-slate-800/40 backdrop-blur-md border border-slate-700/50">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-semibold text-white">Bitcoin Bull Run Championship</span>
                    </div>
                    <span className="text-xs text-primary font-medium">Live</span>
                </div>
                <div className="text-[11px] text-muted-foreground">
                    Ends in {formatTime(timeRemaining)} • {mockCompetitionData.length} traders
                </div>
            </div>

            {/* Order Type Tabs */}
            {/* <div className="border-b border-border bg-background-secondary">
                <div className="flex">
                    {orderTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setOrderType(type)}
                            className={clsx(
                                "flex-1 px-4 py-3 text-sm font-medium transition-colors relative",
                                orderType === type
                                    ? "text-primary border-b-2 border-primary bg-background"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div> */}

            {/* Trading Section - No Scroll */}
            <div className="p-4 space-y-4">
                {/* Buy/Sell Toggle */}
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setTradeType('Buy')}
                        className={clsx(
                            "py-2 px-4 rounded text-sm font-medium transition-colors",
                            tradeType === 'Buy'
                                ? "bg-green-600 text-white"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setTradeType('Sell')}
                        className={clsx(
                            "py-2 px-4 rounded text-sm font-medium transition-colors",
                            tradeType === 'Sell'
                                ? "bg-destructive text-white"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Sell
                    </button>
                </div>

                {/* Available to Trade */}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Available to Trade</span>
                    <span className="text-foreground">0.00 BTC</span>
                </div>

                {/* Size Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm text-muted-foreground">Size</label>
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-foreground">{asset}</span>
                            <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        </div>
                    </div>
                    <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-input border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                </div>

                {/* Additional Trading Info */}
                <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                        <span>Est. Margin</span>
                        <span>50x</span>
                    </div>
                </div>

                {/* Place Order Button */}
                <button
                    className={clsx(
                        "w-full py-1 rounded font-medium transition-colors",
                        tradeType === 'Buy'
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-destructive hover:bg-destructive/90 text-white"
                    )}
                >
                    {tradeType} {asset}
                </button>

                {/* Divider */}
                <div className="border-t border-border"></div>
            </div>

            {/* Leaderboard List - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <SectionHeading className="mb-3">Competitors</SectionHeading>
                <div className="space-y-1">
                    {mockCompetitionData.map((trader) => (
                        <div
                            key={trader.rank}
                            className={clsx(
                                "flex items-center gap-2 p-2 rounded-lg transition-colors",
                                trader.isCurrentUser
                                    ? "bg-primary/10 border border-primary/30"
                                    : "bg-slate-800/30 hover:bg-slate-800/50"
                            )}
                        >
                            {/* Rank with Trophy */}
                            <div className="flex items-center justify-center w-5 flex-shrink-0">
                                {trader.rank <= 3 ? (
                                    <Trophy
                                        className={`w-3.5 h-3.5 ${getTrophyColor(trader.rank)}`}
                                        fill="currentColor"
                                    />
                                ) : (
                                    <span className={`text-[11px] font-semibold ${getRankColor(trader.rank)}`}>
                                        {trader.rank}
                                    </span>
                                )}
                            </div>

                            {/* Avatar */}
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-background-tertiary flex-shrink-0 ring-1 ring-slate-700/50">
                                <img
                                    src={trader.avatar}
                                    alt={trader.username}
                                    className="w-full h-full object-cover"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            </div>

                            {/* Username */}
                            <div className="flex-1 min-w-0">
                                <span className="text-white text-[11px] font-medium truncate block">
                                    {trader.username}
                                </span>
                                {trader.isCurrentUser && (
                                    <span className="text-primary text-[9px]">You</span>
                                )}
                            </div>

                            {/* Gain */}
                            <span className="text-green-500 text-[11px] font-semibold flex-shrink-0">
                                {trader.gain}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TradingPanel;