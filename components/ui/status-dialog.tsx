'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, LucideIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import Button from '@/components/Button'

type StatusVariant = 'success' | 'error' | 'warning'

interface StatusConfig {
    icon: LucideIcon
    iconBgColor: string
    iconColor: string
    buttonColor: string
    defaultButtonText: string
}

const STATUS_CONFIG: Record<StatusVariant, StatusConfig> = {
    success: {
        icon: CheckCircle2,
        iconBgColor: 'bg-green-500/20',
        iconColor: 'text-green-500',
        buttonColor: 'bg-green-500 hover:bg-green-600',
        defaultButtonText: 'Continue',
    },
    error: {
        icon: XCircle,
        iconBgColor: 'bg-red-500/20',
        iconColor: 'text-red-500',
        buttonColor: 'bg-red-500 hover:bg-red-600',
        defaultButtonText: 'Try Again',
    },
    warning: {
        icon: AlertTriangle,
        iconBgColor: 'bg-amber-500/20',
        iconColor: 'text-amber-500',
        buttonColor: 'bg-amber-500 hover:bg-amber-600',
        defaultButtonText: 'Understood',
    },
}

interface BaseStatusDialogProps {
    variant: StatusVariant
    isOpen: boolean
    onClose: () => void
    message: string
    submessage?: string
    buttonText?: string
    onConfirm?: () => void
    autoCloseDelay?: number | null // milliseconds, null to disable
}

function BaseStatusDialog({
    variant,
    isOpen,
    onClose,
    message,
    submessage,
    buttonText,
    onConfirm,
    autoCloseDelay = 3000, // default 5 seconds
}: BaseStatusDialogProps) {
    const config = STATUS_CONFIG[variant]
    const Icon = config.icon
    const displayButtonText = buttonText || config.defaultButtonText
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null)

    // Auto-close timer with countdown
    useEffect(() => {
        if (!isOpen || autoCloseDelay === null || autoCloseDelay === 0) {
            setRemainingSeconds(null)
            return
        }

        // Initialize countdown
        const totalSeconds = Math.ceil(autoCloseDelay / 1000)
        setRemainingSeconds(totalSeconds)

        // Update countdown every second
        const countdownInterval = setInterval(() => {
            setRemainingSeconds(prev => {
                if (prev === null || prev <= 1) return null
                return prev - 1
            })
        }, 1000)

        // Auto-close timer
        const closeTimer = setTimeout(() => {
            onClose()
        }, autoCloseDelay)

        return () => {
            clearInterval(countdownInterval)
            clearTimeout(closeTimer)
            setRemainingSeconds(null)
        }
    }, [isOpen, autoCloseDelay, onClose])

    const handleConfirm = () => {
        onConfirm?.()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-full ${config.iconBgColor} flex items-center justify-center`}>
                        <Icon className={`w-10 h-10 ${config.iconColor}`} strokeWidth={2} />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                            {message}
                        </h3>

                        {submessage && (
                            <p className="text-sm text-slate-400 max-w-sm">
                                {submessage}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full mt-2">
                        {onConfirm && (
                            <Button
                                onClick={onClose}
                                className="flex-1 bg-slate-700 hover:bg-slate-600"
                            >
                                Cancel
                            </Button>
                        )}
                        {/* <Button
                            onClick={handleConfirm}
                            className={`${onConfirm ? 'flex-1' : 'w-full'} ${config.buttonColor}`}
                        >
                            {displayButtonText}
                        </Button> */}
                    </div>

                    {/* Subtle countdown indicator */}
                    {remainingSeconds !== null && remainingSeconds > 0 && (
                        <p className="text-xs text-slate-500 mt-2">
                            Auto-closing in {remainingSeconds}s
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Thin wrapper components for convenience
interface StatusDialogProps {
    isOpen: boolean
    onClose: () => void
    message: string
    submessage?: string
    buttonText?: string
    autoCloseDelay?: number | null // milliseconds, null to disable auto-close
}

export function SuccessDialog(props: StatusDialogProps) {
    return <BaseStatusDialog {...props} variant="success" />
}

export function ErrorDialog(props: StatusDialogProps) {
    return <BaseStatusDialog {...props} variant="error" />
}

export function WarningDialog(props: StatusDialogProps & { onConfirm?: () => void }) {
    return <BaseStatusDialog {...props} variant="warning" />
}