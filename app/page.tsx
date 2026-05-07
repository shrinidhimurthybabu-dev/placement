import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { InteractiveDemo } from "@/components/interactive-demo";
import { UserFlows } from "@/components/user-flows";
import { UseCases } from "@/components/use-cases";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { AnimatedBackground } from "@/components/animated-background";
import { GradientOrbs } from "@/components/gradient-orbs";
import { DataStream } from "@/components/data-stream";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Layered animated backgrounds */}
      <AnimatedBackground />
      <GradientOrbs />
      <DataStream />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="pt-16">
          <HeroSection />
          <section id="features">
            <FeaturesGrid />
          </section>
          <UserFlows />
          <section id="demo">
            <InteractiveDemo />
          </section>
          <section id="use-cases">
            <UseCases />
          </section>
          <CTASection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
