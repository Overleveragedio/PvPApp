import Button from "@/components/Button";
import SectionHeading from "@/components/typography/SectionHeading";
import Link from "next/link";

const CallToAction = () => {
    return (
        <section className="py-16 px-4 bg-background">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-12 text-center">
                    <SectionHeading size="5xl" className="mb-6">
                        Ready to Compete?
                    </SectionHeading>

                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                        Join thousands of traders competing for real prizes every hour.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={"/competitions"}>
                            <Button size="md">
                                Enter Competition →
                            </Button>
                        </Link>
                        <Button variant="secondary" size="md">
                            View Leaderboard
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToAction;