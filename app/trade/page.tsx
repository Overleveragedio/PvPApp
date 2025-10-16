"use client"
import Chart from "@/components/trade/Chart"
import TradeSubNavbar from "@/components/trade/TradeSubNavbar"
import TradingPanel from "@/components/trade/TradingPanel"
import TraderTicker from "@/components/trade/TraderTicker"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import TradeNavbar from "@/components/ui/TradeNavbar"
import { useSearchParams } from "next/navigation"
import { getCompetitionById } from "@/lib/competitions"
import { useQuery } from "@tanstack/react-query"

export default function Trade() {
    const searchParams = useSearchParams()
    const competitionId = searchParams.get("competition")
    const { data: competition, isLoading, error } = useQuery({
        queryKey: ['competition', competitionId],
        queryFn: () => getCompetitionById(competitionId!),
        enabled: !!competitionId,
    })

    if (isLoading) {
        return (
            <div className="h-full bg-background flex flex-col">
                <TradeNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-muted-foreground text-sm">Loading competition data...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="h-full bg-background flex flex-col">
                <TradeNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="text-destructive text-4xl">⚠️</div>
                        <div>
                            <p className="text-foreground font-semibold mb-1">Failed to load competition</p>
                            <p className="text-muted-foreground text-sm">Please try again later</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!competitionId) {
        return (
            <div className="h-full bg-background flex flex-col">
                <TradeNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-foreground font-semibold">No competition selected</p>
                        <p className="text-muted-foreground text-sm">Please select a competition to start trading</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full bg-background  flex flex-col">
            <TradeNavbar />
            <TraderTicker competition={competition!} />
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full flex-1"
            >
                <ResizablePanel defaultSize={95}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={95}>
                            <Chart symbol={competition?.symbol.split("/")[0]} />
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={50}>
                            <TradeSubNavbar competition={competition!} />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={20}>
                    <TradingPanel competition={competition!} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}