"use client";
import { useState } from "react";
import { ArrowDownToLine, Wallet, AlertCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface CryptoOption {
    symbol: string;
    name: string;
    available: number;
    icon: string;
    minWithdrawal: number;
    networkFee: number;
}

const cryptoOptions: CryptoOption[] = [
    { symbol: "ETH", name: "Ethereum", available: 4.5234, icon: "⟠", minWithdrawal: 0.01, networkFee: 0.002 },
    { symbol: "BTC", name: "Bitcoin", available: 0.1523, icon: "₿", minWithdrawal: 0.001, networkFee: 0.0001 },
    { symbol: "USDT", name: "Tether", available: 12450.00, icon: "₮", minWithdrawal: 10, networkFee: 1 },
    { symbol: "SOL", name: "Solana", available: 45.8920, icon: "◎", minWithdrawal: 0.1, networkFee: 0.01 },
];

export function WithdrawDialog() {
    const [open, setOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption>(cryptoOptions[0]);
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [txHash, setTxHash] = useState("");

    const handleMaxClick = () => {
        setAmount(selectedCrypto.available.toString());
    };

    const handleWithdraw = () => {
        // Implement withdrawal logic here
        console.log("Withdrawing:", amount, selectedCrypto.symbol, "to", address);

        // Simulate transaction hash generation
        const mockTxHash = "0x" + Math.random().toString(16).substring(2, 42);
        setTxHash(mockTxHash);

        // Show success state
        setIsSuccess(true);
    };

    const handleClose = () => {
        setOpen(false);
        // Reset form after dialog closes
        setTimeout(() => {
            setIsSuccess(false);
            setAmount("");
            setAddress("");
            setTxHash("");
        }, 300); // Wait for dialog close animation
    };

    const isValidAmount = amount &&
        parseFloat(amount) >= selectedCrypto.minWithdrawal &&
        parseFloat(amount) <= selectedCrypto.available;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="w-full md:w-auto text-sm" variant="secondary">
                    <ArrowDownToLine className="w-4 h-4 mr-2" />
                    Withdraw Funds
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                {isSuccess ? (
                    // Success State
                    <>
                        <DialogHeader>
                            <DialogTitle>Withdrawal Successful!</DialogTitle>
                            <DialogDescription>
                                Your withdrawal is being processed
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 mt-6">
                            {/* Success Icon */}
                            <div className="flex flex-col items-center justify-center py-6">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                                </div>
                                <p className="text-lg font-semibold text-foreground text-center">
                                    Withdrawal Initiated
                                </p>
                                <p className="text-sm text-muted-foreground text-center mt-2">
                                    Your transaction has been submitted successfully
                                </p>
                            </div>

                            {/* Transaction Details */}
                            <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount:</span>
                                    <span className="font-semibold text-foreground">
                                        {parseFloat(amount).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 4
                                        })} {selectedCrypto.symbol}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Network Fee:</span>
                                    <span className="font-semibold text-foreground">
                                        {selectedCrypto.networkFee} {selectedCrypto.symbol}
                                    </span>
                                </div>
                                <div className="border-t border-border pt-3 flex justify-between">
                                    <span className="text-muted-foreground">Total:</span>
                                    <span className="font-bold text-primary">
                                        {(parseFloat(amount) + selectedCrypto.networkFee).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 4
                                        })} {selectedCrypto.symbol}
                                    </span>
                                </div>
                                <div className="border-t border-border pt-3">
                                    <span className="text-muted-foreground block mb-1">To Address:</span>
                                    <span className="font-mono text-xs text-foreground break-all">{address}</span>
                                </div>
                                <div className="border-t border-border pt-3">
                                    <span className="text-muted-foreground block mb-1">Transaction Hash:</span>
                                    <a
                                        href={`https://etherscan.io/tx/${txHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs text-primary hover:text-primary/80 break-all underline"
                                    >
                                        {txHash}
                                    </a>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-blue-400">
                                    <p className="font-medium mb-1">What&apos;s Next?</p>
                                    <ul className="space-y-0.5 list-disc list-inside">
                                        <li>Your withdrawal will be processed within 10-30 minutes</li>
                                        <li>You&apos;ll receive a confirmation once it&apos;s completed</li>
                                        <li>Check your transaction status using the hash above</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Close Button */}
                            <Button onClick={handleClose} className="w-full">
                                Done
                            </Button>
                        </div>
                    </>
                ) : (
                    // Withdrawal Form State
                    <>
                        <DialogHeader>
                            <DialogTitle>Withdraw Funds</DialogTitle>
                            <DialogDescription>
                                Transfer your crypto to your wallet
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                            {/* Crypto Selection */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Select Cryptocurrency
                                </label>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary transition-colors flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{selectedCrypto.icon}</span>
                                            <div className="text-left">
                                                <p className="font-semibold">{selectedCrypto.symbol}</p>
                                                <p className="text-xs text-muted-foreground">{selectedCrypto.name}</p>
                                            </div>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                                            {cryptoOptions.map((crypto) => (
                                                <button
                                                    key={crypto.symbol}
                                                    onClick={() => {
                                                        setSelectedCrypto(crypto);
                                                        setIsDropdownOpen(false);
                                                        setAmount("");
                                                    }}
                                                    className="w-full px-4 py-3 hover:bg-muted/50 transition-colors flex items-center justify-between"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl">{crypto.icon}</span>
                                                        <div className="text-left">
                                                            <p className="font-semibold text-foreground">{crypto.symbol}</p>
                                                            <p className="text-xs text-muted-foreground">{crypto.name}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-green-400">
                                                        {crypto.available.toLocaleString(undefined, {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 4
                                                        })}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Available Balance Info */}
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Wallet className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">Available Balance</span>
                                </div>
                                <span className="text-lg font-bold text-green-400">
                                    {selectedCrypto.available.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 4
                                    })} {selectedCrypto.symbol}
                                </span>
                            </div>

                            {/* Withdrawal Address */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    {selectedCrypto.symbol} Wallet Address
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder={selectedCrypto.symbol === "BTC" ? "bc1..." : "0x..."}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            {/* Amount Input */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Amount
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full pl-4 pr-24 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                        step={selectedCrypto.symbol === "USDT" ? "0.01" : "0.0001"}
                                        min="0"
                                        max={selectedCrypto.available}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{selectedCrypto.symbol}</span>
                                        <button
                                            onClick={handleMaxClick}
                                            className="px-3 py-1 text-xs font-medium text-primary hover:text-primary/80 bg-primary/20 hover:bg-primary/30 rounded transition-colors"
                                        >
                                            MAX
                                        </button>
                                    </div>
                                </div>
                                {amount && parseFloat(amount) > selectedCrypto.available && (
                                    <p className="text-xs text-red-400 mt-1">Insufficient balance</p>
                                )}
                                {amount && parseFloat(amount) < selectedCrypto.minWithdrawal && parseFloat(amount) > 0 && (
                                    <p className="text-xs text-red-400 mt-1">
                                        Minimum withdrawal: {selectedCrypto.minWithdrawal} {selectedCrypto.symbol}
                                    </p>
                                )}
                            </div>

                            {/* Withdrawal Info */}
                            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                <div className="text-xs text-blue-400">
                                    <p className="font-medium mb-1">Withdrawal Information</p>
                                    <ul className="space-y-0.5 list-disc list-inside">
                                        <li>Minimum withdrawal: {selectedCrypto.minWithdrawal} {selectedCrypto.symbol}</li>
                                        <li>Processing time: 10-30 minutes</li>
                                        <li>Network fee: {selectedCrypto.networkFee} {selectedCrypto.symbol}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Withdraw Button */}
                            <Button
                                onClick={handleWithdraw}
                                disabled={!isValidAmount || !address}
                                className="w-full"
                            >
                                Withdraw {amount || "0.00"} {selectedCrypto.symbol}
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

