import { Trophy, Users, TrendingUp, DollarSign } from "lucide-react";
import HomeCard from "@/components/home/Card";

const statsData = [
    {
        icon: Trophy,
        value: "1,500+",
        label: "Competitions Completed"
    },
    {
        icon: Users,
        value: "10,000+",
        label: "Smart Traders"
    },
    {
        icon: TrendingUp,
        value: "50+",
        label: "Trading Pairs"
    },
    {
        icon: DollarSign,
        value: "$1,000,000+",
        label: "Prize Pool Paid"
    }
];

const StatsSection = () => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <HomeCard key={index}>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                                    <div className="text-slate-400 text-sm">{stat.label}</div>
                                </div>
                            </HomeCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;