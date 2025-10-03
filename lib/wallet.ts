import { config } from '@/config'
import { signMessage } from 'wagmi/actions'

export const signWalletMessage = async (message: string, address: `0x${string}`) => {
    try {
        const signature = await signMessage(config, {
            message,
            account: address,
        })
        return signature
    } catch (error) {
        console.error('Failed to sign message:', error)
        throw new Error('Failed to sign message')
    }
}

export const formatWalletMessage = (nonce: string) => {
    return `Login nonce: ${nonce}`
}
