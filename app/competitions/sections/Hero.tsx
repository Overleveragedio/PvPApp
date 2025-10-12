'use client'

import { Trophy, TrendingUp, Users } from "lucide-react";
import SectionHeading from "@/components/typography/SectionHeading";
import { getFeaturedCompetition } from "@/lib/competitions";
import { useQuery } from "@tanstack/react-query";
import FeaturedCompetitionCard from "@/components/competitions/FeaturedCompetitionCard";

const Hero = () => {
    const { data: featuredCompetition } = useQuery({
        queryKey: ['featuredCompetition'],
        queryFn: () => getFeaturedCompetition(),
    })

    return (
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
                        <div className="text-3xl font-bold text-white mb-1">$10000</div>
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
                {featuredCompetition && (
                    <FeaturedCompetitionCard competition={featuredCompetition} />
                )}
            </div>
        </section>
    )
}

export default Hero;