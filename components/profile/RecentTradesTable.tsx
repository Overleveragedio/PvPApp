import { ArrowUpDown } from "lucide-react";
import { TableCard } from "./TableCard";
import { TableRow, TableCell } from "@/components/ui/table";

interface Trade {
    pair: string;
    type: "Buy" | "Sell";
    profit: string;
    date: string;
}

interface RecentTradesTableProps {
    trades: Trade[];
    totalCount: number;
    containerRef?: React.RefObject<HTMLDivElement>;
}

export function RecentTradesTable({
    trades,
    totalCount,
    containerRef
}: RecentTradesTableProps) {
    const columns = [
        { header: "Pair" },
        { header: "Type" },
        { header: "P&L", className: "text-right" },
    ];

    const renderRow = (trade: Trade, index: number) => (
        <TableRow key={index}>
            <TableCell className="font-medium text-foreground">
                <div>
                    <div className="text-sm">{trade.pair}</div>
                    <div className="text-xs text-muted-foreground">{trade.date}</div>
                </div>
            </TableCell>
            <TableCell>
                <span
                    className={`text-xs px-2 py-1 rounded ${trade.type === "Buy"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                >
                    {trade.type}
                </span>
            </TableCell>
            <TableCell
                className={`text-right font-semibold ${trade.profit.startsWith("+") ? "text-green-400" : "text-red-400"
                    }`}
            >
                {trade.profit}
            </TableCell>
        </TableRow>
    );

    return (
        <TableCard
            icon={ArrowUpDown}
            title="Recent Trades"
            columns={columns}
            data={trades}
            totalCount={totalCount}
            viewMoreHref="/profile/history"
            renderRow={renderRow}
            emptyMessage="No trades yet"
            containerRef={containerRef}
        />
    );
}