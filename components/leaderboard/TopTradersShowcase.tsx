"use client";
import TraderCard from "./TraderCard";

interface Trader {
    rank: number;
    name: string;
    avatar: string;
    rankBadge: string;
    latestStats: string;
    winRate: string;
    kda: string;
}

interface TopTradersShowcaseProps {
    traders: Trader[];
}

const TopTradersShowcase = ({ traders }: TopTradersShowcaseProps) => {
    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {traders.map((trader) => (
                    <TraderCard
                        key={trader.rank}
                        rank={trader.rank}
                        name={trader.name}
                        avatar={trader.avatar}
                        rankBadge={trader.rankBadge}
                        latestStats={trader.latestStats}
                        winRate={trader.winRate}
                        kda={trader.kda}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopTradersShowcase;