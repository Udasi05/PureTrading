import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { InstrumentsSection } from "@/components/landing/InstrumentsSection";
import { SessionsSection } from "@/components/landing/SessionsSection";
import { TelegramSection } from "@/components/landing/TelegramSection";
import { EconomicCalendarSection } from "@/components/landing/EconomicCalendarSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <PricingSection />
        <InstrumentsSection />
        <SessionsSection />
        <TelegramSection />
        <EconomicCalendarSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
