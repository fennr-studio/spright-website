export type HiringModel = {
  id: string;
  name: string;
  /** Answers "when would I choose this?" in one line. */
  bestFor: string;
  description: string;
  characteristics: { label: string; value: string }[];
};

/**
 * Flexible contracts, as offered today: recruits sourced to suit any length of
 * contract — permanent roles, temporary cover and short-term freelance work —
 * plus the contract-to-hire and project-based routes described on the site.
 */
export const hiringModels: HiringModel[] = [
  {
    id: "permanent",
    name: "Permanent roles",
    bestFor: "Core capability you are building for the long term",
    description:
      "Full search for a permanent hire, run against your budget and your timeline. We account for the urgency of the position and the level it needs to be filled at, and present talent that can hold the role well beyond the first year.",
    characteristics: [
      { label: "Engagement", value: "Direct employment with you" },
      { label: "Typical use", value: "Critical or hard-to-fill roles" },
      { label: "We handle", value: "Search, screening, offer support" },
    ],
  },
  {
    id: "temporary",
    name: "Temporary cover",
    bestFor: "Absence, peak load or a defined seasonal need",
    description:
      "Cover for a known gap — leave, seasonal demand, or a period where the team simply needs more hands. The professional works to your direction while we carry the employment administration.",
    characteristics: [
      { label: "Engagement", value: "Employed and payrolled by us" },
      { label: "Typical use", value: "Seasonal and short-term cover" },
      { label: "We handle", value: "Payroll, tax, insurance, compliance" },
    ],
  },
  {
    id: "freelance",
    name: "Short-term freelance",
    bestFor: "Discrete pieces of work with a clear finish line",
    description:
      "Specialists from our freelance network for work that sits alongside your core team — a designed website, brand collateral, stationery, a market research project. Scoped to the deliverable, not to a headcount line.",
    characteristics: [
      { label: "Engagement", value: "Independent contract" },
      { label: "Typical use", value: "Defined deliverables" },
      { label: "We handle", value: "Matching, contracting, coordination" },
    ],
  },
  {
    id: "contract-to-hire",
    name: "Contract-to-hire",
    bestFor: "Roles where you want certainty before committing",
    description:
      "A pre-screened professional joins on a short-term contract through a probationary period. If the fit is right on both sides, they convert to a full-time employee — with no second search and no lost ramp-up time.",
    characteristics: [
      { label: "Engagement", value: "Contract, convertible to permanent" },
      { label: "Typical use", value: "Senior or high-impact hires" },
      { label: "We handle", value: "Contracting through to conversion" },
    ],
  },
  {
    id: "project",
    name: "Project-based support",
    bestFor: "A programme that needs a team, not a person",
    description:
      "Contract talent assembled around a defined programme of work, with the option to hire the contractors permanently at the end of it. Useful when a delivery date is fixed and the internal team cannot absorb the load.",
    characteristics: [
      { label: "Engagement", value: "Contract for the project term" },
      { label: "Typical use", value: "Time-boxed programmes" },
      { label: "We handle", value: "Team assembly and ongoing management" },
    ],
  },
];
