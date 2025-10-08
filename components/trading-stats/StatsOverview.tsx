import { TrendingUp, Trophy, Target, Gamepad2, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";

export function StatsOverview() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatsCard
                icon={TrendingUp}
                label="Total P&L"
                value="$4,250.00"
                change="+12.5%"
                changeType="positive"
                valueColor="text-green-400"
            />
            <StatsCard
                icon={Trophy}
                label="Top 3"
                value="8"
                change="+2"
                changeType="positive"
                valueColor="text-primary"
            />
            <StatsCard
                icon={Target}
                label="Win Rate"
                value="68.5%"
                change="+5.2%"
                changeType="positive"
                valueColor="text-primary"
            />
            <StatsCard
                icon={Gamepad2}
                label="Competitions Played"
                value="24"
                valueColor="text-foreground"
            />
            <StatsCard
                icon={DollarSign}
                label="Amount Spent in Competitions"
                value="$12,450"
                valueColor="text-accent"
            />
        </div>
    );
}
