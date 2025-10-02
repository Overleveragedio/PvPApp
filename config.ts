import { http, createConfig } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = 'f073455d8cdbd0fcceca50ac56c9c5fb'

export const config = createConfig({
    chains: [mainnet, base],
    connectors: [
        // injected(),
        walletConnect({ projectId }),
        metaMask()
    ],
    transports: {
        [mainnet.id]: http(),
        [base.id]: http(),
    }
})