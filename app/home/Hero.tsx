import Button from "@/components/Button";

const Hero = () => {
    return (
        <div className="h-full">
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float"></div>
                {/* <div className="container mx-auto px-4 py-32 relative"></div> */}

                <div className="container mx-auto px-4 py-32 relative text-center">
                    {/* Live Trading Badge */}
                    <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <span className="text-cyan-400 text-sm font-medium">Live Trading Competitions</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Trade the Best.
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Be the Best.
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Empowering crypto traders, investors, and strategists to compete
                        in real-time trading competitions for real cash prizes.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button>
                            Start Trading →
                        </Button>
                        <Button variant="secondary">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero;