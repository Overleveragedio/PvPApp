import { Trophy, Users, DollarSign, Clock, ChevronRight } from "lucide-react";
import Button from "@/components/Button";
import { Competition } from "@/types/competitions";
import { formatPrizePool, formatEntryFee, formatLeverage, formatParticipants, calculateTimeRemaining, calculateTimeToStart } from "@/lib/utils";
import JoinCompetitionModal from "../modals/JoinCompetitionModal";
import { useState } from "react";

interface CompetitionCardProps {
    competition: Competition;
    currentParticipants?: number; // This might come from a separate API call or join data
}

const CompetitionCard = ({ competition }: CompetitionCardProps) => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    const getStatusBadge = () => {
        const leverage = formatLeverage(competition.leverageSize);

        switch (competition.status) {
            case "ENDED":
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
            default: // PENDING
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

    const showViewResults = competition.status === "ENDED";

    const getTimeDisplay = () => {
        if (competition.status === "LIVE") {
            return calculateTimeRemaining(competition);
        } else if (competition.status === "PENDING") {
            return calculateTimeToStart(competition);
        }
        return null;
    };
    const timeDisplay = getTimeDisplay();
    const timeLabel = competition.status === "LIVE" ? "Ends In" : "Starts In";

    return (
        <>
            <div className="bg-[#252D36] border border-slate-700/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-200">
                {/* Status and Leverage */}
                <div className="flex items-center justify-between mb-4">
                    {getStatusBadge()}
                </div>

                {/* Title and Description */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{competition.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{competition.description}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <Trophy className="w-3 h-3" />
                            Prize Pool
                        </div>
                        <div className="text-lg font-bold text-white">{formatPrizePool(competition.prizePool)}</div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <Users className="w-3 h-3" />
                            Participants
                        </div>
                        <div className="text-lg font-bold text-white">{formatParticipants(competition)}</div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                            <DollarSign className="w-3 h-3" />
                            Entry Fee
                        </div>
                        <div className="text-lg font-bold text-white">{formatEntryFee(competition.entryFee)}</div>
                    </div>

                    {timeDisplay && (
                        <div>
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Clock className="w-3 h-3" />
                                {timeLabel}
                            </div>
                            <div className={`text-lg font-bold ${competition.status === "LIVE" ? "text-red-400" : "text-blue-400"}`}>
                                {timeDisplay}
                            </div>
                        </div>
                    )}

                </div>

                {/* Trading Pairs */}
                <div className="flex gap-2 mb-6">
                    <span className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-lg text-sm">
                        {competition.symbol}
                    </span>
                </div>

                {/* Action Button */}
                {showViewResults ? (
                    <button className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Trophy className="w-4 h-4" />
                        View Results
                    </button>
                ) : (
                    <Button onClick={() => setIsJoinModalOpen(true)} className="w-full flex items-center justify-center gap-2">
                        Join Now
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                )}

                <JoinCompetitionModal
                    isOpen={isJoinModalOpen}
                    onClose={() => setIsJoinModalOpen(false)}
                    competition={competition}
                />
            </div>

        </>
    );
};

export default CompetitionCard;