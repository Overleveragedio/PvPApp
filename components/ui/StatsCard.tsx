import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    valueColor?: string;
    subtext?: string;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    children?: React.ReactNode;
}

export function StatsCard({
    icon: Icon,
    label,
    value,
    valueColor = "text-card-foreground",
    subtext,
    change,
    changeType = "neutral",
    children
}: StatsCardProps) {
    const changeColor = changeType === "positive"
        ? "text-green-400"
        : changeType === "negative"
            ? "text-red-400"
            : "text-muted-foreground";

    return (
        <div className="bg-card border border-border rounded-lg p-4 md:p-6 h-full flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 flex-shrink-0">
                {/* <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0"> */}
                {/* <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" /> */}
                {/* </div> */}
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{label}</p>
            </div>

            <div className="flex-shrink-0 mb-2">
                <p className={`text-2xl md:text-3xl font-bold ${valueColor}`}>{value}</p>
                {change && (
                    <p className={`text-xs md:text-sm ${changeColor} mt-1`}>{change}</p>
                )}
                {subtext && (
                    <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
                )}
            </div>

            {children && (
                <div className="flex-1 min-h-0 overflow-hidden">
                    {children}
                </div>
            )}
        </div>
    );
}

