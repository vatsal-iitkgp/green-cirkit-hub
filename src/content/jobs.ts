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
    id: "head-sales-business-development",
    title: "Head — Sales & Business Development",
    team: "Leadership",
    location: "Noida",
    type: "Full-time",
    summary: "Own revenue. Build GreenCirkit's customer base from the first brand to the hundredth.",
    doing: [
      "Win FMCG brands, packaging converters and blow moulders as long-term rHDPE customers",
      "Build the sales engine: pipeline, pricing, contracts and a small team",
      "Turn sample trials into steady monthly supply agreements",
      "Be the voice of the customer in product and quality decisions",
    ],
    you: [
      "8+ years in polymer, packaging or FMCG sales, with relationships to show for it",
      "Fluent in MFI, density and TDS, and in how procurement teams buy",
      "A builder: you've grown an account book from scratch before",
    ],
  },
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
