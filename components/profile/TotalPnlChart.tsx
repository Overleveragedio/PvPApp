"use client";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
    { date: "Mon", pnl: 400 },
    { date: "Tue", pnl: 300 },
    { date: "Wed", pnl: 600 },
    { date: "Thu", pnl: 800 },
    { date: "Fri", pnl: 500 },
    { date: "Sat", pnl: 900 },
    { date: "Sun", pnl: 1200 },
];

const chartConfig = {
    pnl: {
        label: "P&L",
        color: "hsl(142 76% 36%)",
    },
};

export function TotalPnlChart() {
    return (
        <ChartContainer config={chartConfig} className="h-full w-full max-h-full">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="fillPnl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-pnl)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-pnl)" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    hide
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                    type="monotone"
                    dataKey="pnl"
                    stroke="var(--color-pnl)"
                    fill="url(#fillPnl)"
                    fillOpacity={0.4}
                    strokeWidth={2}
                />
            </AreaChart>
        </ChartContainer>
    );
}