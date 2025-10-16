import { api } from './api'

export interface AuthResponse {
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

export const signUpWithEmail = async (data: SignUpRequest): Promise<AuthResponse> => {
    const response = await api.post(`/auth/signup`, data)
    return response.data
}

export const signInWithEmail = async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await api.post(`/auth/signin`, data)
    return response.data
}

export const requestWalletNonce = async (data: WalletNonceRequest): Promise<WalletNonceResponse> => {
    const response = await api.post(`/auth/wallet/nonce`, data)
    return response.data
}

export const verifyWallet = async (data: WalletVerifyRequest): Promise<AuthResponse> => {
    const response = await api.post(`/auth/wallet/verify`, data)
    return response.data
}

export const signUpWithWallet = async (data: WalletSignUpRequest): Promise<AuthResponse> => {
    const response = await api.post(`/auth/wallet/signup`, data)
    return response.data
}

export const signOut = async () => {
    const { refreshToken } = getTokens()
    const response = await api.post(`/auth/signout`, { refresh_token: refreshToken })
    return response.data
}

export const refreshAccessToken = async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post(`/auth/refresh`, { refresh_token: refreshToken })
    return response.data
}

export const setTokens = (refreshToken: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', refreshToken)
    }
}

export const getTokens = () => {
    if (typeof window !== 'undefined') {
        return {
            refreshToken: localStorage.getItem('refresh_token'),
        }
    }
    return { refreshToken: null }
}

export const clearTokens = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}