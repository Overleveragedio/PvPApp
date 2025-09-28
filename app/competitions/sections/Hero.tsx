'use client'

import { Trophy, TrendingUp, Users, Clock, User, StarIcon, Sparkles } from "lucide-react";
import Button from "@/components/Button";
import SectionHeading from "@/components/typography/SectionHeading";
import JoinCompetitionModal from "@/components/modals/JoinCompetitionModal";
import { useState } from "react";

const Hero = () => {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    const featuredCompetition = {
        title: "Bitcoin Bull Run Championship",
        buyIn: "$100",
        filled: "87/100",
        tradingPairs: "BTC/USDT",
        length: "24 Hours",
        maxParticipants: "100",
        payoutStructure: [
            { position: 1, amount: "$5000.00", trophy: true },
            { position: 2, amount: "$2000.00", trophy: true },
            { position: 3, amount: "$1000.00", trophy: true },
            { position: 4, amount: "$500.00" },
            { position: 5, amount: "$300.00" },
            { position: 6, amount: "$200.00" },
            { position: 7, amount: "$150.00" },
            { position: 8, amount: "$100.00" },
            { position: 9, amount: "$75.00" },
            { position: 10, amount: "$50.00" },
        ]
    };

    return (
        <>
            <section className="mt-20">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <SectionHeading size="6xl" className="mb-4">
                            Trading Competitions
                        </SectionHeading>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Join live competitions and compete for real prizes. Test your trading
                            skills against the best.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                        <div className="bg-background-tertiary border border-primary/20 rounded-xl p-6 text-center">
                            <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">$40,500</div>
                            <div className="text-slate-400 text-sm">Total Prize Pool</div>
                        </div>
                        <div className="bg-background-tertiary border border-primary/20 rounded-xl p-6 text-center">
                            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">2</div>
                            <div className="text-slate-400 text-sm">Active Competitions</div>
                        </div>
                        <div className="bg-background-tertiary border border-primary/20 rounded-xl p-6 text-center">
                            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                            <div className="text-3xl font-bold text-white mb-1">376</div>
                            <div className="text-slate-400 text-sm">Total Participants</div>
                        </div>
                    </div>

                    {/* Featured Competition Card */}
                    <div className="py-16 px-4">
                        <div className="container mx-auto max-w-7xl">
                            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-12">

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                                                <StarIcon size={15} />  Featured Competition
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-400 text-sm font-medium">LIVE</span>
                                    </div>
                                </div>

                                {/* Competition Title & Description */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Bitcoin Bull Run Championship
                                    </h3>
                                    <p className="text-slate-400">
                                        Trade BTC/USDT with up to 50x leverage. Winner takes $5,000!
                                    </p>
                                </div>

                                {/* Competition Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                            <Trophy className="w-4 h-4" />
                                            Prize Pool
                                        </div>
                                        <div className="text-2xl font-bold text-primary">$10,000</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                            <User className="w-4 h-4" />
                                            Participants
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-2">87/100</div>
                                        <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                            <Trophy className="w-4 h-4" />
                                            Entry Fee
                                        </div>
                                        <div className="text-2xl font-bold text-white">$100</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                                            <Clock className="w-4 h-4" />
                                            Time Remaining
                                        </div>
                                        <div className="text-2xl font-bold text-red-400">0h 0m</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Competition Modal */}
            <JoinCompetitionModal
                isOpen={isJoinModalOpen}
                onClose={() => setIsJoinModalOpen(false)}
                competition={featuredCompetition}
            />
        </>
    )
}

export default Hero;