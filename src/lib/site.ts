/**
 * Single source of truth for company facts.
 * Every value here comes from the live Spright Software Systems website —
 * nothing is invented. Update this file, not the components.
 */

const DEFAULT_SITE_URL = "https://www.sprightsoft.com";

/**
 * Resolve the canonical origin.
 *
 * `??` is not enough. A host that declares NEXT_PUBLIC_SITE_URL but leaves
 * the value blank hands us an empty string — which `??` does not catch,
 * because the variable IS defined — and `new URL("")` then throws
 * ERR_INVALID_URL inside metadataBase while Next collects page data, failing
 * the entire build. Next reports it as "Failed to collect configuration for
 * /_not-found", which points nowhere near the cause.
 *
 * So: try each candidate, skip anything empty once trimmed, give a bare host
 * a scheme (Vercel supplies `example.vercel.app`, not a URL), and fall back
 * rather than throwing if none of them parse.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
    DEFAULT_SITE_URL,
  ];

  for (const candidate of candidates) {
    const trimmed = candidate?.trim().replace(/\/$/, "");
    if (!trimmed) continue;

    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
      return new URL(withScheme).origin;
    } catch {
      // Unparseable — try the next candidate.
    }
  }

  return DEFAULT_SITE_URL;
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Spright Software Systems",
  shortName: "Spright",
  url: siteUrl,
  email: "hr@sprightsoft.com",
  tagline: "Specialized hiring solutions for productive business enhancement",
  description:
    "Spright Software Systems connects organizations with specialized technology talent — contract, contract-to-hire and permanent — across IT, engineering, media, education and corporate functions.",
} as const;

export type Office = {
  id: string;
  country: string;
  countryCode: string;
  city: string;
  addressLines: string[];
  postalCode: string;
  region: string;
  phoneLabel: string;
  phoneHref: string;
  /** Rough coordinates, used only by the abstract presence graphic. */
  coordinates: { lat: number; lng: number };
};

export const offices: Office[] = [
  {
    id: "india",
    country: "India",
    countryCode: "IN",
    city: "Pune",
    addressLines: ["D803 — Bramha Exuberance", "Off NIBM Road"],
    postalCode: "411048",
    region: "Maharashtra",
    phoneLabel: "+91 9309 066 157",
    phoneHref: "tel:+919309066157",
    coordinates: { lat: 18.52, lng: 73.86 },
  },
  {
    id: "usa",
    country: "United States",
    countryCode: "US",
    city: "Tampa",
    addressLines: ["8828 Citrus Palm Dr."],
    postalCode: "33626",
    region: "FL",
    phoneLabel: "+1 310 872 1327",
    phoneHref: "tel:+13108721327",
    coordinates: { lat: 27.95, lng: -82.46 },
  },
];

export const primaryOffice = offices[0]!;
