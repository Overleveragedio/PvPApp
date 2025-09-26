import AppNavbar from "@/components/ui/AppNavbar";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const noiseTexture = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PScwIDAgMjU2IDI1NicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSdub2lzZUZpbHRlcic+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuNjUnIG51bU9jdGF2ZXM9JzQnIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWx0ZXI9J3VybCgjbm9pc2VGaWx0ZXIpJyBvcGFjaXR5PScwLjAyJy8+PC9zdmc+";

    return (
        <>
            {/* Fixed Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>

                {/* Noise Texture Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("${noiseTexture}")`,
                        backgroundSize: '256px 256px',
                        backgroundRepeat: 'repeat',
                        opacity: 0.5
                    }}
                ></div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <AppNavbar />
                {children}
            </div>
        </>
    );
}