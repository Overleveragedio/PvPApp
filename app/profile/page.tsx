"use client";
import { useAuth } from "@/contexts/AuthContext";
import { generateUsername } from "@/lib/utils";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { RecentCompetitionsTable } from "@/components/profile/RecentCompetitionsTable";
import { RecentTradesTable } from "@/components/profile/RecentTradesTable";
import { WithdrawalHistoryTable } from "@/components/profile/WithdrawalHistoryTable";
import { StatsCard } from "@/components/ui/StatsCard";
import { TotalTradesChart } from "@/components/profile/TotalTradesChart";
import { TotalPnlChart } from "@/components/profile/TotalPnlChart";
import { WinRateChart } from "@/components/profile/WinRateChart";

const Profile = () => {
    const { address } = useWalletConnection();

    // Sample data - replace with actual data from API
    const recentCompetitions = [
        { name: "Winter Challenge", rank: "12th", prize: "$500", date: "Jan 5" },
        { name: "Bull Run Contest", rank: "8th", prize: "$1,200", date: "Jan 3" },
        { name: "New Year Showdown", rank: "25th", prize: "$100", date: "Jan 1" },
    ];

    const recentTrades = [
        { pair: "BTC/USDT", type: "Buy" as const, profit: "+$245.50", date: "2h ago" },
        { pair: "ETH/USDT", type: "Sell" as const, profit: "-$89.20", date: "5h ago" },
        { pair: "SOL/USDT", type: "Buy" as const, profit: "+$156.30", date: "1d ago" },
    ];

    const withdrawalHistory = [
        { amount: "$2,500", status: "Completed" as const, txHash: "0x4f3b...a21c", date: "Jan 4" },
        { amount: "$1,000", status: "Completed" as const, txHash: "0x8a7d...bc45", date: "Dec 28" },
        { amount: "$500", status: "Pending" as const, txHash: "0x2e9f...d876", date: "Dec 20" },
    ];

    return (
        <div className="h-full flex flex-col gap-4 pb-6">
            {/* Profile Card */}
            <div className="bg-card border border-border rounded-lg p-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-black text-xl font-bold">
                            {generateUsername(address || '').charAt(4)}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-card-foreground mb-1">
                            {generateUsername(address || '')}
                        </h2>
                        <div className="flex items-center gap-2">
                            <a
                                href="#"
                                className="p-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all group"
                                title="Connect X (Twitter)"
                            >
                                <FaXTwitter className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                            </a>
                            <a
                                href="#"
                                className="p-1.5 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all group"
                                title="Connect Discord"
                            >
                                <FaDiscord className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#5865F2] transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats with Charts */}
            <div className="flex gap-4 h-48 flex-shrink-0">
                <div className="flex-1">
                    <StatsCard icon={Activity} label="Total Trades" value="151">
                        <TotalTradesChart />
                    </StatsCard>
                </div>

                <div className="flex-1">
                    <StatsCard icon={TrendingDown} label="Total P&L" value="$4,250.00" valueColor="text-green-400">
                        <TotalPnlChart />
                    </StatsCard>
                </div>

                <div className="flex-1">
                    <StatsCard icon={TrendingUp} label="Win Rate" value="" valueColor="text-primary">
                        <WinRateChart />
                    </StatsCard>
                </div>
            </div>

            {/* Recent Activity - Three Tables - Fill Remaining Height */}
            <div className="flex gap-4 flex-1 min-h-0  flex-shrink-0 flex-wrap">
                <div className="flex-1">
                    <RecentCompetitionsTable competitions={recentCompetitions} totalCount={recentCompetitions.length} />
                </div>
                <div className="flex-1">
                    <RecentTradesTable trades={recentTrades} totalCount={recentTrades.length} />
                </div>
                <div className="flex-1">
                    <WithdrawalHistoryTable withdrawals={withdrawalHistory} totalCount={withdrawalHistory.length} />
                </div>
            </div>
        </div>
    );
};

export default Profile;