export type User = {
    id: number
    email: string | null
    passwordHash: string | null
    walletAddress: string | null
    authProvider: AuthProviderType
}

export enum AuthProviderType {
    EMAIL = "EMAIL",
    WALLET = "WALLET"
}