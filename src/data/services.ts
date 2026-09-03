import type { LucideIcon } from "lucide-react";
import { Layers, Users, Compass } from "lucide-react";

export type Service = {
  slug: string;
  href: string;
  title: string;
  /** One line for cards and navigation. */
  summary: string;
  /** Two or three sentences for the services overview page. */
  description: string;
  icon: LucideIcon;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "staffing",
    href: "/services/staffing",
    title: "Staffing",
    summary:
      "The right people, with the right skills, competencies and attitude.",
    description:
      "We help you optimise the most strategic and most variable component of business success: your people. As an unconventional technical staffing partner, we shape the engagement around your requirement — short-term, seasonal or temporary cover, contract-to-hire for project-based support, or the permanent specialist your team needs now.",
    icon: Users,
    highlights: [
      "Short-term, seasonal and temporary cover",
      "Contract and project-based support",
      "Contract-to-hire with a route to permanent",
      "Permanent search for critical roles",
    ],
  },
  {
    slug: "technology-hiring",
    href: "/services/technology-hiring",
    title: "Technology hiring",
    summary:
      "Specialists across ERP, development, testing and delivery.",
    description:
      "Our specialisations run from ERP through development to testing and delivery, backed by a working understanding of how those platforms are actually changing. That means shortlists built by people who can read a technical brief rather than keyword-match it.",
    icon: Layers,
    highlights: [
      "Enterprise technology and ERP",
      "Software engineering across the stack",
      "Quality and test engineering",
      "Delivery, programme and release roles",
    ],
  },
  {
    slug: "industries",
    href: "/industries",
    title: "Industry solutions",
    summary:
      "Sector context built on fifteen years of resource experience in HR.",
    description:
      "We recruit across a wide range of IT and functional industries, drawing on fifteen years of resource experience in human resources. Each sector gets first-hand insight into the technology it depends on, rather than a generic process applied to a different job title.",
    icon: Compass,
    highlights: [
      "Information technology",
      "Manufacturing and design",
      "Media, education and corporate functions",
      "Human resources and support roles",
    ],
  },
];

/** Service offerings preserved from the existing site's services page. */
export type Offering = {
  title: string;
  description: string;
};

export const offerings: Offering[] = [
  {
    title: "Consulting services",
    description:
      "Consulting specialists placed quickly and at no additional cost to you. We hold the contracts and absorb the administration — payroll, time tracking, taxes, insurance and compensation. Every candidate is screened and interviewed before you meet them.",
  },
  {
    title: "Full-time employees",
    description:
      "Permanent hiring that accounts for both your budget and the urgency of the role. We work to the position you actually need filled, and present talent that can hold it long term.",
  },
  {
    title: "Temporary-to-permanent hire",
    description:
      "When you need the role filled but want certainty before you commit. A pre-screened professional joins on a short-term contract through a probationary period, and converts to a full-time employee if it works for both sides.",
  },
  {
    title: "Freelancers",
    description:
      "For the work that sits alongside your core hiring — a designed website, brand collateral, company swag, stationery, market research. Our freelance network covers it, matched to the person who will get it done efficiently.",
  },
];
