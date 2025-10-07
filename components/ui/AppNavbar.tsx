"use client";
import { useEffect, useState } from "react";
import { Trophy, TrendingUp, User, BarChart3, Wallet, Settings, Shield } from "lucide-react";
import Button from "@/components/Button";
import WalletConnectionModal from "../modals/SignInModal";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./navbar/Logo";
import NavLinks, { NavLink } from "./navbar/Navlinks";
import BalanceDisplay from "./navbar/BalanceDisplay";
import UserDropdown, { DropdownMenuItem } from "./navbar/UserDropdown";

const AppNavbar = () => {
    const { isModalOpen, openModal, closeModal, address, disconnect } = useWalletConnection();
    const { isAuthenticated } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks: NavLink[] = [
        { href: "/competitions", icon: Trophy, label: "Competitions" },
        { href: "/leaderboard", icon: TrendingUp, label: "Leaderboard" },
        { href: "/profile", icon: User, label: "Profile" },
    ];

    const menuItems: DropdownMenuItem[] = [
        { icon: User, label: "My Profile", href: "/profile" },
        { icon: BarChart3, label: "Trading Stats", href: "/stats" },
        { icon: Wallet, label: "Wallet & Funds", href: "/wallet" },
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: Shield, label: "Security", href: "/security" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 border-b border-slate-700/30 z-50 px-4 py-3 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}>
                <div className="container mx-auto flex items-center justify-between max-w-7xl">
                    <Logo href="/" />

                    <NavLinks links={navLinks} />

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <BalanceDisplay balance={12450.00} />
                                <UserDropdown
                                    address={address || ''}
                                    menuItems={menuItems}
                                    onDisconnect={disconnect}
                                />
                            </>
                        ) : (
                            <Button size="sm" onClick={openModal}>
                                Sign In
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            <div className="h-[76px]" />

            <WalletConnectionModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default AppNavbar;