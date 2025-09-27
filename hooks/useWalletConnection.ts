'use client'

import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

export const useWalletConnection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleDisconnect = () => {
        disconnect()
        // Also disconnect Phantom if connected
        if (typeof window !== 'undefined' && 'solana' in window) {
            const phantom = (window as any).solana
            if (phantom?.isPhantom && phantom.isConnected) {
                phantom.disconnect()
            }
        }
    }

    return {
        isModalOpen,
        openModal,
        closeModal,
        isConnected,
        address,
        disconnect: handleDisconnect
    }
}