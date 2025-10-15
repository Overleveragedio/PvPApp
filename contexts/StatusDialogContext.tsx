'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SuccessDialog, ErrorDialog, WarningDialog } from '@/components/ui/status-dialog'

interface DialogConfig {
    message: string
    submessage?: string
    buttonText?: string
}

interface WarningDialogConfig extends DialogConfig {
    onConfirm?: () => void
}

interface StatusDialogContextType {
    showSuccess: (config: DialogConfig) => void
    showError: (config: DialogConfig) => void
    showWarning: (config: WarningDialogConfig) => void
}

const StatusDialogContext = createContext<StatusDialogContextType | undefined>(undefined)

export const useStatusDialog = () => {
    const context = useContext(StatusDialogContext)
    if (context === undefined) {
        throw new Error('useStatusDialog must be used within a StatusDialogProvider')
    }
    return context
}

interface StatusDialogProviderProps {
    children: ReactNode
}

export const StatusDialogProvider = ({ children }: StatusDialogProviderProps) => {
    const [successConfig, setSuccessConfig] = useState<DialogConfig | null>(null)
    const [errorConfig, setErrorConfig] = useState<DialogConfig | null>(null)
    const [warningConfig, setWarningConfig] = useState<WarningDialogConfig | null>(null)

    const showSuccess = (config: DialogConfig) => {
        setSuccessConfig(config)
    }

    const showError = (config: DialogConfig) => {
        setErrorConfig(config)
    }

    const showWarning = (config: WarningDialogConfig) => {
        setWarningConfig(config)
    }

    const closeSuccess = () => {
        setSuccessConfig(null)
    }

    const closeError = () => {
        setErrorConfig(null)
    }

    const closeWarning = () => {
        setWarningConfig(null)
    }

    const value = {
        showSuccess,
        showError,
        showWarning,
    }

    return (
        <StatusDialogContext.Provider value={value}>
            {children}

            <SuccessDialog
                isOpen={!!successConfig}
                onClose={closeSuccess}
                message={successConfig?.message || ''}
                submessage={successConfig?.submessage}
                buttonText={successConfig?.buttonText}
            />

            <ErrorDialog
                isOpen={!!errorConfig}
                onClose={closeError}
                message={errorConfig?.message || ''}
                submessage={errorConfig?.submessage}
                buttonText={errorConfig?.buttonText}
            />

            <WarningDialog
                isOpen={!!warningConfig}
                onClose={closeWarning}
                message={warningConfig?.message || ''}
                submessage={warningConfig?.submessage}
                buttonText={warningConfig?.buttonText}
                onConfirm={warningConfig?.onConfirm}
            />
        </StatusDialogContext.Provider>
    )
}