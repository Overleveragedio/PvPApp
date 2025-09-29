'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickSeries } from 'lightweight-charts'
import { useHyperliquid } from '@/hooks/useHyperliquid'
import axios from 'axios'
import MarketHeader from './MarketInfoHeader'

interface ChartProps {
    symbol?: string
    interval?: string
}

const Chart = ({ symbol = 'BTC', interval: initialInterval = '1m' }: ChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null)
    const chartRef = useRef<IChartApi | null>(null)
    const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
    const resizeObserverRef = useRef<ResizeObserver | null>(null)

    // Add state for current interval
    const [currentInterval, setCurrentInterval] = useState(initialInterval)

    const { useCandleData, useAllMids } = useHyperliquid()

    // Use the hook to fetch candle data with current interval
    const {
        data: candleData = [],
        isLoading: candleLoading,
        error,
        refetch
    } = useCandleData(symbol, currentInterval)

    // Fetch current market data
    const { data: marketData, isLoading: marketLoading } = useAllMids()

    // Calculate market stats from candle data
    const marketStats = useMemo(() => {
        if (!candleData.length) return null

        const latestCandle = candleData[candleData.length - 1]
        const firstCandle = candleData[0]

        const currentPrice = latestCandle.close
        const openPrice = firstCandle.open
        const change = currentPrice - openPrice
        const changePercent = ((change / openPrice) * 100)

        // Calculate OHLC for current period
        const high = Math.max(...candleData.map(c => c.high))
        const low = Math.min(...candleData.map(c => c.low))

        // Mock data for volume and market cap (you can replace with real data)
        const volume = "132,359,158.96 USDC"
        const marketCap = "14,738,674,475 USDC"
        const contract = "0x0d01...11ec"

        return {
            price: currentPrice.toFixed(3),
            change: change.toFixed(3),
            changePercent: changePercent.toFixed(2),
            volume,
            marketCap,
            contract,
            open: openPrice.toFixed(3),
            high: high.toFixed(3),
            low: low.toFixed(3),
            close: currentPrice.toFixed(3),
            isPositive: change >= 0
        }
    }, [candleData])

    useEffect(() => {
        if (!chartContainerRef.current) return

        const container = chartContainerRef.current
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight

        // Create chart with colors from globals.css
        const chart = createChart(container, {
            layout: {
                background: { type: ColorType.Solid, color: 'hsl(220 13% 11%)' },
                textColor: 'hsl(210 40% 98%)', // --foreground
            },
            grid: {
                vertLines: { color: 'hsl(210 19% 19%)' }, // --border
                horzLines: { color: 'hsl(210 19% 19%)' }, // --border
            },
            crosshair: {
                mode: 1,
            },
            rightPriceScale: {
                borderColor: 'hsl(210 19% 19%)', // --border
                textColor: 'hsl(210 20% 70%)', // --muted-foreground
            },
            timeScale: {
                borderColor: 'hsl(210 19% 19%)', // --border
                timeVisible: true,
                secondsVisible: false,
            },
            width: containerWidth,
            height: containerHeight,
        })

        // Create candlestick series with theme colors
        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: 'hsl(142 76% 36%)', // Green for up candles
            downColor: 'hsl(0 84% 60%)', // --destructive for down candles
            borderDownColor: 'hsl(0 84% 60%)', // --destructive
            borderUpColor: 'hsl(142 76% 36%)', // Green
            wickDownColor: 'hsl(0 84% 60%)', // --destructive
            wickUpColor: 'hsl(142 76% 36%)', // Green
        })

        chartRef.current = chart
        candlestickSeriesRef.current = candlestickSeries

        // Handle resize with ResizeObserver for better performance
        const handleResize = () => {
            if (container && chartRef.current) {
                const newWidth = container.clientWidth
                const newHeight = container.clientHeight

                if (newWidth > 0 && newHeight > 0) {
                    chartRef.current.applyOptions({
                        width: newWidth,
                        height: newHeight,
                    })
                }
            }
        }

        // Use ResizeObserver for more accurate resize detection
        if (window.ResizeObserver) {
            resizeObserverRef.current = new ResizeObserver(handleResize)
            resizeObserverRef.current.observe(container)
        } else {
            // Fallback to window resize event
            window.addEventListener('resize', handleResize)
        }

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect()
            } else {
                window.removeEventListener('resize', handleResize)
            }

            if (chartRef.current) {
                chartRef.current.remove()
            }
        }
    }, [])


    // Update chart data when candleData changes
    useEffect(() => {
        if (candleData.length > 0 && candlestickSeriesRef.current) {
            candlestickSeriesRef.current.setData(candleData)
        }
    }, [candleData])

    // Handle interval change
    const handleIntervalChange = (newInterval: string) => {
        setCurrentInterval(newInterval)
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full bg-background-tertiary border border-red-500/20">
                <div className="text-center">
                    <div className="text-red-400 mb-2">⚠️ Chart Error</div>
                    <div className="text-slate-400 text-sm">
                        {axios.isAxiosError(error)
                            ? `Network error: ${error.message}`
                            : 'Failed to fetch chart data'
                        }
                    </div>
                    <button
                        onClick={() => refetch()}
                        className="mt-2 px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full bg-background border border-slate-700/30 overflow-hidden flex flex-col">
            {/* Market Data Header */}
            <MarketHeader
                symbol={symbol}
                marketStats={marketStats}
                isLoading={candleLoading || marketLoading}
            />

            {/* Indicators Section */}
            <div className="px-4 py-2 border-b border-slate-700/30 bg-background-secondary flex-shrink-0">
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-400">Indicators</span>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">{currentInterval} • Hyperliquid</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        {marketStats && (
                            <div className="flex items-center gap-4 text-xs">
                                <span className="text-red-400">O {marketStats.open}</span>
                                <span className="text-slate-400">H {marketStats.high}</span>
                                <span className="text-slate-400">L {marketStats.low}</span>
                                <span className="text-slate-400">C {marketStats.close}</span>
                                <span className={`${marketStats.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                    {marketStats.change} ({marketStats.isPositive ? '+' : ''}{marketStats.changePercent}%)
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div
                ref={chartContainerRef}
                className="w-full flex-1 min-h-0"
            />
        </div>
    )
}

export default Chart