"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-center px-3 pt-3 border-t border-border">
            <div className="flex items-center gap-1 sm:gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-medium"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                </button>

                {/* Current Page Number */}
                <div className="flex items-center gap-1 px-2 sm:px-4 py-2">
                    <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">Page</span>
                    <span className="px-2 sm:px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium">
                        {currentPage}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                        <span className="hidden sm:inline">of </span>
                        <span className="sm:hidden">/</span>
                        {totalPages}
                    </span>
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-medium"
                    aria-label="Next page"
                >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
            </div>
        </div>
    );
}

