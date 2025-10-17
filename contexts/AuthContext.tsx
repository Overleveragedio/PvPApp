'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { clearTokens, getTokens, refreshAccessToken, setTokens, signOut } from '@/lib/auth'
import { getUser } from '@/lib/user'
import SignInModal from '@/components/modals/SignInModal'
import { User } from '@/types/competitions'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    login: () => void
    logout: () => void
    openSignInModal: () => void
    closeSignInModal: () => void
    user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showSignInModal, setShowSignInModal] = useState(false)
    const { disconnect, isSuccess: isDisconnected } = useDisconnect()
    const { address } = useAccount()

    useEffect(() => {
        if (isDisconnected) {
            handleSignOut()
        }
    }, [isDisconnected])

    const { mutate: renewRefreshToken, isPending: isRenewingRefreshToken } = useMutation({
        mutationKey: ['refreshAccessToken'],
        mutationFn: () => refreshAccessToken(getTokens()?.refreshToken || ''),
        onSuccess: (data) => {
            setTokens(data.refresh_token)
            getUserMutation()
        },
        onError: async (error) => {
            if (isAxiosError(error) && error.response?.status === 401) {
                console.log('Refresh token expired')
                handleSignOut()
            }
        },
    })

    const { data: user, isPending: isLoadingUser, mutate: getUserMutation } = useMutation({
        mutationFn: getUser,
        onSuccess: (data) => {
            checkAuth(data)
        },
        onError: async (error) => {
            if (isAxiosError(error) && error.response?.status === 401) {
                const { refreshToken } = getTokens()
                if (refreshToken !== undefined) {
                    renewRefreshToken()
                } else {
                    clearTokens()
                    setIsAuthenticated(false)
                }
            }
        },
    })

    useEffect(() => {
        getUserMutation()
    }, [address])

    const checkAuth = async (user: User) => {
        if (user && user.authProvider === "WALLET" && user.walletAddress) {
            if (user.walletAddress.toLowerCase() === address?.toLowerCase()) {
                setIsAuthenticated(true)
            } else {
                await handleSignOut()
                disconnect()
            }
        } else {
            await handleSignOut()
        }
        setIsLoading(false)
    }

    const handleSignOut = async () => {
        await signOut()
        disconnect()
        clearTokens()
        setIsAuthenticated(false)
    }

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        clearTokens()
        setIsAuthenticated(false)
    }

    const openSignInModal = () => {
        setShowSignInModal(true)
    }

    const closeSignInModal = () => {
        setShowSignInModal(false)
    }

    const value = {
        isAuthenticated,
        isLoading,
        login,
        logout,
        openSignInModal,
        closeSignInModal,
        user: user || null
    }

    if (isLoadingUser || isRenewingRefreshToken) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
            <SignInModal
                isOpen={showSignInModal}
                onClose={closeSignInModal}
            />
        </AuthContext.Provider>
    )
}