import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { termsSections } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms & conditions",
  description:
    "The terms that apply when you use the Spright Software Systems website and the material published on it.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & conditions"
      intro="The terms that apply when you use this website and anything you submit through it."
      sections={termsSections}
      crumbLabel="Terms & conditions"
      crumbPath="/terms"
    />
  );
}
