'use client'

import { ChevronDown, ExternalLink, Copy } from 'lucide-react'

interface MarketStats {
    price: string
    change: string
    changePercent: string
    volume: string
    marketCap: string
    contract: string
    open: string
    high: string
    low: string
    close: string
    isPositive: boolean
}

interface MarketHeaderProps {
    symbol: string
    marketStats: MarketStats | null
    isLoading: boolean
}

const MarketHeader = ({ symbol, marketStats, isLoading }: MarketHeaderProps) => {
    return (
        <div className="bg-background-secondary border-b border-border px-4 py-3">
            <div className="flex items-center gap-12">
                {/* Left Section - Symbol and Spot */}
                <div className="flex items-center gap-4">
                    {/* Symbol with dropdown */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <span className="text-white font-semibold text-lg">{symbol}</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            Loading...
                        </div>
                    )}
                </div>

                {/* Right Section - Market Data */}
                {marketStats ? (
                    <div className="flex items-center gap-8 text-sm">
                        {/* Price */}
                        <div className="text-right">
                            <div className="text-muted-foreground text-xs mb-1">Price</div>
                            <div className="text-white font-semibold">
                                {marketStats.price}
                            </div>
                        </div>

                        {/* 24h Change */}
                        <div className="text-right">
                            <div className="text-muted-foreground text-xs mb-1">24h Change</div>
                            <div className={`font-semibold ${marketStats.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {marketStats.isPositive ? '+' : ''}{marketStats.change} / {marketStats.isPositive ? '+' : ''}{marketStats.changePercent}%
                            </div>
                        </div>

                        {/* 24h Volume */}
                        <div className="text-right">
                            <div className="text-muted-foreground text-xs mb-1">24h Volume</div>
                            <div className="text-white font-semibold">
                                {marketStats.volume}
                            </div>
                        </div>

                        {/* Market Cap */}
                        <div className="text-right">
                            <div className="text-muted-foreground text-xs mb-1">Market Cap</div>
                            <div className="text-white font-semibold">
                                {marketStats.marketCap}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="animate-pulse text-right">
                                <div className="h-3 w-16 bg-muted rounded mb-2"></div>
                                <div className="h-4 w-20 bg-muted-foreground/20 rounded"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            {/* Chart Controls */}
            {/* <div className="absolute bottom-4 left-4 flex gap-2">
                {['1m', '5m', '15m', '1h', '4h', '1d'].map((timeframe) => (
                    <button
                        key={timeframe}
                        onClick={() => handleIntervalChange(timeframe)}
                        className={`px-3 py-1 text-xs rounded transition-colors ${currentInterval === timeframe
                            ? 'bg-primary text-white'
                            : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                    >
                        {timeframe}
                    </button>
                ))}
            </div> */}
        </div>
    )
}

export default MarketHeader