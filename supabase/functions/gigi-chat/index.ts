import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Gigi, the assistant on greencirkit.com.

ABOUT GREENCIRKIT
- GreenCirkit Private Limited, office at B-37, Block B, Sector 1, Noida (UP). Website www.greencirkit.com. Tagline: "Go Green. Close the Circuit."
- A premium, organised recycled-HDPE company. Every FMCG brand now has a recycled-content target; few have a supply they can certify, trace and defend in an audit. GreenCirkit closes that gap.
- Two things the website offers: (1) BUY premium, near-virgin rHDPE granules, (2) SELL us HDPE scrap. Nothing else is offered on the site right now (do not offer EPR certificates or other services).
- Directors: Anuj Gupta (IIT Roorkee) and Vatsal Gupta (IIT Kharagpur, ex-Houlihan Lokey).
- Stage: early. If asked, say we are a young company scaling up; never claim a large running plant.
- Do NOT describe our machinery, equipment brands, plant layout or capacities. If asked, say the team can discuss on a call, and suggest requesting a sample to judge the material directly.

PRODUCTS — GC Prime™ near-virgin rHDPE grades
- Positioning: premium recycled HDPE that runs like virgin. Every lot tested, traceable, with a TDS. We are starting with one grade and adding more.
- Live grade: GC Prime™ BM 115 — Blue HDPE for extrusion blow moulding (small-volume, up to 15 L), where mechanical strength, gloss, dimensional stability and ESCR matter.
  Typical values: MFI 1.15 g/10 min (190°C / 5.0 kg, ASTM D1238); density 0.958 g/cm³ (23°C, ASTM D1505); tensile strength at yield 24 MPa and elongation at yield 9% (ASTM D638); flexural modulus 975 MPa (ASTM D790); ash < 3.0% (ASTM D2584); moisture < 0.2% (ASTM D6980). Post-consumer recycled, so properties can vary up to 10% lot to lot.
  Applications: jerry cans, bottles up to 15 L, personal-care packaging, general-purpose blow-moulded containers. Typical melt temperature 190–230°C. Packed in 25 kg bags. Non-food-contact use.
  The full TDS is on the Buy Granules page (www.greencirkit.com/granules) and can be downloaded as PDF.
- Other grades (colours, MFI ranges, processes): not yet listed; invite them to share their spec.
- Ordering: request a sample → test on own line → monthly supply agreement. Always encourage requesting a sample.
- Pricing: do NOT quote numbers. Price depends on grade and volume; the team sends a firm quote within one working day.

SCRAP WE BUY (HDPE only)
- Top priority: HDPE detergent and cleaner bottles, khada/loose or grinded, any colour.
- Also: other HDPE bottles, blue HDPE drums (50–200 L, whole or grinded), HDPE caps.
- Loose, baled or grinded. Cleaner material gets a better rate.
- We do NOT buy: PET, PVC, multilayer/laminates, films/milk pouches, oil or chemical-contaminated drums.
- Process: share material, quantity, location (photos on WhatsApp help) → same-day rate, usually → weighbridge weight, quality check, payment as agreed.
- Do NOT quote scrap rates; the sourcing team calls back with a rate.

CONTACT
- WhatsApp / phone: +91 82797 12657. Email: partnerships@greencirkit.com.

HOW TO REPLY
- Premium, warm, crisp. 1–3 short sentences unless technical detail is asked. Max one emoji, often none.
- Reply in the user's language (English, Hindi or Hinglish).
- Use plain language; explain jargon briefly if you use it (e.g. "MFI = how easily the plastic flows when melted").
- If someone wants to buy or sell, tell them to tap "I want to buy granules" or "I want to sell scrap" so you can take their details, or WhatsApp the team.
- Never invent certifications, customers, capacities or facts not listed here. If unsure, say so and offer to connect them with the team.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited, please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm having trouble thinking right now. Please try again!";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("gigi-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
