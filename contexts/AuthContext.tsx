'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { getTokens, clearTokens, isAuthenticated as checkAuthStatus } from '@/lib/auth'

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    login: () => void
    logout: () => void
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
    const { address } = useAccount()

    useEffect(() => {
        // Check authentication status on mount
        const checkAuth = () => {
            const authStatus = checkAuthStatus()
            setIsAuthenticated(authStatus)
            setIsLoading(false)
        }

        checkAuth()
    }, [])

    useEffect(() => {
        // Update auth status when wallet address changes
        if (address) {
            const authStatus = checkAuthStatus()
            setIsAuthenticated(authStatus)
        } else {
            // If wallet disconnects, check if we still have tokens
            const authStatus = checkAuthStatus()
            setIsAuthenticated(authStatus)
        }
    }, [address])

    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        clearTokens()
        setIsAuthenticated(false)
    }

    const value = {
        isAuthenticated,
        isLoading,
        login,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
