type User = {
    id: number
    email: string | null
    passwordHash: string | null
    walletAddress: string | null
    authProvider: AuthProviderType
}

enum AuthProviderType {
    EMAIL = "EMAIL",
    WALLET = "WALLET"
}