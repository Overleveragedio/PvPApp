"use client";
import { useEffect, useRef, useState } from "react";

interface UseVisibleRowsOptions {
    rowHeight?: number;
    headerHeight?: number;
    footerHeight?: number;
    padding?: number;
}

export function useVisibleRows(options: UseVisibleRowsOptions = {}) {
    const {
        rowHeight = 60,
        headerHeight = 40,
        footerHeight = 0,
        padding = 32, // p-4 * 2
    } = options;

    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleRows, setVisibleRows] = useState(5); // default fallback

    useEffect(() => {
        const calculateVisibleRows = () => {
            if (containerRef.current) {
                const containerHeight = containerRef.current.offsetHeight;
                const availableHeight = containerHeight - headerHeight - footerHeight - padding;
                const rows = Math.max(1, Math.floor(availableHeight / rowHeight));
                setVisibleRows(rows);
            }
        };

        // Calculate on mount
        calculateVisibleRows();

        // Recalculate on resize with debounce
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(calculateVisibleRows, 150);
        };

        window.addEventListener("resize", handleResize);

        // Use ResizeObserver for container size changes
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
            clearTimeout(timeoutId);
        };
    }, [rowHeight, headerHeight, footerHeight, padding]);

    return { containerRef, visibleRows };
}