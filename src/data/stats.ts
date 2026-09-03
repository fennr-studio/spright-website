export type Stat = {
  value: number;
  suffix: string;
  label: string;
  detail: string;
};

/** Figures published by Spright Software Systems. Nothing here is estimated. */
export const stats: Stat[] = [
  {
    value: 250,
    suffix: "+",
    label: "Highly specialized employees",
    detail:
      "Engineers, architects, testers and delivery specialists working inside client teams.",
  },
  {
    value: 10,
    suffix: "+",
    label: "Countries worldwide",
    detail:
      "Hiring supported across time zones from our bases in Pune and Tampa.",
  },
  {
    value: 200,
    suffix: "+",
    label: "Finished projects",
    detail:
      "Completed engagements spanning enterprise platforms, product teams and functional roles.",
  },
];
