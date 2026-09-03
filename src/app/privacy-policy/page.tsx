import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacySections } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How Spright Software Systems collects, uses and protects the personal information you send through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy policy"
      intro="What we collect through this website, why we collect it, and what you can ask us to do with it."
      sections={privacySections}
      crumbLabel="Privacy policy"
      crumbPath="/privacy-policy"
    />
  );
}
