export type TechnologyArea = {
  id: string;
  name: string;
  description: string;
  /** Role families and capability areas we recruit within. */
  capabilities: string[];
};

/**
 * Technology areas.
 *
 * Four, matching the four Spright publishes: "ERP to Development to Testing
 * and Delivery". The names here expand those terms for a reader who does not
 * already know them, and each description names the published term itself.
 *
 * A fifth entry ("Current technology ecosystems") used to sit here, assembled
 * out of a passing phrase on the site rather than anything Spright states as
 * a specialisation. It has been removed: on a page whose whole claim is
 * specialist depth, an invented capability is the one thing that cannot be
 * there.
 */
export const technologyAreas: TechnologyArea[] = [
  {
    id: "enterprise",
    name: "Enterprise technology",
    description:
      "ERP and core business platforms — the systems the rest of the organisation runs on.",
    capabilities: [
      "ERP functional consultants",
      "Technical consultants",
      "Integration specialists",
      "Platform administrators",
    ],
  },
  {
    id: "engineering",
    name: "Software engineering",
    description:
      "Development talent across front end, back end and services, from individual contributors to architects.",
    capabilities: [
      "Full-stack engineers",
      "Back-end and API engineers",
      "Front-end engineers",
      "Solution architects",
    ],
  },
  {
    id: "quality",
    name: "Quality engineering",
    description:
      "Testing capability that scales with release cadence rather than lagging behind it.",
    capabilities: [
      "Automation engineers",
      "Manual and exploratory testers",
      "Performance testing",
      "QA leads",
    ],
  },
  {
    id: "delivery",
    name: "Product delivery",
    description:
      "The people who move work through an organisation: delivery, programme and release ownership.",
    capabilities: [
      "Delivery managers",
      "Project and programme managers",
      "Business analysts",
      "Scrum masters",
    ],
  },
];
