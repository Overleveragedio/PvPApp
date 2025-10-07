import { Trophy } from "lucide-react";
import { TableCard } from "./TableCard";
import { TableRow, TableCell } from "@/components/ui/table";

interface Competition {
    name: string;
    rank: string;
    prize: string;
    date: string;
}

interface RecentCompetitionsTableProps {
    competitions: Competition[];
    totalCount: number;
    containerRef?: React.RefObject<HTMLDivElement>;
}

export function RecentCompetitionsTable({
    competitions,
    totalCount,
    containerRef
}: RecentCompetitionsTableProps) {
    const columns = [
        { header: "Name" },
        { header: "Rank" },
        { header: "Prize", className: "text-right" },
    ];

    const renderRow = (competition: Competition, index: number) => (
        <TableRow key={index}>
            <TableCell className="font-medium text-foreground">
                <div>
                    <div className="text-sm">{competition.name}</div>
                    <div className="text-xs text-muted-foreground">{competition.date}</div>
                </div>
            </TableCell>
            <TableCell className="text-primary font-semibold">
                {competition.rank}
            </TableCell>
            <TableCell className="text-right text-green-400 font-semibold">
                {competition.prize}
            </TableCell>
        </TableRow>
    );

    return (
        <TableCard
            icon={Trophy}
            title="Recent Competitions"
            columns={columns}
            data={competitions}
            totalCount={totalCount}
            viewMoreHref="/profile/competitions"
            renderRow={renderRow}
            emptyMessage="No competitions yet"
            containerRef={containerRef}
        />
    );
}