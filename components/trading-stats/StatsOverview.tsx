import { TrendingUp, TrendingDown, Activity, Target, Award, AlertTriangle, BarChart3 } from "lucide-react";

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
                icon={TrendingUp}
                label="Total P&L"
                value="$4,250.00"
                change="+12.5%"
                changeType="positive"
                valueColor="text-green-400"
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
                icon={Activity}
                label="Total Trades"
                value="247"
                valueColor="text-foreground"
            />
            <StatCard
                icon={BarChart3}
                label="Profit Factor"
                value="2.34"
                change="+0.18"
                changeType="positive"
                valueColor="text-primary"
            />
            <StatCard
                icon={Award}
                label="Best Trade"
                value="$856.30"
                valueColor="text-green-400"
            />
            <StatCard
                icon={AlertTriangle}
                label="Worst Trade"
                value="-$234.50"
                valueColor="text-red-400"
            />
            <StatCard
                icon={TrendingDown}
                label="Avg Win/Loss"
                value="$87.50"
                valueColor="text-foreground"
            />
        </div>
    );
}

