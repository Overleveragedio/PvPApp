import TradeLayout from "@/layouts/TradeLayout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <TradeLayout>
            {children}
        </TradeLayout>
    );
}
// <AppLayout>
// </AppLayout>