"use client";
import { useEffect, useRef } from "react";
import { createChart, ColorType, IChartApi, ISeriesApi, AreaSeries } from "lightweight-charts";

export function EquityCurve() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: "hsl(210 40% 98%)",
            },
            grid: {
                vertLines: { color: "hsl(210 19% 19%)" },
                horzLines: { color: "hsl(210 19% 19%)" },
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            timeScale: {
                borderColor: "hsl(210 19% 19%)",
            },
            rightPriceScale: {
                borderColor: "hsl(210 19% 19%)",
            },
        });

        const areaSeries = chart.addSeries(AreaSeries, {
            lineColor: "hsl(188 100% 50%)",
            topColor: "hsl(188 100% 50% / 0.4)",
            bottomColor: "hsl(188 100% 50% / 0.0)",
            lineWidth: 2,
        });

        // Generate sample data
        const data = [];
        const startDate = new Date(2024, 0, 1);
        let value = 10000;

        for (let i = 0; i < 100; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            value += (Math.random() - 0.45) * 200; // Slight upward bias

            data.push({
                time: date.toISOString().split('T')[0],
                value: value,
            });
        }

        areaSeries.setData(data);
        chart.timeScale().fitContent();

        chartRef.current = chart;
        seriesRef.current = areaSeries;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, []);

    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Equity Curve</h3>
                <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded bg-primary/20 text-primary">1M</button>
                    <button className="text-xs px-3 py-1 rounded hover:bg-muted">3M</button>
                    <button className="text-xs px-3 py-1 rounded hover:bg-muted">1Y</button>
                    <button className="text-xs px-3 py-1 rounded hover:bg-muted">All</button>
                </div>
            </div>
            <div ref={chartContainerRef} />
        </div>
    );
}

