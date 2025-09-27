'use client'

import { useState } from 'react'
import { Connector, useConnect } from 'wagmi'
import { X, Wallet, ExternalLink } from 'lucide-react'

interface WalletConnectionModalProps {
    isOpen: boolean
    onClose: () => void
}

const WalletConnectionModal = ({ isOpen, onClose }: WalletConnectionModalProps) => {
    const { connectors, connect, isPending } = useConnect()
    const [connectingWallet, setConnectingWallet] = useState<string | null>(null)

    const handleConnect = async (connector: Connector) => {
        try {
            setConnectingWallet(connector.id)
            await connect({ connector })
            onClose()
        } catch (error) {
            console.error('Connection failed:', error)
        } finally {
            setConnectingWallet(null)
        }
    }

    const getWalletIcon = (walletId: string) => {
        switch (walletId) {
            case 'metaMask':
                return (
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">M</span>
                    </div>
                )
            case 'walletConnect':
                return (
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">WC</span>
                    </div>
                )
            case 'phantom':
                return (
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">P</span>
                    </div>
                )
            default:
                return (
                    <div className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-white" />
                    </div>
                )
        }
    }

    const getWalletName = (walletId: string) => {
        switch (walletId) {
            case 'metaMask':
                return 'MetaMask'
            case 'walletConnect':
                return 'WalletConnect'
            case 'injected':
                return 'Browser Wallet'
            default:
                return walletId
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Wallet Options */}
                <div className="space-y-3">
                    {/* Wagmi Connectors */}
                    {connectors.map((connector) => (
                        <button
                            key={connector.id}
                            onClick={() => handleConnect(connector)}
                            disabled={isPending || connectingWallet === connector.id}
                            className="w-full flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {getWalletIcon(connector.id)}
                            <div className="flex-1 text-left">
                                <div className="text-white font-medium">
                                    {getWalletName(connector.id)}
                                </div>
                                <div className="text-slate-400 text-sm">
                                    {connector.id === 'metaMask' && 'Connect using MetaMask wallet'}
                                    {connector.id === 'walletConnect' && 'Scan with WalletConnect to connect'}
                                    {connector.id === 'injected' && 'Connect using browser wallet'}
                                </div>
                            </div>
                            {connectingWallet === connector.id ? (
                                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                            )}
                        </button>
                    ))}

                    {/* Phantom Wallet */}
                    {/* <button
                        onClick={connectPhantom}
                        disabled={connectingWallet === 'phantom'}
                        className="w-full flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {getWalletIcon('phantom')}
                        <div className="flex-1 text-left">
                            <div className="text-white font-medium">Phantom</div>
                            <div className="text-slate-400 text-sm">
                                Connect using Phantom wallet
                            </div>
                        </div>
                        {connectingWallet === 'phantom' ? (
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                        )}
                    </button> */}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm text-center">
                        By connecting a wallet, you agree to our{' '}
                        <a href="#" className="text-primary hover:underline">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WalletConnectionModal