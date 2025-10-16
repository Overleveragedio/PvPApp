"use client";
import { Search } from "lucide-react";
import CompetitionCard from "@/components/competitions/CompetitionCard";
import TabNavigation from "@/components/ui/TabNavigation";
import Select from "@/components/ui/FilterSelect";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { filterCompetitions } from "@/lib/competitions";
import { useEffect, useRef, useState } from "react";
import { CompetitionStatus } from "@/types/competitions";
import CompetitionCardSkeleton from "@/components/competitions/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";

const tabsData = [
    { id: "all", label: "All" },
    { id: "live", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" }
];

const tradingPairsOptions = [
    { value: "BTC/USDT", label: "BTC/USDT" },
    { value: "ETH/USDT", label: "ETH/USDT" },
    { value: "SOL/USDT", label: "SOL/USDT" }
];

const sortByOptions = [
    { value: "startDate", label: "Start Time" },
    { value: "prizePool", label: "Prize Pool" },
    { value: "participants", label: "Participants" },
    { value: "entryFee", label: "Entry Fee" },
];

const Board = () => {
    const [filterOptions, setFilterOptions] = useState({
        status: CompetitionStatus.ALL,
        query: "",
        sortBy: "startDate",
        sortOrder: "asc",
        pair: "",
        page: 1,
        limit: 10,
    })
    const observerTarget = useRef(null);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['competitions', filterOptions],
        queryFn: ({ pageParam = 1 }) => filterCompetitions({ ...filterOptions, page: pageParam, limit: filterOptions.limit }),
        getNextPageParam: (lastPage, pages) => lastPage.meta.hasNextPage ? pages.length + 1 : undefined,
        initialPageParam: 1,
    })

    const competitions = data?.pages.flatMap((page) => page.data) || [];

    const handleTabChange = (tabId: string) => {
        switch (tabId) {
            case "all":
                setFilterOptions({ ...filterOptions, status: CompetitionStatus.ALL })
                break;
            case "live":
                setFilterOptions({ ...filterOptions, status: CompetitionStatus.LIVE })
                break;
            case "upcoming":
                setFilterOptions({ ...filterOptions, status: CompetitionStatus.PENDING })
                break;
            case "completed":
                setFilterOptions({ ...filterOptions, status: CompetitionStatus.ENDED })
                break;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 0.1 });

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const handleTradingPairChange = (value: string) => {
        setFilterOptions({ ...filterOptions, pair: value })
    };

    const handleSortByChange = (value: string) => {
        console.log("Start time changed:", value);
        setFilterOptions({ ...filterOptions, sortBy: value })
    };

    return (
        <section className="py-8 px-4">
            <div className="container mx-auto">
                <div className="bg-background-tertiary/50 p-8 mb-5 rounded-2xl">
                    {/* Search and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
                        {/* Search Bar */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search competitions by name..."
                                className="w-full bg-background border border-slate-700/50 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-colors"
                                onChange={(e) => setFilterOptions({ ...filterOptions, query: e.target.value })}
                            />
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="flex gap-3">
                            <Select
                                options={tradingPairsOptions}
                                placeholder="All Pairs"
                                variant="secondary"
                                onChange={handleTradingPairChange}
                            />
                            <Select
                                options={sortByOptions}
                                variant="secondary"
                                value={filterOptions.sortBy}
                                onChange={handleSortByChange}
                            />
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <TabNavigation
                        tabs={tabsData}
                        defaultActiveTab="all"
                        onTabChange={handleTabChange}
                        className=""
                    />
                </div>

                {/* Competitions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        isLoading && (
                            <>
                                <CompetitionCardSkeleton />
                                <CompetitionCardSkeleton />
                                <CompetitionCardSkeleton />
                            </>
                        )
                    }
                    {!isLoading && competitions.length === 0 && (
                        <EmptyState
                            title="No Competitions Found"
                            description={
                                filterOptions.query
                                    ? `No competitions match "${filterOptions.query}". Try a different search term.`
                                    : "No competitions available for this filter. Check back soon!"
                            }
                        />
                    )}

                    {competitions.map((competition) => (
                        <CompetitionCard key={competition.id} competition={competition} />
                    ))}
                </div>
                <div ref={observerTarget} className="mt-8 h-1" />
            </div>
        </section>
    )
}

export default Board;