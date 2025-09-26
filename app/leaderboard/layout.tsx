import AppLayout from "@/layouts/AppLayout";

export default function LeaderboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}