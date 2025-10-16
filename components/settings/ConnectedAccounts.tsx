"use client";
import { useState } from "react";
import { SocialAccountCard, SocialAccount } from "@/components/settings/SocialAccountCard";
import { FaTelegram, FaDiscord } from "react-icons/fa6";

export function ConnectedAccounts() {
    const [accounts, setAccounts] = useState<SocialAccount[]>([
        {
            id: "telegram",
            name: "Telegram",
            icon: <FaTelegram className="w-5 h-5 text-[#0088cc]" />,
            iconBgColor: "bg-[#0088cc]/20",
            isConnected: false,
            username: undefined,
        },
        {
            id: "discord",
            name: "Discord",
            icon: <FaDiscord className="w-5 h-5 text-[#5865F2]" />,
            iconBgColor: "bg-[#5865F2]/20",
            isConnected: true,
            username: "TradeMaster#1234",
        },
    ]);

    const handleConnect = (id: string) => {
        console.log(`Connecting ${id}...`);
        setAccounts(accounts.map(account =>
            account.id === id ? { ...account, isConnected: true } : account
        ));
    };

    const handleDisconnect = (id: string) => {
        setAccounts(accounts.map(account =>
            account.id === id ? { ...account, isConnected: false } : account
        ));
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Connected Accounts</h2>
            <p className="text-sm text-muted-foreground mb-6">
                Connect your social accounts for easier notifications
            </p>

            <div className="space-y-4">
                {accounts.map((account) => (
                    <SocialAccountCard
                        key={account.id}
                        account={account}
                        onConnect={() => handleConnect(account.id)}
                        onDisconnect={() => handleDisconnect(account.id)}
                    />
                ))}
            </div>
        </div>
    );
}