import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    valueColor?: string;
    children?: React.ReactNode;
}

export function StatsCard({ icon: Icon, label, value, valueColor = "text-card-foreground", children }: StatsCardProps) {
    return (
        <div className="bg-muted/50 rounded-lg p-4 h-full flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">{label}</p>
            </div>
            <p className={`text-xl font-bold ${valueColor} mb-2 flex-shrink-0`}>{value}</p>
            {children && (
                <div className="flex-1 min-h-0 overflow-hidden">
                    {children}
                </div>
            )}
        </div>
    );
}