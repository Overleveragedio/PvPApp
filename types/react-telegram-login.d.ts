declare module 'react-telegram-login' {
    import { FC } from 'react';

    interface TelegramUser {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        photo_url?: string;
        auth_date: number;
        hash: string;
    }

    interface TelegramLoginButtonProps {
        botName: string;
        dataOnauth: (user: TelegramUser) => void;
        requestAccess?: 'read' | 'write';
        dataAuthUrl?: string;
        usePic?: boolean;
        dataCornerRadius?: number;
        dataWidth?: number;
        dataHeight?: number;
    }

    const TelegramLoginButton: FC<TelegramLoginButtonProps>;
    export default TelegramLoginButton;
}