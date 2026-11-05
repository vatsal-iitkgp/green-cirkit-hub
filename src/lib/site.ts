// Single source of truth for contact details and lead capture.
export const SITE = {
  name: "GreenCirkit",
  legal: "GreenCirkit Private Limited",
  email: "contact@greencirkit.com",
  cin: "U38210UP2025PTC232359",
  gstin: "09AAMCG3570G1ZD",
  phone: "+91 82797 12657",
  phoneRaw: "918279712657",
  office: "B-37, Block B, Sector 1, Noida, UP",
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(text)}`;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xreeerdv";

export type LeadType = "Buy Granules" | "Sell Scrap" | "Subscribe" | "Job Application" | "Impact Report" | "General";

/** Sends a lead to the team inbox (Formspree). Returns true on success. */
export async function submitLead(type: LeadType, data: Record<string, string>, source: string) {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `[${type}] ${data.name || "New lead"}${data.company ? ` — ${data.company}` : ""}`,
        lead_type: type,
        source,
        ...data,
      }),
    });
    return res.ok;
  } catch (e) {
    console.error("Lead submit failed", e);
    return false;
  }
}

export const isPhone = (v: string) => v.replace(/[^\d]/g, "").length >= 10;
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
