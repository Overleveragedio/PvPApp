"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, LucideIcon } from "lucide-react";
import { formatAddress, generateUsername } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/contexts/AuthContext";
export interface DropdownMenuItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

interface UserDropdownProps {
    address: string;
    menuItems: DropdownMenuItem[];
    onDisconnect: () => void;
}

const UserDropdown = ({ address, menuItems, onDisconnect }: UserDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all"
            >
                <UserAvatar address={address} size="sm" />
                <div className="text-left">
                    <div className="text-white text-sm font-medium">
                        {user?.username}
                    </div>
                    <div className="text-slate-400 text-xs">Connected</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl z-50">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <UserAvatar address={address} size="md" />
                            <div>
                                <div className="text-white font-medium">
                                    {user?.username}
                                </div>
                                <div className="text-slate-400 text-sm">
                                    {formatAddress(address)}
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
                                onClick={() => setIsOpen(false)}
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
                                onDisconnect();
                                setIsOpen(false);
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
    );
};

export default UserDropdown;