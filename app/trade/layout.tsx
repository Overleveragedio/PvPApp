import TradeLayout from "@/layouts/TradeLayout";
import { Suspense } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Suspense>
                <TradeLayout>
                    {children}
                </TradeLayout>
            </Suspense>
        </>
    );
}