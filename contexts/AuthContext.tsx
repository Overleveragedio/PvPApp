'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { clearTokens, getTokens, signOut } from '@/lib/auth'
import { getUser } from '@/lib/user'
import SignInModal from '@/components/modals/SignInModal'
import { User } from '@/types/competitions'

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
    const { disconnect } = useDisconnect()
    const { address } = useAccount()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        checkAuth()
        console.log("Initial Address:", address)
    }, [address])

    const checkAuth = async () => {
        const tokens = getTokens()
        if (tokens.accessToken && tokens.refreshToken) {
            const user = await getUser()
            console.log("User:", user)
            if (user.authProvider === "WALLET" && user.walletAddress) {
                console.log("User:", user)
                console.log("Address:", address)
                if (user.walletAddress.toLowerCase() === address?.toLowerCase()) {
                    setIsAuthenticated(true)
                    setUser(user)
                } else {
                    await signOut()
                    clearTokens()
                    setIsAuthenticated(false)
                    disconnect()
                    console.log("Sign out")
                }
            } else {
                await signOut()
                clearTokens()
                setIsAuthenticated(false)
                setUser(null)
            }
            // setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
        setIsLoading(false)
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
        user
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