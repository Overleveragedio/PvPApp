"use client";
import { BalanceOverview } from "@/components/wallet/BalanceOverview";
import { CryptoAssetsTable } from "@/components/wallet/CryptoAssetsTable";
import { WithdrawalHistory } from "@/components/wallet/WithdrawalHistory";

export default function WalletsAndFunds() {
    return (
        <div className="h-full flex flex-col pb-6 gap-6 px-4 md:px-8 overflow-auto">
            {/* Balance Overview - USD Summary Cards */}
            <BalanceOverview />

            {/* Crypto Assets Table with Withdraw Button */}
            <div className="space-y-4">
                <CryptoAssetsTable />
            </div>

            {/* Withdrawal History */}
            <WithdrawalHistory />
        </div>
    );
}