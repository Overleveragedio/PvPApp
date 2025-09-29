import { ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { useState } from "react";

interface Trade {
    id: string;
    timestamp: number; // Unix timestamp for easier API integration
    date: string; // Human readable date
    type: 'Buy' | 'Sell';
    usd: number;
    nl: number; // Token amount
    sol: number;
    price: number;
    maker: {
        address: string;
        username: string;
        avatar?: string;
    };
    transaction: {
        hash: string;
        signature: string;
        blockNumber?: number;
        gasUsed?: number;
    };
    market: {
        tokenAddress: string;
        tokenSymbol: string;
        tokenName: string;
    };
    priceImpact?: number;
    slippage?: number;
    fees?: {
        platform: number;
        network: number;
        total: number;
    };
}

const mockTrades: Trade[] = [
    {
        id: '1',
        timestamp: Date.now() - 11000, // 11 seconds ago
        date: '11s ago',
        type: 'Buy',
        usd: 99.36,
        nl: 12.095,
        sol: 0.4741,
        price: 0.008214,
        maker: {
            address: '0x1234567890abcdef1234567890abcdef12345678',
            username: 'agPmsN',
            avatar: ""
        },
        transaction: {
            hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
            signature: '5J7K8L9M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P',
            blockNumber: 12345678,
            gasUsed: 21000
        },
        market: {
            tokenAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
            tokenSymbol: 'NL',
            tokenName: 'Neon Labs'
        },
        priceImpact: 0.12,
        slippage: 0.5,
        fees: {
            platform: 0.25,
            network: 0.001,
            total: 0.251
        }
    },
    {
        id: '2',
        timestamp: Date.now() - 14000,
        date: '14s ago',
        type: 'Sell',
        usd: 1885.40,
        nl: 230.030,
        sol: 8.99,
        price: 0.008196,
        maker: {
            address: '0x4567890123def1234567890123def12345678901',
            username: 'w8CCNQ',
            avatar: ""
        },
        transaction: {
            hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            signature: '8M0N1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3L4M5N6O7P8Q9R0',
            blockNumber: 12345675,
            gasUsed: 21000
        },
        market: {
            tokenAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
            tokenSymbol: 'NL',
            tokenName: 'Neon Labs'
        },
        priceImpact: 1.2,
        slippage: 1.5,
        fees: {
            platform: 4.714,
            network: 0.001,
            total: 4.715
        }
    }
];

type SortField = 'date' | 'type' | 'usd' | 'nl' | 'sol' | 'price' | 'maker';
type SortDirection = 'asc' | 'desc';

interface TableColumn {
    key: SortField;
    label: string;
    sortable: boolean;
}

const TradesTable = () => {
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const columns: TableColumn[] = [
        { key: 'date', label: 'DATE', sortable: true },
        { key: 'type', label: 'TYPE', sortable: true },
        { key: 'usd', label: 'USD', sortable: true },
        { key: 'nl', label: 'USDC', sortable: true },
        { key: 'sol', label: 'BTC', sortable: true },
        { key: 'price', label: 'PRICE', sortable: true },
    ];

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const formatNumber = (num: number, decimals: number = 2) => {
        return num.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    const formatPrice = (price: number) => {
        return `$${price.toFixed(6)}`;
    };

    const getTradeTypeColor = (type: 'Buy' | 'Sell') => {
        return type === 'Buy' ? 'text-green-400' : 'text-red-400';
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ?
            <ChevronUp className="w-3 h-3" /> :
            <ChevronDown className="w-3 h-3" />;
    };

    const getMakerIcon = (maker: string) => {
        const colors = ['bg-blue-500', 'bg-orange-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500'];
        const index = maker.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const renderCellValue = (trade: Trade, column: TableColumn) => {
        const colorClass = clsx("font-medium", getTradeTypeColor(trade.type));

        switch (column.key) {
            case 'date':
                return <span className="text-muted-foreground">{trade.date}</span>;
            case 'type':
                return <span className={colorClass}>{trade.type}</span>;
            case 'usd':
                return <span className={colorClass}>{formatNumber(trade.usd)}</span>;
            case 'nl':
                return <span className={colorClass}>{formatNumber(trade.nl, 3)}</span>;
            case 'sol':
                return <span className={colorClass}>{formatNumber(trade.sol, 4)}</span>;
            case 'price':
                return <span className={colorClass}>{formatPrice(trade.price)}</span>;
            case 'maker':
                return (
                    <div className="flex items-center gap-2">
                        <div className={clsx(
                            "w-4 h-4 rounded flex items-center justify-center",
                            getMakerIcon(trade.maker.username)
                        )}>
                            <span className="text-white text-xs font-bold">
                                {trade.maker.username.charAt(0)}
                            </span>
                        </div>
                        <span className="text-foreground font-medium">
                            {trade.maker.username}
                        </span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col bg-background">
            <div className="overflow-auto flex-1">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-background-secondary border-b border-border">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={clsx(
                                        "text-left p-3 text-muted-foreground font-medium transition-colors",
                                        column.sortable && "cursor-pointer hover:text-foreground"
                                    )}
                                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.label}
                                        {column.sortable && <SortIcon field={column.key} />}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Repeat the data 4 more times */}
                        {Array.from({ length: 4 }).map((_, repeatIndex) =>
                            mockTrades.map((trade) => (
                                <tr
                                    key={`${trade.id}-repeat-${repeatIndex}`}
                                    className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                                >
                                    {columns.map((column) => (
                                        <td key={column.key} className="p-3">
                                            {renderCellValue(trade, column)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TradesTable;