import { TrendingUp, Trophy, Target, Gamepad2, DollarSign } from "lucide-react";

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    valueColor?: string;
}

function StatCard({ icon: Icon, label, value, change, changeType = "neutral", valueColor = "text-foreground" }: StatCardProps) {
    const changeColors = {
        positive: "text-green-400",
        negative: "text-red-400",
        neutral: "text-muted-foreground"
    };

    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
            <div className="flex items-end justify-between">
                <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
                {change && (
                    <span className={`text-xs font-medium ${changeColors[changeType]}`}>
                        {change}
                    </span>
                )}
            </div>
        </div>
    );
}

export function StatsOverview() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard
                icon={TrendingUp}
                label="Total P&L"
                value="$4,250.00"
                change="+12.5%"
                changeType="positive"
                valueColor="text-green-400"
            />
            <StatCard
                icon={Trophy}
                label="Top 3"
                value="8"
                change="+2"
                changeType="positive"
                valueColor="text-primary"
            />
            <StatCard
                icon={Target}
                label="Win Rate"
                value="68.5%"
                change="+5.2%"
                changeType="positive"
                valueColor="text-primary"
            />
            <StatCard
                icon={Gamepad2}
                label="Competitions Played"
                value="24"
                valueColor="text-foreground"
            />
            <StatCard
                icon={DollarSign}
                label="Competition Volume"
                value="$12,450"
                change="+8.3%"
                changeType="positive"
                valueColor="text-accent"
            />
        </div>
    );
}

