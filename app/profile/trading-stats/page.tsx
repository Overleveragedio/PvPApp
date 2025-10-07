"use client";
import { StatsOverview } from "@/components/trading-stats/StatsOverview";
import { MostTradedPairs } from "@/components/trading-stats/MostTradedPairs";
import { AssetPerformanceTable } from "@/components/trading-stats/AssetPerformanceTable";

export default function TradingStats() {
    return (
        <div className="h-full flex flex-col gap-4 py-6 px-4 md:px-8 overflow-auto">
            {/* Overview Stats */}
            <StatsOverview />

            {/* Most Traded Pairs */}
            <MostTradedPairs />

            {/* Asset Performance Table */}
            <AssetPerformanceTable />
        </div>
    );
}
