"use client";
import { Search } from "lucide-react";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import TabNavigation from "@/components/ui/TabNavigation";
import Select from "@/components/ui/FilterSelect";
import { useQuery } from "@tanstack/react-query";
import { fetchCompetitions } from "@/lib/competitions";
import { use, useEffect, useState } from "react";
import { CompetitionStatus } from "@/types/competitions";
import CompetitionCardSkeleton from "@/components/competitions/Skeleton";

const tabsData = [
    { id: "all", label: "All", count: 24 },
    { id: "live", label: "Live", count: 8 },
    { id: "upcoming", label: "Upcoming", count: 12 },
    { id: "completed", label: "Completed", count: 3 }
];

const tradingPairsOptions = [
    { value: "BTC/USDT", label: "BTC/USDT" },
    { value: "ETH/USDT", label: "ETH/USDT" },
    { value: "SOL/USDT", label: "SOL/USDT" }
];

const startTimeOptions = [
    { value: "next-hour", label: "Next Hour" },
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" }
];

const Board = () => {
    const [status, setStatus] = useState(CompetitionStatus.ALL)
    const {
        data: competitions,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['competitions'],
        queryFn: () => fetchCompetitions(status),
    })

    useEffect(() => {
        refetch()
    }, [status])

    const handleTabChange = (tabId: string) => {
        switch (tabId) {
            case "all":
                setStatus(CompetitionStatus.ALL)
                break;
            case "live":
                setStatus(CompetitionStatus.LIVE)
                break;
            case "upcoming":
                setStatus(CompetitionStatus.PENDING)
                break;
            case "completed":
                setStatus(CompetitionStatus.ENDED)
                break;
        }
    };

    const handleTradingPairChange = (value: string) => {
        console.log("Trading pair changed:", value);
    };

    const handleStartTimeChange = (value: string) => {
        console.log("Start time changed:", value);
    };

    return (
        <section className="py-8 px-4">
            <div className="container mx-auto">
                <div className="bg-background-tertiary/50 p-8 mb-5 rounded-2xl">
                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search competitions by name..."
                                className="w-full bg-background border border-slate-700/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex gap-3">
                            <Select
                                options={tradingPairsOptions}
                                placeholder="All Pairs"
                                variant="secondary"
                                onChange={handleTradingPairChange}
                            />
                            <Select
                                options={startTimeOptions}
                                placeholder="Start Time"
                                variant="secondary"
                                onChange={handleStartTimeChange}
                            />
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <TabNavigation
                        tabs={tabsData}
                        defaultActiveTab="all"
                        onTabChange={handleTabChange}
                        className=""
                    />
                </div>
                {/* Competitions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        isLoading && (
                            <>
                                <CompetitionCardSkeleton />
                                <CompetitionCardSkeleton />
                                <CompetitionCardSkeleton />
                            </>
                        )
                    }
                    {competitions?.map((competition) => (
                        <CompetitionCard key={competition.id} competition={competition} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Board;