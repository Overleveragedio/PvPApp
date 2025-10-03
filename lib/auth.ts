const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

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
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Sign up failed')
    }

    return response.json()
}

export const signInWithEmail = async (data: SignInRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Sign in failed')
    }

    return response.json()
}

// Wallet Authentication
export const requestWalletNonce = async (data: WalletNonceRequest): Promise<WalletNonceResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/wallet/nonce`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to request nonce')
    }

    return response.json()
}

export const verifyWallet = async (data: WalletVerifyRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/wallet/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Wallet verification failed')
    }

    return response.json()
}

export const signUpWithWallet = async (data: WalletSignUpRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/wallet/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Wallet sign up failed')
    }

    return response.json()
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

export const isAuthenticated = (): boolean => {
    const { accessToken } = getTokens()
    return !!accessToken
}
