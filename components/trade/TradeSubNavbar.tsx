import { BarChart3, Trophy, Target, FileText, ArrowUpDown, DollarSign, Clock } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import TradesTable from "./TradesTable";

const TradeSubNavbar = () => {
    const [activeTab, setActiveTab] = useState('trades');

    const navItems = [
        {
            id: 'trades',
            label: 'Trades',
            icon: BarChart3,
            count: null
        },
        {
            id: 'open-orders',
            label: 'Open Orders',
            icon: FileText,
            count: null
        },
        {
            id: 'trade-history',
            label: 'Trade History',
            icon: Clock,
            count: null
        },
        {
            id: 'order-history',
            label: 'Order History',
            icon: FileText,
            count: null
        },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'trades':
                return <TradesTable />;
            case 'top-traders':
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Top Traders content coming soon...
                    </div>
                );
            case 'open-orders':
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Open Orders content coming soon...
                    </div>
                );
            case 'twap':
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        TWAP content coming soon...
                    </div>
                );
            case 'trade-history':
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Trade History content coming soon...
                    </div>
                );
            case 'funding-history':
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Funding History content coming soon...
                    </div>
                );
            case 'order-history':
                return (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Order History content coming soon...
                    </div>
                );
            default:
                return <TradesTable />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-background">
            {/* Tab Navigation */}
            <div className="border-b border-border bg-background-secondary">
                <div className="flex items-center gap-1 overflow-x-auto">
                    {navItems.map(({ id, label, icon: Icon, count }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap",
                                activeTab === id
                                    ? "text-foreground font-bold border-b-2 border-b-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                            {count && (
                                <span className="text-muted-foreground text-xs">
                                    ({count})
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TradeSubNavbar;