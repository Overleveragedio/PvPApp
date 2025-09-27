"use client";
import { RefreshCw, Trophy, Users } from "lucide-react";
import TabNavigation from "@/components/ui/TabNavigation";
import FilterSelect from "@/components/ui/FilterSelect";

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
            <div className="mb-2">
                <TabNavigation
                    tabs={tabsData}
                    defaultActiveTab="current"
                    onTabChange={handleTabChange}
                    className=""
                />
            </div>

            {/* Global Leaderboard Card */}
            <div className="bg-background-tertiary border border-slate-700/30 rounded-xl p-6">
                {/* Card Header */}
                <div className="flex flex-col gap-1 mb-4">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-bold text-white">Global Leaderboard</h2>
                    </div>
                    <p className="text-slate-400 text-sm">Top performers across all active competitions</p>
                </div>

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Users className="w-16 h-16 text-slate-600 mb-4" />
                    <h3 className="text-xl font-semibold text-slate-400 mb-2">
                        Global leaderboard coming soon...
                    </h3>
                    <p className="text-slate-500">
                        Select a specific competition to view rankings
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;