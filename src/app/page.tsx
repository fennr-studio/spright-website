import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StatsBand } from "@/components/sections/StatsBand";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { FeaturedExpertise } from "@/components/sections/FeaturedExpertise";
import { IndustriesShowcase } from "@/components/sections/IndustriesShowcase";
import { WhySpright } from "@/components/sections/WhySpright";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Specialised technology hiring and IT staffing",
  description:
    "Spright Software Systems places specialised technology talent into client teams — contract, contract-to-hire and permanent — across ERP, development, testing and delivery. Offices in Pune and Tampa.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <StatsBand />
      <AboutSplit />
      <ProcessTimeline />
      <FeaturedExpertise />
      <IndustriesShowcase limit={6} />
      <WhySpright />
      <GlobalPresence />
      <CtaBanner />
    </>
  );
}
