"use client";
import { connectToDiscord } from "@/lib/notifications"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const DiscordRedirect = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const handleConnect = async () => {
        const code = searchParams.get('code')
        if (code) {
            const data = await connectToDiscord(code)
            console.log(data)
        }
    }

    useEffect(() => {
        handleConnect()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Connecting to Discord...</h1>
            <p className="text-sm text-muted-foreground">This may take a few seconds...</p>
            <div className="w-12 h-12 mt-5 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default DiscordRedirect;