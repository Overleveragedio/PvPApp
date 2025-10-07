import { Wallet } from "lucide-react";

interface BalanceDisplayProps {
    balance: number;
    currency?: string;
    label?: string;
}

const BalanceDisplay = ({
    balance,
    currency = "$",
    label = "Available"
}: BalanceDisplayProps) => {
    const formattedBalance = `${currency}${balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

    return (
        <div className="flex items-center gap-2 px-3 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium">
            <Wallet className="w-4 h-4" />
            <span>{formattedBalance}</span>
            <span className="text-primary/70">{label}</span>
        </div>
    );
};

export default BalanceDisplay;