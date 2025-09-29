import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CandlestickData } from 'lightweight-charts'

interface HyperliquidCandle {
    T: number // timestamp
    o: string // open
    h: string // high
    l: string // low
    c: string // close
    v: string // volume
}

interface CandleSnapshotRequest {
    coin: string
    interval: string
    startTime?: number
    endTime?: number
}

export const useHyperliquid = () => {
    // Base API function for making requests to Hyperliquid
    const makeHyperliquidRequest = async (type: string, req: any) => {
        const response = await axios.post('https://api.hyperliquid.xyz/info', {
            type,
            req
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 second timeout
        })

        return response.data
    }

    // Fetch candlestick data
    const fetchCandleData = async (params: CandleSnapshotRequest): Promise<CandlestickData[]> => {
        const { coin, interval, startTime, endTime } = params

        const data: HyperliquidCandle[] = await makeHyperliquidRequest('candleSnapshot', {
            coin,
            interval,
            startTime: startTime || Date.now() - 24 * 60 * 60 * 1000, // Default to last 24 hours
            endTime: endTime || Date.now()
        })

        // Transform Hyperliquid data to TradingView format
        const candleData: CandlestickData[] = data.map(candle => ({
            time: Math.floor(candle.T / 1000) as any, // Convert to seconds
            open: parseFloat(candle.o),
            high: parseFloat(candle.h),
            low: parseFloat(candle.l),
            close: parseFloat(candle.c)
        }))

        return candleData.sort((a, b) => (a.time as number) - (b.time as number))
    }

    // Hook for fetching candle data with TanStack Query
    const useCandleData = (coin: string, interval: string, options?: {
        startTime?: number
        endTime?: number
        refetchInterval?: number
        enabled?: boolean
    }) => {
        return useQuery({
            queryKey: ['candleData', coin, interval, options?.startTime, options?.endTime],
            queryFn: () => fetchCandleData({
                coin,
                interval,
                startTime: options?.startTime,
                endTime: options?.endTime
            }),
            refetchInterval: options?.refetchInterval || 30000, // Default 30 seconds
            staleTime: 25000, // Consider data stale after 25 seconds
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            enabled: options?.enabled !== false,
        })
    }

    // Fetch market info
    const fetchMarketInfo = async (coin: string) => {
        return await makeHyperliquidRequest('meta', { coin })
    }

    // Hook for fetching market info
    const useMarketInfo = (coin: string) => {
        return useQuery({
            queryKey: ['marketInfo', coin],
            queryFn: () => fetchMarketInfo(coin),
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 2,
        })
    }

    // Fetch all mids (current prices)
    const fetchAllMids = async () => {
        return await makeHyperliquidRequest('allMids', {})
    }

    // Hook for fetching all current prices
    const useAllMids = () => {
        return useQuery({
            queryKey: ['allMids'],
            queryFn: fetchAllMids,
            refetchInterval: 5000, // Refetch every 5 seconds for real-time prices
            staleTime: 3000,
            retry: 2,
        })
    }

    return {
        // Raw API functions
        makeHyperliquidRequest,
        fetchCandleData,
        fetchMarketInfo,
        fetchAllMids,

        // Query hooks
        useCandleData,
        useMarketInfo,
        useAllMids,
    }
}