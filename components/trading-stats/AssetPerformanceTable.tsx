"use client";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface AssetData {
    pair: string;
    trades: number;
    winRate: number;
    pnl: number;
    avgPnl: number;
}

const data: AssetData[] = [
    { pair: "BTC/USDT", trades: 89, winRate: 72.5, pnl: 1845.30, avgPnl: 20.73 },
    { pair: "ETH/USDT", trades: 67, winRate: 68.2, pnl: 1234.50, avgPnl: 18.42 },
    { pair: "SOL/USDT", trades: 45, winRate: 64.4, pnl: 892.80, avgPnl: 19.84 },
    { pair: "AVAX/USDT", trades: 28, winRate: 60.7, pnl: 345.20, avgPnl: 12.33 },
    { pair: "MATIC/USDT", trades: 18, winRate: 55.6, pnl: -67.80, avgPnl: -3.77 },
];

type SortField = keyof AssetData;
type SortDirection = "asc" | "desc";

export function AssetPerformanceTable() {
    const [sortField, setSortField] = useState<SortField>("pnl");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === "asc" ? 1 : -1;
        return aValue > bValue ? modifier : -modifier;
    });

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ArrowUpDown className="w-3 h-3" />;
        return sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
    };

    return (
        <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-base font-semibold text-card-foreground mb-4">Asset Performance</h3>
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <button
                                    onClick={() => handleSort("pair")}
                                    className="flex items-center gap-1 hover:text-foreground"
                                >
                                    Pair <SortIcon field="pair" />
                                </button>
                            </TableHead>
                            <TableHead className="text-right">
                                <button
                                    onClick={() => handleSort("trades")}
                                    className="flex items-center gap-1 hover:text-foreground ml-auto"
                                >
                                    Trades <SortIcon field="trades" />
                                </button>
                            </TableHead>
                            <TableHead className="text-right">
                                <button
                                    onClick={() => handleSort("winRate")}
                                    className="flex items-center gap-1 hover:text-foreground ml-auto"
                                >
                                    Win Rate <SortIcon field="winRate" />
                                </button>
                            </TableHead>
                            <TableHead className="text-right">
                                <button
                                    onClick={() => handleSort("pnl")}
                                    className="flex items-center gap-1 hover:text-foreground ml-auto"
                                >
                                    Total P&L <SortIcon field="pnl" />
                                </button>
                            </TableHead>
                            <TableHead className="text-right">
                                <button
                                    onClick={() => handleSort("avgPnl")}
                                    className="flex items-center gap-1 hover:text-foreground ml-auto"
                                >
                                    Avg P&L <SortIcon field="avgPnl" />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.map((asset) => (
                            <TableRow key={asset.pair}>
                                <TableCell className="font-medium">{asset.pair}</TableCell>
                                <TableCell className="text-right">{asset.trades}</TableCell>
                                <TableCell className="text-right">
                                    <span className={asset.winRate >= 60 ? "text-green-400" : "text-muted-foreground"}>
                                        {asset.winRate.toFixed(1)}%
                                    </span>
                                </TableCell>
                                <TableCell className={`text-right font-semibold ${asset.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                                    ${asset.pnl.toFixed(2)}
                                </TableCell>
                                <TableCell className={`text-right ${asset.avgPnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                                    ${asset.avgPnl.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

