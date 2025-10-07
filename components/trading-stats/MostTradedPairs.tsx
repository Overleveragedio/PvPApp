"use client";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
    { pair: "BTC/USDT", trades: 89, fill: "hsl(188 100% 50%)" },
    { pair: "ETH/USDT", trades: 67, fill: "hsl(188 100% 50% / 0.8)" },
    { pair: "SOL/USDT", trades: 45, fill: "hsl(188 100% 50% / 0.6)" },
    { pair: "AVAX/USDT", trades: 28, fill: "hsl(188 100% 50% / 0.4)" },
    { pair: "MATIC/USDT", trades: 18, fill: "hsl(188 100% 50% / 0.3)" },
];

const chartConfig = {
    trades: {
        label: "Trades",
        color: "hsl(188 100% 50%)",
    },
};

export function MostTradedPairs() {
    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-base font-semibold text-card-foreground mb-4">Most Traded Pairs</h3>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical">
                        <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "hsl(210 20% 70%)", fontSize: 12 }}
                        />
                        <YAxis
                            type="category"
                            dataKey="pair"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "hsl(210 20% 70%)", fontSize: 12 }}
                            width={80}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="trades" fill="var(--color-trades)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}

