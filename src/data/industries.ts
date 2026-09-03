export type Industry = {
  id: string;
  name: string;
  description: string;
  /** Representative role families we recruit for in this sector. */
  roles: string[];
};

/** Domains served, as published by Spright Software Systems. */
export const industries: Industry[] = [
  {
    id: "information-technology",
    name: "Information technology",
    description:
      "Product, platform and services organisations that need engineering depth on demand.",
    roles: ["Software engineers", "Architects", "QA engineers", "DevOps"],
  },
  {
    id: "manufacturing-design",
    name: "Manufacturing & design",
    description:
      "Engineering and design functions where technical systems and physical production meet.",
    roles: ["Design engineers", "PLM specialists", "Production planning"],
  },
  {
    id: "chemical-engineering",
    name: "Chemical engineering",
    description:
      "Process and plant-side specialists for organisations running regulated technical operations.",
    roles: ["Process engineers", "Quality control", "Technical operations"],
  },
  {
    id: "media-communication",
    name: "Media & communication",
    description:
      "Content, broadcast and communication businesses building modern digital capability.",
    roles: ["Digital producers", "Content platforms", "Communication leads"],
  },
  {
    id: "education",
    name: "Education",
    description:
      "Institutions and education technology providers hiring academic and technical staff.",
    roles: ["Academic staff", "EdTech engineers", "Programme coordinators"],
  },
  {
    id: "corporate-roles",
    name: "Corporate roles",
    description:
      "Finance, operations and administrative functions that keep a growing business running.",
    roles: ["Finance", "Operations", "Business support"],
  },
  {
    id: "human-resources",
    name: "Human resources",
    description:
      "HR teams building their own capability, from generalists to talent acquisition specialists.",
    roles: ["HR business partners", "Talent acquisition", "HR operations"],
  },
];
