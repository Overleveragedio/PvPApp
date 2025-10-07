"use client";
import { BarChart3, Settings, Shield, TrendingUp, Trophy, User, Wallet } from "lucide-react";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import NavLinks, { NavLink } from "../ui/navbar/Navlinks";
import BalanceDisplay from "../ui/navbar/BalanceDisplay";
import UserDropdown, { DropdownMenuItem } from "../ui/navbar/UserDropdown";
import Button from "../Button";
import { useAuth } from "@/contexts/AuthContext";

const ProfileHeader = () => {
    const { isModalOpen, openModal, closeModal, address, disconnect } = useWalletConnection();
    const { isAuthenticated } = useAuth();

    const menuItems: DropdownMenuItem[] = [
        { icon: User, label: "My Profile", href: "/profile" },
        { icon: BarChart3, label: "Trading Stats", href: "/stats" },
        { icon: Wallet, label: "Wallet & Funds", href: "/wallet" },
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: Shield, label: "Security", href: "/security" },
    ];

    const navLinks: NavLink[] = [
        { href: "/competitions", icon: Trophy, label: "Competitions" },
        { href: "/leaderboard", icon: TrendingUp, label: "Leaderboard" },
        { href: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-md px-8 py-4 mb-4">
            <div className="flex items-center justify-between">
                <div></div>

                <NavLinks links={navLinks} />

                {/* Actions */}
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
        </header>
    );
};

export default ProfileHeader;