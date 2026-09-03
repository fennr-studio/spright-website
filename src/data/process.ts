export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

/** How an engagement runs, end to end. */
export const engagementProcess: ProcessStep[] = [
  {
    id: "understand",
    title: "Understand",
    description:
      "We start with your organisation, not a job title: the technical environment, the team the hire is joining, and what success in the role actually looks like.",
  },
  {
    id: "strategize",
    title: "Strategize",
    description:
      "We agree the hiring model that fits the requirement — contract, contract-to-hire or permanent — and define the profile against real constraints on budget and timing.",
  },
  {
    id: "source",
    title: "Source",
    description:
      "We go to our network of specialised professionals and to the wider market, screening for skills, competencies and attitude before anything reaches you.",
  },
  {
    id: "deliver",
    title: "Deliver",
    description:
      "We move the right people into the right roles and handle the administration around them — contracts, payroll, compliance and onboarding.",
  },
  {
    id: "grow",
    title: "Grow",
    description:
      "We stay with the engagement after the start date, so a first placement becomes a working relationship and a stronger team over time.",
  },
];

/**
 * Recruitment workflow, preserving every stage listed on the current site:
 * identifying requirements, job design, job and person descriptions, candidate
 * screening, candidate profiling, short-listing, interviewing, pre-employment
 * checks and reference gathering.
 */
export const recruitmentWorkflow: (ProcessStep & { activities: string[] })[] = [
  {
    id: "discover",
    title: "Discover",
    description: "Identifying the requirement and the need behind the role.",
    activities: ["Requirement analysis", "Role justification", "Team context"],
  },
  {
    id: "define",
    title: "Define",
    description:
      "Job design, then the job and person descriptions that follow from it.",
    activities: ["Job design", "Job description", "Person specification"],
  },
  {
    id: "source",
    title: "Source",
    description:
      "Reaching the specialised professionals who match the specification.",
    activities: ["Network outreach", "Market mapping", "Candidate profiling"],
  },
  {
    id: "evaluate",
    title: "Evaluate",
    description:
      "Screening and profiling candidates against the brief before shortlisting.",
    activities: ["Candidate screening", "Technical assessment", "Short-listing"],
  },
  {
    id: "select",
    title: "Select",
    description: "Interviewing, then the checks that confirm the decision.",
    activities: ["Interviewing", "Pre-employment checks", "Reference gathering"],
  },
  {
    id: "onboard",
    title: "Onboard",
    description:
      "Offer, contracting and the first weeks in the role, handled properly.",
    activities: ["Offer management", "Contracting", "Onboarding support"],
  },
];
