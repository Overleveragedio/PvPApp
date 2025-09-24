import SectionHeading from "@/components/typography/SectionHeading";

const stepsData = [
    {
        number: "1",
        title: "Login",
        description: "Connect with any MetaMask wallet to create your account instantly."
    },
    {
        number: "2",
        title: "Deposit",
        description: "Use your favorite crypto to top-up your balance directly from your wallet."
    },
    {
        number: "3",
        title: "Select Competition",
        description: "Pick your buy-in, trading pair, duration, and risk level that fit your style."
    },
    {
        number: "4",
        title: "Trade",
        description: "Engage our real-time engine with live order books and charts to execute your strategy."
    },
    {
        number: "5",
        title: "Win",
        description: "The top balance at competition end wins—track your rank on our live leaderboard."
    }
];

const HowItWorks = () => {
    return (
        <section className="py-16 px-4 bg-background-secondary">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <SectionHeading size="5xl">
                        How It Works
                    </SectionHeading>
                    <p className="text-slate-400 text-lg">
                        Get started in minutes and start competing with traders worldwide
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-8">
                    {stepsData.map((step, index) => (
                        <div key={index} className="flex items-start gap-6">
                            {/* Step Number */}
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
                                <span className="text-white text-xl font-bold">{step.number}</span>
                            </div>

                            {/* Step Content */}
                            <div className="flex-1 pt-2">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;