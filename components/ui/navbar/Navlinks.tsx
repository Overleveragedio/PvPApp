"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

export interface NavLink {
    href: string;
    icon: LucideIcon;
    label: string;
}

interface NavLinksProps {
    links: NavLink[];
    className?: string;
}

const NavLinks = ({ links, className = "" }: NavLinksProps) => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname.includes(path);

    const getLinkClassName = (path: string) =>
        `flex items-center gap-2 px-3 py-2 rounded-xl transition-all relative ${isActive(path)
            ? 'text-primary bg-primary/20 nav-link-glow after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-18 after:h-0.5 after:bg-primary after:rounded-full'
            : 'text-slate-300 hover:text-white hover:bg-primary/20'
        }`;

    return (
        <div className={`hidden md:flex items-center gap-6 ${className}`}>
            {links.map(({ href, icon: Icon, label }) => (
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
    );
};

export default NavLinks;