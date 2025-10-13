'use client'

import { Trophy, ChevronDown, ChevronUp, LogIn } from 'lucide-react'
import Button from '@/components/Button'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from 'next/link'
import { Competition } from '@/types/competitions'
import { formatEntryFee } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface JoinCompetitionModalProps {
    isOpen: boolean
    onClose: () => void
    competition?: Competition
}

const JoinCompetitionModal = ({ isOpen, onClose, competition }: JoinCompetitionModalProps) => {
    const [showAllPayouts, setShowAllPayouts] = useState(false)
    const { isAuthenticated, openSignInModal } = useAuth()

    if (!competition) return null

    const getTrophyEmoji = (position: number) => {
        switch (position) {
            case 1: return "🥇"
            case 2: return "🥈"
            case 3: return "🥉"
            default: return ""
        }
    }

    // Calculate competition duration
    const calculateDuration = () => {
        const start = new Date(competition.startDate)
        const end = new Date(competition.endDate)
        const diffMs = end.getTime() - start.getTime()
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
        const diffDays = Math.floor(diffHours / 24)

        if (diffDays > 0) {
            return `${diffDays} Day${diffDays > 1 ? 's' : ''}`
        }
        return `${diffHours} Hour${diffHours > 1 ? 's' : ''}`
    }

    // Show only top 3 by default, or all if toggled
    const visiblePayouts = showAllPayouts
        ? competition.payoutStructure
        : competition.payoutStructure.slice(0, 3)
    const remainingPayouts = competition.payoutStructure.length - 3

    const handleSignInClick = () => {
        onClose() // Close the join modal
        openSignInModal() // Open sign in modal via global state
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                        {competition.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Competition Details - 2x3 Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Entry Fee:</span>
                            <span className="text-white font-semibold">
                                {formatEntryFee(competition.entryFee)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Prize Pool:</span>
                            <span className="text-white font-semibold">
                                ${competition.prizePool.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Participants:</span>
                            <span className="text-white font-semibold">
                                {competition._count.participants}/{competition.maxParticipants}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Leverage:</span>
                            <span className="text-white font-semibold">
                                {competition.leverageSize}x
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Trading:</span>
                            <span className="text-white font-semibold">
                                {competition.symbol}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-background-tertiary rounded-lg">
                            <span className="text-slate-400 text-sm">Duration:</span>
                            <span className="text-white font-semibold">
                                {calculateDuration()}
                            </span>
                        </div>
                    </div>

                    {/* Competition Description */}
                    {competition.description && (
                        <div className="p-4 bg-background-tertiary rounded-lg">
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {competition.description}
                            </p>
                        </div>
                    )}

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
                            {visiblePayouts.map((payout) => {
                                const isTopThree = payout.position <= 3
                                return (
                                    <div
                                        key={payout.position}
                                        className={`flex justify-between items-center py-2 px-3 rounded-lg border transition-all ${isTopThree
                                            ? 'bg-primary/10 border-primary/30'
                                            : 'bg-background-tertiary border-slate-700/30'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm ${isTopThree ? 'text-primary' : 'text-slate-400'}`}>
                                                Position {payout.position}
                                            </span>
                                            {isTopThree && (
                                                <span className="text-base">
                                                    {getTrophyEmoji(payout.position)}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`font-semibold ${isTopThree ? 'text-primary' : 'text-white'}`}>
                                            ${parseFloat(payout.amount).toLocaleString()}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Action Button - Conditional based on authentication */}
                    {isAuthenticated ? (
                        <Link href={`/trade?competition=${competition.id}`}>
                            <Button className="w-full">
                                <Trophy className="w-4 h-4" />
                                Join Competition
                            </Button>
                        </Link>
                    ) : (
                        <Button className="w-full" onClick={handleSignInClick}>
                            <LogIn className="w-4 h-4" />
                            Sign In to Join
                        </Button>
                    )}

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