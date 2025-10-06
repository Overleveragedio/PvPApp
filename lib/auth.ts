
import axios from 'axios'
import { api } from './api'


export interface AuthResponse {
    access_token: string
    refresh_token: string
}

export interface SignUpRequest {
    email: string
    password: string
    confirmPassword: string
}

export interface SignInRequest {
    email: string
    password: string
}

export interface WalletNonceRequest {
    address: string
}

export interface WalletNonceResponse {
    address: string
    nonce: string
}

export interface WalletVerifyRequest {
    address: string
    signature: string
}

export interface WalletSignUpRequest {
    address: string
    signature: string
}

// Email Authentication
export const signUpWithEmail = async (data: SignUpRequest): Promise<AuthResponse> => {
    try {
        const response = await api.post(`/auth/signup`, data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Sign up failed')
        }
        throw new Error('Sign up failed')
    }
}

export const signInWithEmail = async (data: SignInRequest): Promise<AuthResponse> => {
    try {
        const response = await api.post(`/auth/signin`, data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Sign in failed')
        }
        throw new Error('Sign in failed')
    }
}

// Wallet Authentication
export const requestWalletNonce = async (data: WalletNonceRequest): Promise<WalletNonceResponse> => {
    try {
        const response = await api.post(`/auth/wallet/nonce`, data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Failed to request nonce')
        }
        throw new Error('Failed to request nonce')
    }
}

export const verifyWallet = async (data: WalletVerifyRequest): Promise<AuthResponse> => {
    try {
        const response = await api.post(`/auth/wallet/verify`, data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Wallet verification failed')
        }
        throw new Error('Wallet verification failed')
    }
}

export const signUpWithWallet = async (data: WalletSignUpRequest): Promise<AuthResponse> => {
    try {
        const response = await api.post(`/auth/wallet/signup`, data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Wallet sign up failed')
        }
        throw new Error('Wallet sign up failed')
    }
}

export const signOut = async () => {
    try {
        console.log(getTokens().refreshToken)
        const response = await api.post(`/auth/signout`, {
            refresh_token: getTokens().refreshToken,
        })
        return response.data
    } catch (error) {
        throw new Error('Sign out failed')
    }
}

// Token Management
export const setTokens = (accessToken: string, refreshToken: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
    }
}

export const getTokens = () => {
    if (typeof window !== 'undefined') {
        return {
            accessToken: localStorage.getItem('access_token'),
            refreshToken: localStorage.getItem('refresh_token'),
        }
    }
    return { accessToken: null, refreshToken: null }
}

export const clearTokens = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}