import { ArrowDownToLine } from "lucide-react";
import { TableCard } from "./TableCard";
import { TableRow, TableCell } from "@/components/ui/table";

interface Withdrawal {
    amount: string;
    status: "Completed" | "Pending" | "Failed";
    txHash: string;
    date: string;
}

interface WithdrawalHistoryTableProps {
    withdrawals: Withdrawal[];
    totalCount: number;
    containerRef?: React.RefObject<HTMLDivElement>;
}

export function WithdrawalHistoryTable({
    withdrawals,
    totalCount,
    containerRef
}: WithdrawalHistoryTableProps) {
    const columns = [
        { header: "Amount" },
        { header: "Status" },
        { header: "Date", className: "text-right" },
    ];

    const getStatusColor = (status: Withdrawal["status"]) => {
        switch (status) {
            case "Completed":
                return "bg-green-500/20 text-green-400";
            case "Pending":
                return "bg-yellow-500/20 text-yellow-400";
            case "Failed":
                return "bg-red-500/20 text-red-400";
            default:
                return "bg-gray-500/20 text-gray-400";
        }
    };

    const renderRow = (withdrawal: Withdrawal, index: number) => (
        <TableRow key={index}>
            <TableCell className="font-medium text-foreground">
                <div>
                    <div className="text-sm">{withdrawal.amount}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                        {withdrawal.txHash}
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(withdrawal.status)}`}>
                    {withdrawal.status}
                </span>
            </TableCell>
            <TableCell className="text-right text-muted-foreground text-sm">
                {withdrawal.date}
            </TableCell>
        </TableRow>
    );

    return (
        <TableCard
            icon={ArrowDownToLine}
            title="Withdrawal History"
            columns={columns}
            data={withdrawals}
            totalCount={totalCount}
            viewMoreHref="/profile/withdrawals"
            renderRow={renderRow}
            emptyMessage="No withdrawals yet"
            containerRef={containerRef}
        />
    );
}