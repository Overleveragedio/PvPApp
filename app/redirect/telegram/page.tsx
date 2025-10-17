"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TelegramLoginButton from "react-telegram-login";

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

export default function TelegramRedirect() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleTelegramAuth = async (user: TelegramUser) => {
        setIsLoading(true);
        console.log('Telegram authentication successful:', user);

        try {
            // Send user data to your backend
            const userData = {
                telegramId: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
                photoUrl: user.photo_url,
                authDate: user.auth_date,
                hash: user.hash,
            };

            // TODO: Call your API to link this Telegram account
            // const response = await fetch('/api/auth/telegram', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(userData),
            // });
            // if (response.ok) {
            //     router.push('/profile/settings');
            // }

            console.log('User data:', userData);

            // For now, just show success and redirect
            router.push('/profile/settings');
        } catch (error) {
            console.error('Telegram auth error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Connect Telegram</h1>
                <p className="text-muted-foreground mt-2">Click the button below to connect your Telegram account</p>
            </div>

            <TelegramLoginButton
                dataOnauth={handleTelegramAuth}
                botName="olev127bot"
                requestAccess="write"
            />

            {isLoading && (
                <p className="text-sm text-muted-foreground">Processing...</p>
            )}
        </div>
    );
}