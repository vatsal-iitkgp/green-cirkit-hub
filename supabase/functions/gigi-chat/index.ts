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
- Two things the website offers: (1) BUY bottle-grade rHDPE granules, (2) SELL us HDPE scrap. Nothing else is offered on the site right now (do not offer EPR certificates or other services).
- Directors: Anuj Gupta (IIT Roorkee) and Vatsal Gupta (IIT Kharagpur, ex-Houlihan Lokey).
- Stage: early. Supply currently runs through a partner recycling network while our own plant is being set up (planned line: AI optical sorter, washing line and extruder, ~1.5 t/hr washing and sorting). If asked about stage, say this honestly; never claim the plant is already running.

PRODUCT — GC Prime™ rHDPE, bottle grade
- Made from post-consumer HDPE bottles (detergent / home-care bottles), for blow moulding new bottles. Non-food-contact use only.
- Variants: Natural, and colour-sorted (e.g. blue).
- Target specs: MFI 0.3–0.6 g/10 min (190°C / 2.16 kg, ASTM D1238); density 0.950–0.965 g/cm³; tensile strength at yield 19–27 MPa; flexural modulus 700–1,250 MPa; ESCR ≥ 40 h; ash < 2.5%; moisture < 0.5%; PCR content > 95%. Packed in 25 kg bags. Every batch ships with its test report (TDS).
- Uses: home-care bottles, personal-care bottles (non-food), containers and jerry cans.
- Ordering: share requirement → sample + TDS → monthly supply agreement.
- Pricing: do NOT quote numbers. Price depends on grade, colour and volume; the team sends a firm quote within one working day.

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
