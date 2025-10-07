"use client";
import { Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
    { date: "Mon", trades: 12 },
    { date: "Tue", trades: 19 },
    { date: "Wed", trades: 15 },
    { date: "Thu", trades: 25 },
    { date: "Fri", trades: 22 },
    { date: "Sat", trades: 30 },
    { date: "Sun", trades: 28 },
];

const chartConfig = {
    trades: {
        label: "Trades",
        color: "hsl(188 100% 50%)",
    },
};

export function TotalTradesChart() {
    return (
        <ChartContainer config={chartConfig} className="h-full w-full max-h-full">
            <LineChart data={data}>
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    hide
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                    type="monotone"
                    dataKey="trades"
                    stroke="var(--color-trades)"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    );
}