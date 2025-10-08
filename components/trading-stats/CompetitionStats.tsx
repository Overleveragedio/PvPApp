import { Activity, TrendingUp, Award, AlertTriangle, Target } from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";

export function CompetitionStats() {
    return (
        <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Competition Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatsCard
                    icon={Activity}
                    label="Total Trades"
                    value="247"
                    valueColor="text-foreground"
                />
                <StatsCard
                    icon={TrendingUp}
                    label="Profitable Trades"
                    value="68.5%"
                    valueColor="text-green-400"
                />
                <StatsCard
                    icon={Award}
                    label="Best Trade"
                    value="$856.30"
                    valueColor="text-green-400"
                />
                <StatsCard
                    icon={AlertTriangle}
                    label="Worst Trade"
                    value="-$234.50"
                    valueColor="text-red-400"
                />
                <StatsCard
                    icon={Target}
                    label="Most Traded Pair"
                    value="BTC/USDT"
                    valueColor="text-primary"
                />
            </div>
        </div>
    );
}

