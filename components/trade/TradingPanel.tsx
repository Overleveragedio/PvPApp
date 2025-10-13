"use client"
import { useEffect, useState, useMemo } from "react";
import { clsx } from "clsx";
import { Trophy } from "lucide-react";
import SectionHeading from "../typography/SectionHeading";
import { Competition } from "@/types/competitions";
import { calculateTimeRemainingInSeconds } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface CompetitionTrader {
    rank: number;
    username: string;
    avatar: string;
    gain: string;
    isCurrentUser?: boolean;
}

const TradingPanel = ({ competition }: { competition: Competition }) => {
    const { user } = useAuth();
    const [tradeType, setTradeType] = useState<'Buy' | 'Sell'>('Buy');
    const [size, setSize] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(() =>
        calculateTimeRemainingInSeconds(competition)
    );

    // Transform competition participants into CompetitionTrader format
    const competitionData: CompetitionTrader[] = useMemo(() => {
        if (!competition?.participants || competition.participants.length === 0) {
            return [];
        }

        return competition.participants.map((participant, index) => ({
            rank: index + 1, // TODO: Replace with actual rank from leaderboard API
            username: participant.user.username,
            avatar: participant.user.profilePicture ||
                `https://api.dicebear.com/7.x/pixel-art/svg?seed=${participant.user.username}`,
            gain: "+0.00%", // TODO: Replace with actual gain from leaderboard API
            isCurrentUser: user?.id === participant.user.id
        }));
    }, [competition?.participants, user?.id]);

    useEffect(() => {
        // Recalculate when competition changes
        setTimeRemaining(calculateTimeRemainingInSeconds(competition));

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
    }, [competition]);

    const formatTime = (seconds: number) => {
        const days = Math.floor(seconds / 86400); // 86400 seconds in a day
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m ${secs}s`;
        }
        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        }
        return `${minutes}m ${secs}s`;
    };

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

    return (
        <div className="h-full bg-background border-l border-border flex flex-col">

            {/* Competition Info Header - Fixed */}
            <div className="p-3 bg-slate-800/40 backdrop-blur-md border border-slate-700/50">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-semibold text-white">{competition?.name}</span>
                    </div>
                    <span className="text-xs text-primary font-medium">Live</span>
                </div>
                <div className="text-[11px] text-muted-foreground">
                    Ends in {formatTime(timeRemaining)} • {competition?._count.participants || 0} traders
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
                    <span className="text-foreground">0.00 {competition?.symbol}</span>
                </div>

                {/* Size Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm text-muted-foreground">Size ({competition?.symbol?.split("/")[0]})</label>
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
                        <span>{competition?.leverageSize}x</span>
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
                    {tradeType}
                </button>

                {/* Divider */}
                <div className="border-t border-border"></div>
            </div>

            {/* Leaderboard List - Scrollable */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <SectionHeading className="mb-3">Competitors</SectionHeading>
                {competitionData.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                        No competitors yet
                    </div>
                ) : (
                    <div className="space-y-1">
                        {competitionData.map((trader) => (
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
                                <span className={clsx(
                                    "text-[11px] font-semibold flex-shrink-0",
                                    trader.gain.startsWith('+') ? "text-green-500" : "text-red-500"
                                )}>
                                    {trader.gain}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TradingPanel;