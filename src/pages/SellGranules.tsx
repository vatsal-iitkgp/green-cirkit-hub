import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove } from "@/components/site/motion";
import { LeadForm } from "@/components/site/Form";
import { PelletCluster } from "@/components/site/visuals";
import { whatsappLink } from "@/lib/site";
import { Check, X, MessageCircle } from "lucide-react";

const WA = "Hi GreenCirkit, I want to sell recycled HDPE granules. Grade / colour: ___ MFI: ___ Quantity per month: ___ Location: ___";

const BUY = [
  { t: "Blow moulding rHDPE", d: "Blue, natural or coloured. MFI around 0.3–1.5 (190°C / 5 kg).", hot: true },
  { t: "Injection moulding rHDPE", d: "Higher-flow grades for caps, crates and household goods." },
  { t: "Pipe & film grade rHDPE", d: "Low-MFI grades with consistent density." },
  { t: "Custom & blended grades", d: "Have something specific? Share the spec and a sample." },
];

const NEED = ["Single-polymer HDPE", "Consistent colour and MFI lot to lot", "A test report per lot (or we test it)", "GST invoice and e-way bill"];
const NOT = ["Mixed or unknown polymer", "Agglomerate or regrind", "Odour or contamination issues", "Material without a GST invoice"];

const WHY = [
  { t: "Steady offtake", d: "Monthly volumes you can plan production around." },
  { t: "Fair, market-linked price", d: "Pegged to virgin HDPE moves. Clear numbers, no haggling games." },
  { t: "On-time payment", d: "Payment terms agreed upfront and honoured." },
  { t: "You make, we sell", d: "We handle brands, testing paperwork and dispatch. You focus on the line." },
];

const HOW = [
  { k: "01", t: "Share your grade", d: "MFI, density, colour, monthly quantity. A test report helps." },
  { k: "02", t: "Send a sample", d: "We test it against buyer specs and tell you where it fits." },
  { k: "03", t: "Lock regular offtake", d: "Agreed spec, price formula and schedule. Every lot checked on arrival." },
];

const SellGranules = () => (
  <Page>
    {/* Hero */}
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-16">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)]" />
      <div className="relative container max-w-6xl grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <Eyebrow>Sell granules</Eyebrow>
          <SplitHeadline
            as="h1"
            animateOnMount
            delay={0.2}
            text={"You make it.\n*We move it.*"}
            className="mt-6 text-[clamp(2.8rem,7.5vw,6.2rem)] font-medium leading-[0.92]"
          />
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Recyclers and granule makers: we buy quality rHDPE in steady monthly volumes and supply it to brands and converters across India. Consistent partners get priority and better terms.
            </p>
          </Reveal>
          <Reveal delay={0.75} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Btn href="#sell" size="lg">
                Become a supply partner
              </Btn>
            </Magnetic>
            <a
              href={whatsappLink(WA)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-foreground/15 px-6 text-base hover:border-primary hover:text-primary transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> Share your TDS on WhatsApp
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="md:col-span-5">
          <div className="relative mx-auto max-w-[420px] aspect-square rounded-full border border-foreground/10 grid place-items-center">
            <div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl" />
            <PelletCluster tone="blue" className="relative w-3/4" />
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
          <SplitHeadline text={"rHDPE granules.\n*Consistent ones.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
        </div>
        <Reveal>
          <p className="text-sm text-muted-foreground max-w-xs">Bagged granules only. The more consistent your lots, the better the price.</p>
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
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="mr-2 text-foreground/80">What we need:</span>
          {NEED.map((n) => (
            <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 px-3 py-1.5">
              <Check className="h-3.5 w-3.5 text-primary" /> {n}
            </span>
          ))}
        </Reveal>
        <Reveal className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="mr-2 text-foreground/80">We don't buy:</span>
          {NOT.map((n) => (
            <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5">
              <X className="h-3.5 w-3.5" /> {n}
            </span>
          ))}
        </Reveal>
      </div>
    </section>

    {/* Why partner */}
    <section className="container max-w-6xl py-20">
      <SplitHeadline text={"Why sell\n*through us.*"} className="text-4xl md:text-6xl font-medium leading-[0.95]" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY.map((w, i) => (
          <Reveal key={w.t} delay={i * 0.07}>
            <div onMouseMove={spotlightMove} className="spotlight h-full rounded-[24px] border border-foreground/10 bg-card p-7">
              <h3 className="text-xl font-medium">{w.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
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
          <Eyebrow>Become a supply partner</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-[0.95]">
            What do you <span className="serif italic text-primary">make?</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">Share the basics. Our team will call you within one working day to plan a sample.</p>
        </div>
        <div className="md:col-span-8">
          <LeadForm
            type="Sell Granules"
            submitLabel="Send details"
            whatsappText={WA}
            successTitle="Thanks! We're on it."
            successBody="Our sourcing team will call you to plan a sample. Keep your latest test report handy."
            fields={[
              { name: "name", label: "Your name", type: "text", required: true, half: true },
              { name: "company", label: "Company name", type: "text", required: true, half: true },
              { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true },
              { name: "city", label: "Plant location", type: "text", required: true, half: true },
              { name: "grade", label: "Grade", type: "chips", options: ["Blow moulding", "Injection moulding", "Pipe / film", "Other"], multi: true, required: true },
              { name: "colour", label: "Colour", type: "chips", options: ["Blue", "Natural", "White", "Black", "Mixed / other"], multi: true },
              { name: "volume", label: "Quantity per month", type: "chips", options: ["< 10 t", "10–25 t", "25–50 t", "50 t +"], required: true },
              { name: "message", label: "MFI, density or anything else", type: "textarea" },
            ]}
          />
        </div>
      </div>
    </section>
  </Page>
);

export default SellGranules;
