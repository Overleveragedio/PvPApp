'use client'

import { Trophy, ChevronDown, ChevronUp } from 'lucide-react'
import Button from '@/components/Button'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface JoinCompetitionModalProps {
    isOpen: boolean
    onClose: () => void
    competition?: {
        title: string
        buyIn: string
        filled: string
        maxParticipants: string
        tradingPairs: string
        length: string
        payoutStructure: Array<{
            position: number
            amount: string
            trophy?: boolean
        }>
    }
}

const JoinCompetitionModal = ({ isOpen, onClose, competition }: JoinCompetitionModalProps) => {
    const [showAllPayouts, setShowAllPayouts] = useState(false)

    const defaultCompetition = {
        title: "DeFi Duel",
        buyIn: "$10",
        filled: "0/600",
        tradingPairs: "BTC/USDT",
        length: "1 Hour",
        payoutStructure: [
            { position: 1, amount: "$3000.00", trophy: true },
            { position: 2, amount: "$1200.00", trophy: true },
            { position: 3, amount: "$300.00", trophy: true },
            { position: 4, amount: "$120.00" },
            { position: 5, amount: "$258.66" },
            { position: 6, amount: "$129.33" },
            { position: 7, amount: "$86.22" },
            { position: 8, amount: "$64.67" },
            { position: 9, amount: "$51.73" },
        ]
    }

    const comp = competition || defaultCompetition

    const getTrophyEmoji = (position: number) => {
        switch (position) {
            case 1: return "🥇"
            case 2: return "🥈"
            case 3: return "🥉"
            default: return ""
        }
    }

    // Show only top 3 by default, or all if toggled
    const visiblePayouts = showAllPayouts ? comp.payoutStructure : comp.payoutStructure.slice(0, 3)
    const remainingPayouts = comp.payoutStructure.length - 3

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                        {comp.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Competition Details - 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Buy-In:</span>
                            <span className="text-white font-semibold">{comp.buyIn}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Filled:</span>
                            <span className="text-white font-semibold">{comp.filled}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Trading:</span>
                            <span className="text-white font-semibold">{comp.tradingPairs}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Length:</span>
                            <span className="text-white font-semibold">{comp.length}</span>
                        </div>
                    </div>

                    {/* Payout Structure - Compact */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-semibold">Payout Structure</h3>
                            {remainingPayouts > 0 && (
                                <button
                                    onClick={() => setShowAllPayouts(!showAllPayouts)}
                                    className="flex items-center gap-1 text-primary text-sm hover:text-primary/80 transition-colors"
                                >
                                    {showAllPayouts ? (
                                        <>
                                            Show Less <ChevronUp className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            +{remainingPayouts} more <ChevronDown className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className={`space-y-2 ${showAllPayouts ? 'max-h-48 overflow-y-auto pr-2' : ''}`}>
                            {visiblePayouts.map((payout, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center py-2 px-3 rounded-lg border transition-all ${payout.trophy
                                        ? 'bg-primary/10 border-primary/30'
                                        : 'bg-background-tertiary border-slate-700/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm ${payout.trophy ? 'text-primary' : 'text-slate-400'}`}>
                                            Position {payout.position}
                                        </span>
                                        {payout.trophy && (
                                            <span className="text-base">
                                                {getTrophyEmoji(payout.position)}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`font-semibold ${payout.trophy ? 'text-primary' : 'text-white'}`}>
                                        {payout.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Join Button */}
                    <Button className="w-full">
                        <Trophy className="w-4 h-4" />
                        Join Competition
                    </Button>

                    {/* Footer Note - More compact */}
                    <p className="text-slate-400 text-xs text-center">
                        By joining, you agree to the competition terms and conditions
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default JoinCompetitionModal