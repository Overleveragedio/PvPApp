import { ReactNode } from "react";
import { Link as LinkIcon } from "lucide-react";
import Button from "@/components/Button";

export interface SocialAccount {
    id: string;
    name: string;
    icon: ReactNode;
    iconBgColor: string;
    isConnected: boolean;
    username?: string;
}

interface SocialAccountCardProps {
    account: SocialAccount;
    onConnect: () => void;
    onDisconnect: () => void;
}

export function SocialAccountCard({ account, onConnect, onDisconnect }: SocialAccountCardProps) {
    return (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${account.iconBgColor} rounded-full flex items-center justify-center`}>
                    {account.icon}
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">{account.name}</h3>
                    <p className="text-xs text-muted-foreground">
                        {account.isConnected ? (account.username || "Connected") : "Not connected"}
                    </p>
                </div>
            </div>
            {account.isConnected ? (
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={onDisconnect}
                >
                    Disconnect
                </Button>
            ) : (
                <Button
                    size="sm"
                    onClick={onConnect}
                >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Connect
                </Button>
            )}
        </div>
    );
}