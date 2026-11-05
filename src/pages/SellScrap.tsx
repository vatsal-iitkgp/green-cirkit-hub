import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove } from "@/components/site/motion";
import { LeadForm } from "@/components/site/Form";
import { StageArt } from "@/components/site/visuals";
import { whatsappLink } from "@/lib/site";
import { Check, X, MessageCircle } from "lucide-react";

const BUY = [
  { t: "HDPE detergent & cleaner bottles", d: "Khada / loose or grinded. Blue, white and mixed colours.", hot: true },
  { t: "Other HDPE bottles", d: "Shampoo, lotion, home-care. Grinded or baled." },
  { t: "Blue HDPE drums", d: "50–200 L drums, whole or grinded." },
  { t: "HDPE caps & closures", d: "Sorted caps, any colour." },
];

const NOT = ["PET bottles", "PVC", "Multilayer / laminates", "Milk pouches & films", "Oil or chemical-contaminated drums"];

const HOW = [
  { k: "01", t: "Share details", d: "Material, quantity, location. Photos on WhatsApp help us price faster." },
  { k: "02", t: "Get a price", d: "A clear, market-linked rate per kg. Usually the same day." },
  { k: "03", t: "Weigh & get paid", d: "Weighbridge weight, quick quality check, payment as agreed. No games." },
];

const SellScrap = () => (
  <Page>
    {/* Hero */}
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-16">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)]" />
      <div className="relative container max-w-6xl grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <Eyebrow>Sell scrap</Eyebrow>
          <SplitHeadline
            as="h1"
            animateOnMount
            delay={0.2}
            text={"Your HDPE scrap,\n*priced fairly.*\nPaid properly."}
            className="mt-6 text-[clamp(2.8rem,7.5vw,6.2rem)] font-medium leading-[0.92]"
          />
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
              We buy post-consumer HDPE in steady volumes from dealers and aggregators across India. Long-term partners get priority and better rates.
            </p>
          </Reveal>
          <Reveal delay={0.75} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Btn href="#sell" size="lg">
                Get a price
              </Btn>
            </Magnetic>
            <a
              href={whatsappLink("Hi GreenCirkit, I want to sell HDPE scrap. Material: ___ Quantity: ___ Location: ___")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-foreground/15 px-6 text-base hover:border-primary hover:text-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Send photos on WhatsApp
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="md:col-span-5">
          <div className="relative mx-auto max-w-[420px] aspect-square rounded-full border border-foreground/10 grid place-items-center">
            <div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl" />
            <StageArt stage={0} className="relative w-3/4" />
          </div>
        </Reveal>
      </div>
    </section>

    {/* What we buy */}
    <section className="container max-w-6xl py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Reveal>
            <Eyebrow>What we buy</Eyebrow>
          </Reveal>
          <SplitHeadline text={"HDPE, and *only*\nHDPE."} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
        </div>
        <Reveal>
          <p className="text-sm text-muted-foreground max-w-xs">Loose, baled or grinded. Cleaner material = better rate.</p>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {BUY.map((b, i) => (
          <Reveal key={b.t} delay={i * 0.07}>
            <div onMouseMove={spotlightMove} className="spotlight h-full rounded-[24px] border border-foreground/10 bg-card p-8 flex gap-5">
              <span className="shrink-0 grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Check className="h-5 w-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-medium">{b.t}</h3>
                  {b.hot && <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-medium text-primary-foreground">Top priority</span>}
                </div>
                <p className="mt-2 text-muted-foreground">{b.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="mr-2">We don't buy:</span>
        {NOT.map((n) => (
          <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5">
            <X className="h-3.5 w-3.5" /> {n}
          </span>
        ))}
      </Reveal>
    </section>

    {/* How */}
    <section className="container max-w-6xl py-20">
      <SplitHeadline text={"Three steps.\n*No runaround.*"} className="text-4xl md:text-6xl font-medium leading-[0.95]" />
      <div className="mt-12 grid md:grid-cols-3 border-t border-foreground/10">
        {HOW.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.1} className={`py-10 ${i ? "md:border-l md:pl-8" : ""} md:pr-8 border-foreground/10`}>
            <p className="font-mono text-xs text-primary">{s.k}</p>
            <h3 className="mt-6 text-2xl font-medium">{s.t}</h3>
            <p className="mt-3 text-muted-foreground">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>

    {/* Form */}
    <section id="sell" className="container max-w-6xl py-24 md:py-32 scroll-mt-20">
      <div className="grid md:grid-cols-12 gap-12 rounded-[32px] border border-foreground/10 bg-card p-8 md:p-14">
        <div className="md:col-span-4">
          <Eyebrow>Get a price</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-[0.95]">
            What have you <span className="serif italic text-primary">got?</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">Share the basics. We'll call you back with a rate, usually the same day.</p>
        </div>
        <div className="md:col-span-8">
          <LeadForm
            type="Sell Scrap"
            submitLabel="Get my price"
            whatsappText="Hi GreenCirkit, I want to sell HDPE scrap. Material: ___ Quantity: ___ Location: ___"
            successTitle="Thanks! We're on it."
            successBody="Our sourcing team will call you back with a rate. Keep a few photos of the material handy."
            fields={[
              { name: "name", label: "Your name", type: "text", required: true, half: true },
              { name: "company", label: "Firm name", type: "text", half: true },
              { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true },
              { name: "city", label: "City / State", type: "text", required: true, half: true },
              { name: "material", label: "Material", type: "chips", options: ["Detergent bottles", "Other HDPE bottles", "Blue drums", "Caps", "Mixed HDPE"], multi: true, required: true },
              { name: "form", label: "Form", type: "chips", options: ["Khada / loose", "Baled", "Grinded"], multi: true },
              { name: "volume", label: "Quantity per month", type: "chips", options: ["< 5 t", "5–20 t", "20–50 t", "50 t +"], required: true },
              { name: "message", label: "Expected rate or anything else", type: "textarea" },
            ]}
          />
        </div>
      </div>
    </section>
  </Page>
);

export default SellScrap;
