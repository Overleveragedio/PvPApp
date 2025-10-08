"use client";
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Withdrawal {
    id: string;
    amount: number;
    crypto: string;
    cryptoIcon: string;
    address: string;
    status: "Completed" | "Pending" | "Failed";
    txHash: string;
    date: string;
    timestamp: number;
}

const sampleData: Withdrawal[] = [
    { id: "1", amount: 2.5, crypto: "ETH", cryptoIcon: "⟠", address: "0x4f3b...a21c", status: "Completed", txHash: "0x4f3ba21c7d8e9f1a2b3c4d5e6f7a8b9c", date: "Jan 4, 2025", timestamp: 1704326400000 },
    { id: "2", amount: 1000, crypto: "USDT", cryptoIcon: "₮", address: "0x8a7d...bc45", status: "Completed", txHash: "0x8a7dbc457e9f1a2b3c4d5e6f7a8b9c0d", date: "Dec 28, 2024", timestamp: 1703721600000 },
    { id: "3", amount: 0.05, crypto: "BTC", cryptoIcon: "₿", address: "bc1q2e9f...d876", status: "Pending", txHash: "0x2e9fd8769f1a2b3c4d5e6f7a8b9c0d1e", date: "Dec 20, 2024", timestamp: 1703030400000 },
    { id: "4", amount: 15.5, crypto: "SOL", cryptoIcon: "◎", address: "0x1c5a...e987", status: "Completed", txHash: "0x1c5ae9879f1a2b3c4d5e6f7a8b9c0d1e", date: "Dec 15, 2024", timestamp: 1702598400000 },
    { id: "5", amount: 500, crypto: "USDT", cryptoIcon: "₮", address: "0x9d2b...f654", status: "Failed", txHash: "0x9d2bf6549f1a2b3c4d5e6f7a8b9c0d1e", date: "Dec 10, 2024", timestamp: 1702166400000 },
];

type SortField = "amount" | "date" | "status";
type SortDirection = "asc" | "desc";

export function WithdrawalHistory() {
    const [sortField, setSortField] = useState<SortField>("date");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const sortedData = [...sampleData].sort((a, b) => {
        let aValue: number | string;
        let bValue: number | string;

        if (sortField === "date") {
            aValue = a.timestamp;
            bValue = b.timestamp;
        } else if (sortField === "amount") {
            aValue = a.amount;
            bValue = b.amount;
        } else {
            aValue = a.status;
            bValue = b.status;
        }

        const modifier = sortDirection === "asc" ? 1 : -1;
        return aValue > bValue ? modifier : -modifier;
    });

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ArrowUpDown className="w-3 h-3" />;
        return sortDirection === "asc" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
    };

    const getStatusColor = (status: Withdrawal["status"]) => {
        switch (status) {
            case "Completed":
                return "bg-green-500/20 text-green-400";
            case "Pending":
                return "bg-yellow-500/20 text-yellow-400";
            case "Failed":
                return "bg-red-500/20 text-red-400";
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Withdrawal History</h2>
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <button
                                    onClick={() => handleSort("date")}
                                    className="flex items-center gap-1 hover:text-foreground"
                                >
                                    Date <SortIcon field="date" />
                                </button>
                            </TableHead>
                            <TableHead>Asset</TableHead>
                            <TableHead className="text-right">
                                <button
                                    onClick={() => handleSort("amount")}
                                    className="flex items-center gap-1 hover:text-foreground ml-auto"
                                >
                                    Amount <SortIcon field="amount" />
                                </button>
                            </TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>
                                <button
                                    onClick={() => handleSort("status")}
                                    className="flex items-center gap-1 hover:text-foreground"
                                >
                                    Status <SortIcon field="status" />
                                </button>
                            </TableHead>
                            <TableHead>Transaction</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.length > 0 ? (
                            sortedData.map((withdrawal) => (
                                <TableRow key={withdrawal.id}>
                                    <TableCell className="font-medium text-foreground">
                                        {withdrawal.date}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{withdrawal.cryptoIcon}</span>
                                            <span className="font-semibold text-foreground">{withdrawal.crypto}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold text-foreground">
                                        {withdrawal.amount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 4
                                        })}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm text-muted-foreground">
                                        {withdrawal.address}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(withdrawal.status)}`}>
                                            {withdrawal.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            href={`https://etherscan.io/tx/${withdrawal.txHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm transition-colors"
                                        >
                                            View
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                                    No withdrawal history
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

