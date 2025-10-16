'use client'

import { useState, ReactNode, useEffect } from 'react'
import { Connector, useConnect, useAccount } from 'wagmi'
import { Wallet, ArrowRight, Mail } from 'lucide-react'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import EmailSignInModal from './EmailSignInModal'
import { requestWalletNonce, verifyWallet, signUpWithWallet, setTokens } from '@/lib/auth'
import { signWalletMessage, formatWalletMessage } from '@/lib/wallet'
import { useAuth } from '@/contexts/AuthContext'

interface WalletConnectionModalProps {
    isOpen: boolean
    onClose: () => void
}

interface ConnectionButtonProps {
    icon: ReactNode
    title: string
    description: string
    onClick: () => void
    disabled?: boolean
    isLoading?: boolean
}

const WALLET_CONFIG: Record<string, { icon: string; description: string }> = {
    metaMaskSDK: { icon: '/logos/metamask-icon.svg', description: 'Connect using MetaMask wallet' },
    'io.metamask': { icon: '/logos/metamask-icon.svg', description: 'Connect using MetaMask wallet' },
    metaMask: { icon: '/logos/metamask-icon.svg', description: 'Connect using MetaMask wallet' },
    walletConnect: { icon: '/logos/wallet-connect.svg', description: 'Scan with WalletConnect to connect' },
    phantom: { icon: '/logos/phantom-icon.svg', description: 'Connect using Phantom wallet' },
    'app.phantom': { icon: '/logos/phantom-icon.svg', description: 'Connect using Phantom wallet' },
}

const EXCLUDED_WALLETS = ['com.brave.wallet', 'io.metamask.mmi']

const ConnectionButton = ({ icon, title, description, onClick, disabled, isLoading }: ConnectionButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full cursor-pointer flex items-center gap-4 p-4 bg-secondary/50 hover:bg-secondary border border-border rounded-xl transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {icon}
        <div className="flex-1 text-left">
            <div className="text-foreground font-medium">{title}</div>
            <div className="text-muted-foreground text-sm">{description}</div>
        </div>
        {isLoading ? (
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        ) : (
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
    </button>
)

const SignInModal = ({ isOpen, onClose }: WalletConnectionModalProps) => {
    const { connectors, isPending, connectAsync } = useConnect()
    const { address, isConnected } = useAccount()
    const [connectingWallet, setConnectingWallet] = useState<string | null>(null)
    const [showEmailSignIn, setShowEmailSignIn] = useState(false)
    const { login } = useAuth()

    const filteredConnectors = connectors.filter(
        (connector) => !EXCLUDED_WALLETS.includes(connector.id)
    )

    const handleWalletClick = async (connector: Connector) => {
        try {
            setConnectingWallet(connector.id)

            // If wallet is already connected, authenticate directly
            if (isConnected && address) {
                await handleWalletAuth(address)
            } else {
                await connectAsync({ connector }).then((res) => {
                    handleWalletAuth(res.accounts[0])
                })
            }
        } catch (error) {
            console.error('Wallet operation failed:', error)
            setConnectingWallet(null)
        }
    }

    const handleWalletAuth = async (walletAddress: `0x${string}`) => {
        try {
            console.log('Starting wallet authentication for:', walletAddress)

            // Request nonce from backend
            const nonceResponse = await requestWalletNonce({ address: walletAddress })
            console.log('Received nonce:', nonceResponse.nonce)

            // Sign the nonce message
            const message = formatWalletMessage(nonceResponse.nonce)
            const signature = await signWalletMessage(message, walletAddress)

            try {
                const response = await verifyWallet({
                    address: walletAddress,
                    signature,
                })
                setTokens(response.refresh_token)
                login()
                onClose()
            } catch (verifyError) {
                console.log('Verification failed, attempting sign up...')
            }
        } catch (error) {
            console.error('Wallet authentication failed:', error)
            // Reset connecting state on error
            setConnectingWallet(null)
        }
    }

    const getWalletIcon = (walletId: string) => {
        const config = WALLET_CONFIG[walletId]

        if (config?.icon) {
            return (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <Image
                        src={config.icon}
                        alt={walletId}
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                </div>
            )
        }

        return (
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-foreground" />
            </div>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-foreground">Sign In</DialogTitle>
                </DialogHeader>

                {/* Wallet Options */}
                <div className="space-y-3 mt-5">
                    {filteredConnectors.map((connector) => (
                        <ConnectionButton
                            key={connector.id}
                            icon={getWalletIcon(connector.id)}
                            title={connector.name}
                            description={WALLET_CONFIG[connector.id]?.description || 'Connect wallet'}
                            onClick={() => handleWalletClick(connector)}
                            disabled={isPending || connectingWallet === connector.id}
                            isLoading={connectingWallet === connector.id}
                        />
                    ))}
                </div>

                {/* Divider */}
                <div className="relative my-0">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-card text-muted-foreground">or</span>
                    </div>
                </div>

                {/* Email Sign In Button */}
                <ConnectionButton
                    icon={
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                            <Mail className="w-4 h-4 text-white" />
                        </div>
                    }
                    title="Sign in with Email"
                    description="Use your email and password"
                    onClick={() => {
                        onClose()
                        setShowEmailSignIn(true)
                    }}
                />

                <DialogFooter className="sm:justify-center">
                    <p className="text-muted-foreground text-sm text-center">
                        By continuing, you agree to our{' '}
                        <a href="#" className="text-primary hover:underline">
                            Terms of Service
                        </a>
                    </p>
                </DialogFooter>
            </DialogContent>

            {/* Email Sign In Modal */}
            <EmailSignInModal
                isOpen={showEmailSignIn}
                onClose={() => setShowEmailSignIn(false)}
            />
        </Dialog>
    )
}

export default SignInModal;