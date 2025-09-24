import { TrendingUp, Zap, Users, Trophy } from "lucide-react";
import SectionHeading from "@/components/typography/SectionHeading";
import HomeCard from "@/components/home/Card";

const featuresData = [
    {
        icon: TrendingUp,
        title: "Real-Time Trading",
        description: "Live order books and price feeds simulate an exchange-grade environment."
    },
    {
        icon: Zap,
        title: "Up to 50x Leverage",
        description: "Amplify your strategies with leverage options from 1x to 50x."
    },
    {
        icon: Users,
        title: "Tailored Experience",
        description: "Customize your buy-in, pairs, duration, and more—your rules, your way."
    },
    {
        icon: Trophy,
        title: "Endless Opportunities",
        description: "New competitions kick off every hour—never miss a chance to prove yourself."
    }
];

const Features = () => {
    return (
        <section className="py-16 px-4 bg-background">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <SectionHeading size="5xl" className="mb-4">
                        Platform Features
                    </SectionHeading>
                    <p className="text-slate-400 text-lg">
                        Everything you need for professional trading competitions
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuresData.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <HomeCard key={index}>
                                <div className="text-left">
                                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </HomeCard>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Features;