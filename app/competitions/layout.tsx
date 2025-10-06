import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/layouts/AppLayout";

export default function CompetitionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AppLayout>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AppLayout>
    );
}