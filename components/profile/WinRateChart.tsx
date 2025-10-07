"use client";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
    { winRate: 75, fill: "hsl(188 100% 50%)" },
];

const chartConfig = {
    winRate: {
        label: "Win Rate",
        color: "hsl(188 100% 50%)",
    },
} satisfies ChartConfig;

export function WinRateChart() {
    const winRateValue = chartData[0].winRate;

    return (
        <ChartContainer
            config={chartConfig}
            className="h-full w-full max-h-full"
        >
            <RadialBarChart
                data={chartData}
                startAngle={90}
                endAngle={90 + (winRateValue / 100) * 360}
                innerRadius={50}
                outerRadius={70}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[54, 46]}
                />
                <RadialBar
                    dataKey="winRate"
                    background
                    cornerRadius={10}
                    fill="var(--color-winRate)"
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-primary text-2xl font-bold"
                                        >
                                            {winRateValue}%
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 18}
                                            className="fill-muted-foreground text-xs"
                                        >
                                            Win Rate
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </PolarRadiusAxis>
            </RadialBarChart>
        </ChartContainer>
    );
}