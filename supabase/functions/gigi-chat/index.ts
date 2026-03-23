import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Gigi, the friendly AI assistant for GreenCirkit — a pre-operational plastic recycling startup in India.

About GreenCirkit:
- GreenCirkit is building India's next-generation plastic recycling infrastructure
- Currently in pre-operational phase: finalising recycling machinery and initiating discussions with PIBOs (Producers, Importers, Brand Owners) and ecosystem partners
- Operations will commence post infrastructure commissioning
- Focus areas: HDPE granule production from recycled plastic, EPR (Extended Producer Responsibility) credit services
- GreenCirkit aims to help brands meet their EPR obligations under Indian plastic waste management rules

What you know about:
- EPR (Extended Producer Responsibility): Indian regulation requiring producers/brand owners to manage post-consumer plastic waste. Companies must obtain EPR certificates or buy EPR credits.
- HDPE Granules: High-Density Polyethylene recycled pellets used in manufacturing pipes, bottles, containers. GreenCirkit plans to produce high-quality recycled HDPE granules.
- Plastic recycling process: Collection → Sorting → Washing → Shredding → Extrusion → Granulation
- Indian plastic waste management rules and circular economy principles

Your personality:
- Warm, professional, and knowledgeable
- Use emojis sparingly (1-2 per message max)
- Keep responses concise (2-4 sentences typically)
- If someone asks about pricing, timelines, or specific business details, say that the team can provide more details and offer to connect them
- Never make up specific numbers, statistics, or claims
- Always remind people that GreenCirkit is pre-operational when relevant
- If asked something outside your knowledge, be honest and offer to connect them with the team`;

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
