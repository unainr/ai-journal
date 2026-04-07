"use client";

import { HeroSection } from "../components/hero-section";
import { FeaturesSection } from "../components/features-section";
import { HowItWorksSection } from "../components/how-it-works";
import { TestimonialsSection } from "../components/testimonials-section";
import { PricingSection } from "../components/pricing-section";
import { FaqSection } from "../components/faq-section";
import { HomeFooter } from "../components/home-footer";

export const HomeView = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <HomeFooter />
    </div>
  );
};
