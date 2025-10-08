import { Activity, TrendingUp, Award, AlertTriangle, Target } from "lucide-react";

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    valueColor?: string;
}

function StatCard({ icon: Icon, label, value, valueColor = "text-foreground" }: StatCardProps) {
    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
        </div>
    );
}

export function CompetitionStats() {
    return (
        <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Competition Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <StatCard
                    icon={Activity}
                    label="Total Trades"
                    value="247"
                    valueColor="text-foreground"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Profitable Trades"
                    value="68.5%"
                    valueColor="text-green-400"
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
                    icon={Target}
                    label="Most Traded Pair"
                    value="BTC/USDT"
                    valueColor="text-primary"
                />
            </div>
        </div>
    );
}

