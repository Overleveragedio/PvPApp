import AppLayout from "@/layouts/AppLayout";

export default function CompetitionsLayout({
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