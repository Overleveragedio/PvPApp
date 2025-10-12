'use client'

import { Trophy, User, Clock, Sparkles, StarIcon } from "lucide-react";
import Button from "@/components/Button";
import { Competition } from "@/types/competitions";
import { formatEntryFee, calculateTimeRemaining, calculateTimeToStart } from "@/lib/utils";
import { useState } from "react";
import JoinCompetitionModal from "@/components/modals/JoinCompetitionModal";

interface FeaturedCompetitionCardProps {
    competition: Competition;
}

const FeaturedCompetitionCard = ({ competition }: FeaturedCompetitionCardProps) => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    // Calculate participation percentage
    const participationPercentage = Math.round(
        (competition._count.participants / competition.maxParticipants) * 100
    );

    // Get status badge
    const getStatusBadge = () => {
        switch (competition.status) {
            case "LIVE":
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm font-medium">LIVE</span>
                    </div>
                );
            case "PENDING":
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-blue-400 text-sm font-medium">UPCOMING</span>
                    </div>
                );
            case "ENDED":
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span className="text-slate-400 text-sm font-medium">COMPLETED</span>
                    </div>
                );
            default:
                return null;
        }
    };
    const getTimeDisplay = () => {
        if (competition.status === "LIVE") {
            return calculateTimeRemaining(competition);
        } else if (competition.status === "PENDING") {
            return calculateTimeToStart(competition);
        }
        return null;
    };

    const timeDisplay = getTimeDisplay();
    const timeLabel = competition.status === "LIVE" ? "Time Remaining" : "Starts In";

    return (
        <>
            <div className="py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-8 md:p-12">

                        {/* Header: Featured Badge + Status */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                        <StarIcon size={15} /> Featured Competition
                                    </span>
                                </div>
                            </div>
                            {getStatusBadge()}
                        </div>

                        {/* Competition Title & Description */}
                        <div className="mb-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {competition.name}
                            </h3>
                            <p className="text-slate-400 text-base md:text-lg">
                                {competition.description}
                            </p>
                        </div>

                        {/* Competition Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                    <Trophy className="w-4 h-4" />
                                    Prize Pool
                                </div>
                                <div className="text-2xl font-bold text-primary">
                                    ${competition.prizePool.toLocaleString()}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                    <User className="w-4 h-4" />
                                    Participants
                                </div>
                                <div className="text-2xl font-bold text-white mb-2">
                                    {competition._count.participants}/{competition.maxParticipants}
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${participationPercentage}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                    <Trophy className="w-4 h-4" />
                                    Entry Fee
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {formatEntryFee(competition.entryFee)}
                                </div>
                            </div>

                            {timeDisplay && (
                                <div>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                        <Clock className="w-4 h-4" />
                                        {timeLabel}
                                    </div>
                                    <div className={`text-2xl font-bold ${competition.status === "LIVE" ? "text-red-400" : "text-blue-400"}`}>
                                        {timeDisplay}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Trading Pair Badge */}
                        <div className="mb-6">
                            <span className="bg-slate-700/50 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium">
                                {competition.symbol}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {competition.status === "ENDED" ? (
                                <Button className="flex-1" variant="secondary">
                                    <Trophy className="w-4 h-4" />
                                    View Results
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        className="flex-1"
                                        onClick={() => setIsJoinModalOpen(true)}
                                    >
                                        <Trophy className="w-4 h-4" />
                                        Join Competition
                                    </Button>
                                    <Button variant="secondary" className="sm:w-auto">
                                        View Details →
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Join Competition Modal */}
            <JoinCompetitionModal
                isOpen={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                competition={competition}
            />
        </>
    );
};

export default FeaturedCompetitionCard;