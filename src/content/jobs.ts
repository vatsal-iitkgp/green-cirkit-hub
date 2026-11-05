// Open roles. Add, edit or remove a role here and the Careers page updates.
export type Job = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  doing: string[];
  you: string[];
};

export const JOBS: Job[] = [
  {
    id: "sourcing-executive",
    title: "Sourcing Executive — HDPE Scrap",
    team: "Supply",
    location: "Delhi NCR (field)",
    type: "Full-time",
    summary: "Build and run our network of scrap dealers and aggregators across North India.",
    doing: [
      "Find, visit and onboard HDPE scrap dealers and aggregators",
      "Negotiate rates, check material quality, and track every lot",
      "Keep a steady weekly supply of the right material moving",
    ],
    you: [
      "2+ years in scrap, recycling or polymer trading",
      "Comfortable on the ground, in Hindi and English",
      "Organised: you keep records clean without being asked",
    ],
  },
  {
    id: "sales-manager-polymers",
    title: "Sales Manager — Recycled Polymers",
    team: "Sales",
    location: "Noida",
    type: "Full-time",
    summary: "Win and grow converters and brand owners who buy rHDPE.",
    doing: [
      "Build a pipeline of blow moulders, converters and FMCG packaging teams",
      "Run sample trials with customers and turn them into monthly supply",
      "Own pricing, contracts and customer relationships",
    ],
    you: [
      "3+ years selling polymers or packaging in India",
      "Understand MFI, density and what a TDS means for a customer's line",
      "Hungry, honest, and good with numbers",
    ],
  },
  {
    id: "quality-executive",
    title: "Quality & Lab Executive",
    team: "Operations",
    location: "Noida / NCR",
    type: "Full-time",
    summary: "Make sure every lot we ship matches its datasheet.",
    doing: [
      "Test incoming material and finished granules (MFI, density, ash, moisture)",
      "Maintain lot records and test reports for traceability",
      "Work with partners to fix quality issues at the source",
    ],
    you: [
      "Diploma or degree in polymer science, chemistry or plastics technology",
      "Hands-on with polymer lab testing",
      "Detail-obsessed",
    ],
  },
];
