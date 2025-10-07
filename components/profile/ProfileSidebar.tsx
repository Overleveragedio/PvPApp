"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, BarChart3, Wallet, Settings, Shield, Trophy, History } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "../ui/navbar/Logo";

const ProfileSidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { icon: User, label: "My Profile", href: "/profile" },
        { icon: BarChart3, label: "Trading Stats", href: "/profile/stats" },
        { icon: History, label: "Trade History", href: "/profile/history" },
        { icon: Trophy, label: "My Competitions", href: "/profile/competitions" },
        { icon: Wallet, label: "Wallet & Funds", href: "/profile/wallet" },
        { icon: Settings, label: "Settings", href: "/profile/settings" },
        { icon: Shield, label: "Security", href: "/profile/security" },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <Sidebar className="w-64">
            <SidebarHeader>
                <Logo href="/competitions" />
            </SidebarHeader>

            <SidebarContent className="mt-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map(({ icon: Icon, label, href }) => (
                                <SidebarMenuItem key={href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(href)}
                                    >
                                        <Link href={href}>
                                            <Icon className="w-4 h-4" />
                                            <span>{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default ProfileSidebar;