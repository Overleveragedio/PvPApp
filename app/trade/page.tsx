"use client"
import Chart from "@/components/trade/Chart"
import TradeSubNavbar from "@/components/trade/TradeSubNavbar"
import TradingPanel from "@/components/trade/TradingPanel"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import TradeNavbar from "@/components/ui/TradeNavbar"

export default function Trade() {
    return (
        <div className="h-full bg-background  flex flex-col">
            <TradeNavbar />
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full"
            >
                <ResizablePanel defaultSize={95}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={95}>
                            <Chart />
                        </ResizablePanel>
                        <ResizableHandle />
                        <ResizablePanel defaultSize={50}>
                            <TradeSubNavbar />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={20}>
                    <TradingPanel />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}