import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { HiringBoardSection } from "@/components/sections/HiringBoardSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { AntiScamSection } from "@/components/sections/AntiScamSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PromiseSection />
        <HiringBoardSection />
        <ComparisonSection />
        <AntiScamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
