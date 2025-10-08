import { Wallet, Lock, TrendingUp, ArrowDownToLine } from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";

export function BalanceOverview() {
    return (
        <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Balance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    icon={Wallet}
                    label="Available Balance"
                    value="$12,450.00"
                    subtext="Ready to withdraw or trade"
                    valueColor="text-green-400"
                />
                <StatsCard
                    icon={Lock}
                    label="Locked in Competitions"
                    value="$3,250.00"
                    subtext="Currently in active competitions"
                    valueColor="text-yellow-400"
                />
                <StatsCard
                    icon={TrendingUp}
                    label="Total Earnings"
                    value="$8,720.50"
                    subtext="Lifetime winnings"
                    valueColor="text-primary"
                />
                <StatsCard
                    icon={ArrowDownToLine}
                    label="Total Withdrawn"
                    value="$5,500.00"
                    subtext="All-time withdrawals"
                    valueColor="text-muted-foreground"
                />
            </div>
        </div>
    );
}
