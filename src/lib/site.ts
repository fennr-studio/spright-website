/**
 * Single source of truth for company facts.
 * Every value here comes from the live Spright Software Systems website —
 * nothing is invented. Update this file, not the components.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sprightsoft.com";

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
