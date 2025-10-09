"use client";
import { StatsOverview } from "@/components/trading-stats/StatsOverview";
import { CompetitionStats } from "@/components/trading-stats/CompetitionStats";
import { MostTradedPairs } from "@/components/trading-stats/MostTradedPairs";
import { AssetPerformanceTable } from "@/components/trading-stats/AssetPerformanceTable";

export default function TradingStats() {
    return (
        <div className="h-full flex flex-col gap-6 pb-6 px-4 md:px-8 overflow-auto">
            {/* Top Section - Overview Stats */}
            <StatsOverview />

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Bottom Section - Competition Details */}
            <CompetitionStats />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <MostTradedPairs />
                <AssetPerformanceTable />
            </div>
        </div>
    );
}
