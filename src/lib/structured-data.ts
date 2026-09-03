import { offices, site, siteUrl } from "@/lib/site";

/**
 * schema.org JSON-LD. Rendered from the server so search engines get it in the
 * initial HTML with no client cost.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    alternateName: "Sprightsoft",
    url: siteUrl,
    email: site.email,
    description: site.description,
    slogan: site.tagline,
    areaServed: "Worldwide",
    knowsAbout: [
      "IT staffing",
      "Contract staffing",
      "Contract-to-hire",
      "Permanent hiring",
      "Technology recruitment",
      "ERP hiring",
      "Software engineering hiring",
      "Quality engineering hiring",
    ],
    address: offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.addressLines.join(", "),
      addressLocality: office.city,
      addressRegion: office.region,
      postalCode: office.postalCode,
      addressCountry: office.countryCode,
    })),
    contactPoint: offices.map((office) => ({
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: office.phoneHref.replace("tel:", ""),
      email: site.email,
      areaServed: office.countryCode,
      availableLanguage: ["en"],
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
