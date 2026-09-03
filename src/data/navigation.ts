export type NavItem = {
  label: string;
  href: string;
  /** Shown in the mega/mobile menu as supporting context. */
  summary?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about", summary: "Who we are and how we partner" },
  {
    label: "Services",
    href: "/services",
    summary: "Staffing and technology hiring",
    children: [
      {
        label: "Staffing",
        href: "/services/staffing",
        summary: "Contract, contract-to-hire and permanent teams",
      },
      {
        label: "Technology hiring",
        href: "/services/technology-hiring",
        summary: "ERP, development, testing and delivery specialists",
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    summary: "The sectors we recruit for",
  },
  {
    label: "Technology",
    href: "/technology",
    summary: "Where our technical depth sits",
  },
  { label: "Careers", href: "/careers", summary: "Join our talent network" },
];

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Technology", href: "/technology" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Staffing", href: "/services/staffing" },
    { label: "Technology hiring", href: "/services/technology-hiring" },
    { label: "Industry solutions", href: "/industries" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Terms & conditions", href: "/terms" },
  ],
} as const;
