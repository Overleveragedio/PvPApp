"use client"
import { useState } from "react";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

const TradingPanel = () => {
    const [orderType, setOrderType] = useState<'Market' | 'Limit' | 'Pro'>('Market');
    const [tradeType, setTradeType] = useState<'Buy' | 'Sell'>('Buy');
    const [size, setSize] = useState('');
    const [leverage, setLeverage] = useState(52);
    const [asset, setAsset] = useState('');

    const orderTypes = ['Market'] as const;

    const handleLeverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLeverage(Number(e.target.value));
    };

    return (
        <div className="h-full bg-background border-l border-border flex flex-col">
            {/* Order Type Tabs */}
            <div className="border-b border-border bg-background-secondary">
                <div className="flex">
                    {orderTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setOrderType(type)}
                            className={clsx(
                                "flex-1 px-4 py-3 text-sm font-medium transition-colors relative",
                                orderType === type
                                    ? "text-primary border-b-2 border-primary bg-background"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {type}
                            {/* {type === 'Pro' && <ChevronDown className="w-3 h-3 ml-1 inline" />} */}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 p-4 space-y-4">
                {/* Buy/Sell Toggle */}
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setTradeType('Buy')}
                        className={clsx(
                            "py-2 px-4 rounded text-sm font-medium transition-colors",
                            tradeType === 'Buy'
                                ? "bg-green-600 text-white"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setTradeType('Sell')}
                        className={clsx(
                            "py-2 px-4 rounded text-sm font-medium transition-colors",
                            tradeType === 'Sell'
                                ? "bg-destructive text-white"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Sell
                    </button>
                </div>

                {/* Available to Trade */}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Available to Trade</span>
                    <span className="text-foreground">0.00 BTC</span>
                </div>

                {/* Size Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm text-muted-foreground">Size</label>
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-foreground">{asset}</span>
                            <ChevronDown className="w-3 h-3 text-muted-foreground" />
                        </div>
                    </div>
                    <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-input border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                </div>

                {/* Leverage Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Leverage</span>
                        <span className="text-sm text-foreground">{leverage}x</span>
                    </div>

                    <div className="relative">
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={leverage}
                            onChange={handleLeverageChange}
                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>1x</span>
                            <span>25x</span>
                            <span>50x</span>
                            <span>100x</span>
                        </div>
                    </div>
                </div>

                {/* Additional Trading Info */}
                <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                        <span>Est. Margin</span>
                        <span>--</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Est. Fee</span>
                        <span>--</span>
                    </div>
                </div>

                {/* Place Order Button */}
                <button
                    className={clsx(
                        "w-full py-3 rounded font-medium transition-colors",
                        tradeType === 'Buy'
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-destructive hover:bg-destructive/90 text-white"
                    )}
                >
                    {tradeType} {asset}
                </button>
            </div>
        </div>
    );
};

export default TradingPanel;