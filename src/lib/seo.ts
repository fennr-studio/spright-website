import type { Metadata } from "next";
import { site, siteUrl } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path beginning with a slash, e.g. "/services". */
  path: string;
  image?: string;
};

/**
 * Builds canonical + Open Graph + Twitter metadata for a page so that every
 * route stays consistent and no page ships without a canonical URL.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description,
      url,
      // When `image` is omitted, Next fills this in from app/opengraph-image.tsx.
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: site.name }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
