import Link from "next/link";
import Button from "@/components/Button";
import { Trophy, TrendingUp, Search, ChevronDown, User, BarChart3, Wallet, Settings, Shield, LogOut } from "lucide-react";
import SectionHeading from "../typography/SectionHeading";
import { usePathname } from "next/navigation";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import WalletConnectionModal from "../modals/SignInModal";
import { useState, useRef, useEffect } from "react";
import { formatAddress, generateUsername } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const AppNavbar = () => {
    const pathname = usePathname();
    const { isModalOpen, openModal, closeModal, address, disconnect } = useWalletConnection();
    const { isAuthenticated, isLoading } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        { icon: User, label: "My Profile", href: "/profile" },
        { icon: BarChart3, label: "Trading Stats", href: "/stats" },
        { icon: Wallet, label: "Wallet & Funds", href: "/wallet" },
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: Shield, label: "Security", href: "/security" },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 border-b border-slate-700/30 z-50 px-4 py-3 transition-all duration-300 ${isScrolled
                ? 'bg-background/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}>
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
                        {/* <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button> */}

                        {/* Wallet Connection */}
                        {isAuthenticated ? (
                            <div className="relative" ref={dropdownRef}>
                                {/* Balance Display */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium">
                                        <Wallet className="w-4 h-4" />
                                        <span>$12,450.00</span>
                                        <span className="text-primary/70">Available</span>
                                    </div>

                                    {/* User Dropdown Trigger */}
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all"
                                    >
                                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                {generateUsername(address || '').charAt(4)}
                                            </span>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-white text-sm font-medium">
                                                {generateUsername(address || '')}
                                            </div>
                                            <div className="text-slate-400 text-xs">Connected</div>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl z-50">
                                        {/* User Info Header */}
                                        <div className="p-4 border-b border-slate-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold">
                                                        {generateUsername(address || '').charAt(4)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-white font-medium">
                                                        {generateUsername(address || '')}
                                                    </div>
                                                    <div className="text-slate-400 text-sm">
                                                        {formatAddress(address || '')}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="p-2">
                                            {menuItems.map(({ icon: Icon, label, href }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    <span className="text-sm">{label}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Disconnect Button */}
                                        <div className="p-2 border-t border-slate-700/50">
                                            <button
                                                onClick={() => {
                                                    disconnect();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all w-full"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="text-sm">Disconnect Wallet</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Button size="sm" onClick={openModal}>
                                Sign In
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className="h-[76px]" />

            {/* Wallet Connection Modal */}
            <WalletConnectionModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    )
}

export default AppNavbar;