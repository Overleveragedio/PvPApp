import { Zap } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-background-secondary border-t border-slate-700/30 py-8 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo and Tagline */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-primary font-bold text-lg">OverLeveraged</h3>
                            <p className="text-slate-400 text-sm">Trade • Compete • Dominate</p>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-slate-400 text-sm text-center md:text-right">
                        © 2024 OverLeveraged. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;