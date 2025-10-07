import Link from "next/link";
import SectionHeading from "@/components/typography/SectionHeading";

interface LogoProps {
    href?: string;
}

const Logo = ({ href = "/" }: LogoProps) => {
    const content = (
        <div className="flex items-center gap-3">
            <div>
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
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
};

export default Logo;