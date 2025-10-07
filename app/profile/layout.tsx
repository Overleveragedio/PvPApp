"use client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { config } from "@/config";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient()

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <SidebarProvider>
                        <div className="flex min-h-[calc(100vh-76px)] w-full overflow-hidden">
                            <ProfileSidebar />
                            <main className="flex-1 flex flex-col overflow-hidden w-full">
                                <ProfileHeader />
                                <div className="flex-1 overflow-auto px-8">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </SidebarProvider>
                </AuthProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}