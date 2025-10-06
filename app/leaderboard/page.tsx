"use client";
import { RefreshCw, Trophy } from "lucide-react";
import TabNavigation from "@/components/ui/TabNavigation";
import FilterSelect from "@/components/ui/FilterSelect";
import TopTradersShowcase from "@/components/leaderboard/TopTradersShowcase";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

const tabsData = [
    { id: "current", label: "Current", count: 0 },
    { id: "historical", label: "Historical", count: 0 },
    { id: "statistics", label: "Statistics", count: 0 }
];

const competitionOptions = [
    { value: "all", label: "All Competitions" },
    { value: "hourly", label: "Hourly Challenge" },
    { value: "daily", label: "Daily Sprint" },
    { value: "weekly", label: "Weekly Tournament" }
];

const timeOptions = [
    { value: "current", label: "Current" },
    { value: "last-hour", label: "Last Hour" },
    { value: "last-day", label: "Last Day" },
    { value: "last-week", label: "Last Week" }
];

// Mock data for top 3 traders with pixel art avatars
const topTraders = [
    {
        rank: 1,
        name: "BabyKnight",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=BabyKnight",
        rankBadge: "Challenger",
        latestStats: "0.75",
        winRate: "8%",
        kda: "$12,456.78"
    },
    {
        rank: 2,
        name: "Rootless",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rootless",
        rankBadge: "Challenger",
        latestStats: "0.68",
        winRate: "64%",
        kda: "$10,234.92"
    },
    {
        rank: 3,
        name: "Teodor2000",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Teodor2000",
        rankBadge: "Challenger",
        latestStats: "0.55",
        winRate: "56%",
        kda: "$8,567.45"
    }
];

// Mock data for leaderboard table
const leaderboardData = [
    {
        rank: 1,
        username: "BabyKnight",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=BabyKnight",
        trades: 156,
        totalGainUSD: "12,456.78",
        percentageGained: "45.32"
    },
    {
        rank: 2,
        username: "Rootless",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rootless",
        trades: 142,
        totalGainUSD: "10,234.92",
        percentageGained: "38.75"
    },
    {
        rank: 3,
        username: "Teodor2000",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Teodor2000",
        trades: 128,
        totalGainUSD: "8,567.45",
        percentageGained: "32.18"
    },
    {
        rank: 4,
        username: "CryptoNinja",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=CryptoNinja",
        trades: 115,
        totalGainUSD: "7,823.34",
        percentageGained: "28.94"
    },
    {
        rank: 5,
        username: "MoonWalker",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=MoonWalker",
        trades: 103,
        totalGainUSD: "6,945.21",
        percentageGained: "25.67"
    },
    {
        rank: 6,
        username: "DiamondHands",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=DiamondHands",
        trades: 98,
        totalGainUSD: "6,123.89",
        percentageGained: "22.41"
    },
    {
        rank: 7,
        username: "WhaleTrader",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=WhaleTrader",
        trades: 87,
        totalGainUSD: "5,456.72",
        percentageGained: "19.85"
    },
    {
        rank: 8,
        username: "BullRunner",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=BullRunner",
        trades: 76,
        totalGainUSD: "4,234.56",
        percentageGained: "15.23"
    },
    {
        rank: 9,
        username: "SatoshiFan",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=SatoshiFan",
        trades: 69,
        totalGainUSD: "3,567.89",
        percentageGained: "12.56"
    },
    {
        rank: 10,
        username: "DegenKing",
        avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=DegenKing",
        trades: 61,
        totalGainUSD: "2,456.34",
        percentageGained: "8.94"
    }
];

const Leaderboard = () => {
    const handleTabChange = (tabId: string) => {
        console.log("Active tab:", tabId);
    };

    const handleCompetitionChange = (value: string) => {
        console.log("Competition changed:", value);
    };

    const handleTimeChange = (value: string) => {
        console.log("Time changed:", value);
    };

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
                <p className="text-slate-400 text-lg">Track the top performers across all trading competitions</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
                <div className="flex gap-3">
                    <FilterSelect
                        options={competitionOptions}
                        placeholder="All Competitions"
                        variant="secondary"
                        onChange={handleCompetitionChange}
                    />
                    <FilterSelect
                        options={timeOptions}
                        placeholder="Current"
                        variant="secondary"
                        onChange={handleTimeChange}
                    />
                </div>

                {/* Refresh Button */}
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm">Refresh</span>
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
                <TabNavigation
                    tabs={tabsData}
                    defaultActiveTab="current"
                    onTabChange={handleTabChange}
                    className=""
                />
            </div>

            {/* Top 3 Traders Cards */}
            <TopTradersShowcase traders={topTraders} />

            {/* Global Leaderboard Table */}
            <div className="backdrop-blur-lg border border-slate-700/30 rounded-xl p-6">
                {/* Card Header */}
                <div className="flex flex-col gap-1 mb-6">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-bold text-white">Global Leaderboard</h2>
                    </div>
                    <p className="text-slate-400 text-sm">Top performers across all active competitions</p>
                </div>

                {/* Leaderboard Table */}
                <LeaderboardTable data={leaderboardData} />
            </div>
        </div>
    )
}

export default Leaderboard;