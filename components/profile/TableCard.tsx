import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableColumn {
    header: string;
    className?: string;
}

interface TableCardProps<T> {
    icon: LucideIcon;
    title: string;
    columns: TableColumn[];
    data: T[];
    totalCount: number;
    viewMoreHref?: string;
    renderRow: (item: T, index: number) => React.ReactNode;
    emptyMessage?: string;
    containerRef?: React.RefObject<HTMLDivElement>;
}

export function TableCard<T>({
    icon: Icon,
    title,
    columns,
    data,
    totalCount,
    viewMoreHref,
    renderRow,
    emptyMessage = "No data available",
    containerRef,
}: TableCardProps<T>) {
    const showViewMore = viewMoreHref && totalCount > data.length;

    return (
        <div ref={containerRef} className="bg-card border border-border rounded-lg p-3 md:p-4 flex flex-col h-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="text-sm md:text-base font-semibold text-card-foreground truncate">{title}</h3>
                </div>
                {totalCount > 0 && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        Showing {data.length} of {totalCount}
                    </span>
                )}
            </div>
            <div className="flex-1 overflow-auto min-h-0 -mx-3 md:-mx-4 px-3 md:px-4">
                <Table>
                    <TableHeader className="sticky top-0 bg-card z-10">
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={`text-xs ${column.className || ''}`}>
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item, index) => renderRow(item, index))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center text-muted-foreground py-8 text-sm"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {showViewMore && (
                <div className="pt-2 md:pt-3 mt-2 md:mt-3 border-t border-border flex-shrink-0">
                    <Link
                        href={viewMoreHref}
                        className="flex items-center justify-center gap-2 text-xs md:text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                        <span>View All {totalCount}</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}
        </div>
    );
}