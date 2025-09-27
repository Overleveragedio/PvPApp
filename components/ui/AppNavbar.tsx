import Link from "next/link";
import Button from "@/components/Button";
import { Trophy, TrendingUp, Search } from "lucide-react";
import SectionHeading from "../typography/SectionHeading";
import { usePathname } from "next/navigation";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import WalletConnectionModal from "../modals/WalletConnectionModal";

const AppNavbar = () => {
    const pathname = usePathname();
    const { isModalOpen, openModal, closeModal, isConnected, address, disconnect } = useWalletConnection();

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { href: "/competitions", icon: Trophy, label: "Competitions" },
        { href: "/leaderboard", icon: TrendingUp, label: "Leaderboard" },
    ];

    const getLinkClassName = (path: string) =>
        `flex items-center gap-2 px-3 py-2 rounded-xl transition-all relative ${isActive(path)
            ? 'text-primary bg-primary/20 nav-link-glow after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-18 after:h-0.5 after:bg-primary after:rounded-full'
            : 'text-slate-300 hover:text-white hover:bg-primary/20'
        }`;

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <>
            <nav className="bg-background border-b border-slate-700/30 px-4 py-3">
                <div className="container mx-auto flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="zapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="hsl(188 100% 50%)" />
                                        <stop offset="100%" stopColor="hsl(207 90% 54%)" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                                    fill=""
                                    stroke="url(#zapGradient)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div>
                            <SectionHeading size="xl">Overleveraged</SectionHeading>
                            <p className="text-slate-200 text-xs">Trade • Compete • Dominate</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map(({ href, icon: Icon, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={getLinkClassName(href)}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Icon */}
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Wallet Connection */}
                        {isConnected ? (
                            <div className="flex items-center gap-2">
                                <div className="px-3 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium">
                                    {formatAddress(address || '')}
                                </div>
                                <Button size="sm" variant="secondary" onClick={disconnect}>
                                    Disconnect
                                </Button>
                            </div>
                        ) : (
                            <Button size="sm" onClick={openModal}>
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Wallet Connection Modal */}
            <WalletConnectionModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    )
}

export default AppNavbar;