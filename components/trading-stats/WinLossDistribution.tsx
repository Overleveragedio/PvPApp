"use client";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
    { range: "-$500+", count: 3, fill: "hsl(0 84% 60%)" },
    { range: "-$300", count: 8, fill: "hsl(0 84% 60% / 0.8)" },
    { range: "-$100", count: 15, fill: "hsl(0 84% 60% / 0.6)" },
    { range: "$0", count: 25, fill: "hsl(210 20% 70%)" },
    { range: "$100", count: 42, fill: "hsl(142 76% 36% / 0.6)" },
    { range: "$300", count: 28, fill: "hsl(142 76% 36% / 0.8)" },
    { range: "$500+", count: 12, fill: "hsl(142 76% 36%)" },
];

const chartConfig = {
    count: {
        label: "Trades",
    },
};

export function WinLossDistribution() {
    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-base font-semibold text-card-foreground mb-4">Win/Loss Distribution</h3>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="range"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "hsl(210 20% 70%)", fontSize: 12 }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "hsl(210 20% 70%)", fontSize: 12 }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}

