"use client";
import { Search } from "lucide-react";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import TabNavigation from "@/components/ui/TabNavigation";
import Select from "@/components/ui/FilterSelect";

const competitionsData = [
    {
        status: "COMPLETED" as const,
        leverage: "30x",
        title: "Weekend Warrior Championship",
        description: "Trade all weekend long across multiple pairs. Epic prizes await!",
        prizePool: "$12,000",
        participants: "60/60",
        entryFee: "$200",
        tradingPairs: ["BTC/USDT", "ETH/USDT", "BNB/USDT"],
        showViewResults: true
    },
    {
        status: "LIVE" as const,
        leverage: "10x",
        title: "Practice Arena - Free Play",
        description: "Practice your trading skills with no entry fee. Perfect for beginners!",
        prizePool: "$0",
        participants: "156/200",
        entryFee: "$0",
        endsIn: "0h 0m",
        tradingPairs: ["BTC/USDT", "ETH/USDT"]
    },
    {
        status: "LIVE" as const,
        leverage: "50x",
        title: "Bitcoin Bull Run Championship",
        description: "Trade BTC/USDT with up to 50x leverage. Winner takes $5,000!",
        prizePool: "$10,000",
        participants: "87/100",
        entryFee: "$100",
        endsIn: "0h 0m",
        tradingPairs: ["BTC/USDT"]
    }
];

const tabsData = [
    { id: "all", label: "All", count: 24 },
    { id: "live", label: "Live", count: 8 },
    { id: "upcoming", label: "Upcoming", count: 12 },
    { id: "my-competitions", label: "My Competitions", count: 3 }
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
    const handleTabChange = (tabId: string) => {
        console.log("Active tab:", tabId);
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
                    {competitionsData.map((competition, index) => (
                        <CompetitionCard key={index} {...competition} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Board;