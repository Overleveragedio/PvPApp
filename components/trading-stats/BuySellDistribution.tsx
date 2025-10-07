"use client";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
    { name: "Buy", value: 142, fill: "hsl(142 76% 36%)" },
    { name: "Sell", value: 105, fill: "hsl(0 84% 60%)" },
];

const chartConfig = {
    trades: {
        label: "Trades",
    },
};

export function BuySellDistribution() {
    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-base font-semibold text-card-foreground mb-4">Buy vs Sell</h3>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value, entry: any) => (
                                <span className="text-sm text-muted-foreground">
                                    {value}: {entry.payload.value} ({((entry.payload.value / 247) * 100).toFixed(1)}%)
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
}

