"use client";
import { useState, useEffect } from "react";
import { Trophy, Medal, Award } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";

interface Competition {
    id: string;
    name: string;
    date: string;
    rank: number;
    totalParticipants: number;
    trades: number;
    pnl: number;
    prize: string;
    status: "completed" | "active" | "upcoming";
}

interface MyCompetitionsTableProps {
    data: Competition[];
}

const MyCompetitionsTable = ({ data }: MyCompetitionsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Calculate optimal items per page based on viewport height
    useEffect(() => {
        const calculateItemsPerPage = () => {
            const viewportHeight = window.innerHeight;

            // More aggressive height calculations to utilize space
            const headerHeight = 60; // Header + navigation
            const paginationHeight = 50; // Pagination component
            const tableHeaderHeight = 40; // Table header row
            const containerPadding = 30; // Container padding and margins
            const extraSpacing = 90; // Minimal safety buffer

            const availableHeight = viewportHeight - headerHeight - paginationHeight - tableHeaderHeight - containerPadding - extraSpacing;

            // Each row is approximately 50px tall
            const rowHeight = 50;
            const maxItems = Math.floor(availableHeight / rowHeight);

            // More aggressive bounds - minimum 8, maximum 35
            const optimalItems = Math.max(8, Math.min(35, maxItems));

            console.log('Viewport height:', viewportHeight);
            console.log('Available height:', availableHeight);
            console.log('Max items calculated:', maxItems);
            console.log('Optimal items:', optimalItems);
            console.log('Current items per page:', itemsPerPage);

            setItemsPerPage(optimalItems);
        };

        calculateItemsPerPage();
        window.addEventListener('resize', calculateItemsPerPage);

        return () => window.removeEventListener('resize', calculateItemsPerPage);
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getRankBadge = (rank: number) => {
        if (rank === 1) {
            return (
                <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">1st</span>
                </div>
            );
        }
        if (rank === 2) {
            return (
                <div className="flex items-center gap-1">
                    <Medal className="w-4 h-4 text-slate-300" />
                    <span className="text-slate-300 font-bold">2nd</span>
                </div>
            );
        }
        if (rank === 3) {
            return (
                <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span className="text-amber-600 font-bold">3rd</span>
                </div>
            );
        }
        return <span className="text-slate-400 font-medium">#{rank}</span>;
    };

    const getPnLColor = (pnl: number) => {
        if (pnl > 0) return "text-green-400";
        if (pnl < 0) return "text-red-400";
        return "text-slate-400";
    };

    const getStatusBadge = (status: Competition["status"]) => {
        switch (status) {
            case "active":
                return (
                    <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20">
                        Active
                    </span>
                );
            case "upcoming":
                return (
                    <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                        Upcoming
                    </span>
                );
            case "completed":
                return (
                    <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/20">
                        Completed
                    </span>
                );
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-4 mt-4 h-full">
            <div className="space-y-1">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-3 px-3 py-2 border-b border-border">
                    <div className="col-span-3 text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                        Competition
                    </div>
                    <div className="col-span-2 text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                        Status
                    </div>
                    <div className="col-span-2 text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                        Rank
                    </div>
                    <div className="col-span-2 text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                        Trades
                    </div>
                    <div className="col-span-1 text-right text-muted-foreground text-xs uppercase font-semibold tracking-wider">
                        Prize
                    </div>
                </div>

                {/* Table Rows */}
                <div className="space-y-1 h-full">
                    {currentData.length > 0 ? (
                        currentData.map((competition) => (
                            <div
                                key={competition.id}
                                className="grid grid-cols-12 gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors border border-border/50 items-center"
                            >
                                {/* Competition Name */}
                                <div className="col-span-3">
                                    <div>
                                        <p className="text-sm text-foreground font-semibold truncate">
                                            {competition.name}
                                        </p>
                                        {/* <p className="text-xs text-muted-foreground">
                                            {competition.date}
                                        </p> */}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-span-2">
                                    {getStatusBadge(competition.status)}
                                </div>

                                {/* Rank */}
                                <div className="col-span-2">
                                    <div className="flex items-center gap-2">
                                        {getRankBadge(competition.rank)}
                                        <span className="text-xs text-muted-foreground">
                                            / {competition.totalParticipants}
                                        </span>
                                    </div>
                                </div>

                                {/* Trades */}
                                <div className="col-span-2">
                                    <span className="text-sm text-foreground font-medium">
                                        {competition.trades}
                                    </span>
                                </div>

                                {/* Prize */}
                                <div className="col-span-1 text-right">
                                    <span className="text-sm text-primary font-semibold">
                                        {competition.prize}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">
                                You haven&apos;t participated in any competitions yet
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination - Always show */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MyCompetitionsTable;

