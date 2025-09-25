import { Zap, Trophy, TrendingUp, User, Wallet, Search } from "lucide-react";
import Button from "@/components/Button";

const Navbar = () => {
    return (
        <nav className="bg-background border-b border-slate-700/30 px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-primary font-bold text-lg">OverLeveraged</h1>
                        <p className="text-slate-400 text-xs">Trade • Compete • Dominate</p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <a href="/competitions" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                        <Trophy className="w-4 h-4" />
                        <span className="text-sm font-medium">Competitions</span>
                    </a>
                    <a href="/leaderboard" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Leaderboard</span>
                    </a>
                    <a href="/profile" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Profile</span>
                    </a>
                    <a href="/wallet" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                        <Wallet className="w-4 h-4" />
                        <span className="text-sm font-medium">Wallet</span>
                    </a>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                    {/* Search Icon */}
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Connect Wallet Button */}
                    <Button size="sm">
                        Connect Wallet
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;