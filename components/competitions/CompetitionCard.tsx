import { Trophy, Users, DollarSign, Clock, ChevronRight } from "lucide-react";
import Button from "@/components/Button";

interface CompetitionCardProps {
    status: "COMPLETED" | "LIVE" | "UPCOMING";
    leverage: string;
    title: string;
    description: string;
    prizePool: string;
    participants: string;
    entryFee: string;
    endsIn?: string;
    tradingPairs: string[];
    showViewResults?: boolean;
}

const CompetitionCard = ({
    status,
    leverage,
    title,
    description,
    prizePool,
    participants,
    entryFee,
    endsIn,
    tradingPairs,
    showViewResults = false
}: CompetitionCardProps) => {
    const getStatusBadge = () => {
        switch (status) {
            case "COMPLETED":
                return (
                    <div className="flex items-center gap-2">
                        <span className="bg-slate-600/50 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
                            ● COMPLETED
                        </span>
                        <span className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {leverage}
                        </span>
                    </div>
                );
            case "LIVE":
                return (
                    <div className="flex items-center gap-2">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                            ● LIVE
                        </span>
                        <span className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {leverage}
                        </span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-2">
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                            ● UPCOMING
                        </span>
                        <span className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {leverage}
                        </span>
                    </div>
                );
        }
    };

    return (
        <div className="bg-[#252D36] border border-slate-700/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-200">
            {/* Status and Leverage */}
            <div className="flex items-center justify-between mb-4">
                {getStatusBadge()}
            </div>

            {/* Title and Description */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <Trophy className="w-3 h-3" />
                        Prize Pool
                    </div>
                    <div className="text-lg font-bold text-white">{prizePool}</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <Users className="w-3 h-3" />
                        Participants
                    </div>
                    <div className="text-lg font-bold text-white">{participants}</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                        <DollarSign className="w-3 h-3" />
                        Entry Fee
                    </div>
                    <div className="text-lg font-bold text-white">{entryFee}</div>
                </div>
                {endsIn && (
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <Clock className="w-3 h-3" />
                            Ends In
                        </div>
                        <div className="text-lg font-bold text-red-400">{endsIn}</div>
                    </div>
                )}
            </div>

            {/* Trading Pairs */}
            <div className="flex gap-2 mb-6">
                {tradingPairs.map((pair, index) => (
                    <span key={index} className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-lg text-sm">
                        {pair}
                    </span>
                ))}
            </div>

            {/* Action Button */}
            {showViewResults ? (
                <button className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4" />
                    View Results
                </button>
            ) : (
                <Button className="w-full flex items-center justify-center gap-2">
                    Trade Now
                    <ChevronRight className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
};

export default CompetitionCard;