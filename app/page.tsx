import Image from "next/image";
import Hero from "./home/Hero";
import HomeCard from "@/components/home/Card";
import StatsSection from "./home/Stats";
import HowItWorks from "./home/HowItWorks";
import Features from "./home/Features";
import CallToAction from "./home/CallToAction";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <HowItWorks />
      <Features />
      <CallToAction />
      <Footer />
    </>
  );
}
