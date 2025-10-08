"use client";
import { Coins } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { WithdrawDialog } from "./WithdrawDialog";

interface CryptoAsset {
    symbol: string;
    name: string;
    available: number;
    icon: string;
    usdPrice: number;
}

const cryptoAssets: CryptoAsset[] = [
    { symbol: "ETH", name: "Ethereum", available: 4.5234, icon: "⟠", usdPrice: 2450.00 },
    { symbol: "BTC", name: "Bitcoin", available: 0.1523, icon: "₿", usdPrice: 45000.00 },
    { symbol: "USDT", name: "Tether", available: 12450.00, icon: "₮", usdPrice: 1.00 },
    { symbol: "SOL", name: "Solana", available: 45.8920, icon: "◎", usdPrice: 98.50 },
];

export function CryptoAssetsTable() {
    const totalPortfolioValue = cryptoAssets.reduce((sum, asset) => {
        return sum + ((asset.available) * asset.usdPrice);
    }, 0);

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Coins className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">Your Assets</h2>
                </div>
                <WithdrawDialog />
            </div>

            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Asset</TableHead>
                            <TableHead className="text-right">Available</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="text-right">USD Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cryptoAssets.map((asset) => {
                            const total = asset.available;
                            const usdValue = total * asset.usdPrice;

                            return (
                                <TableRow key={asset.symbol} className="hover:bg-muted/50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">
                                                {asset.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">{asset.symbol}</p>
                                                <p className="text-xs text-muted-foreground">{asset.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="font-semibold text-green-400">
                                            {asset.available.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 4
                                            })}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="font-bold text-foreground">
                                            {total.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 4
                                            })}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="font-semibold text-primary">
                                            ${usdValue.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow className="border-t-2 border-border bg-muted/30 font-bold">
                            <TableCell className="text-foreground">Total Portfolio Value</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right text-primary text-lg">
                                ${totalPortfolioValue.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

