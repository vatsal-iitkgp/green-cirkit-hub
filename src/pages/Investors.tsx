import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove, EASE } from "@/components/site/motion";
import { LeadForm } from "@/components/site/Form";
import { Counter } from "@/components/site/visuals";
import { MarketFunnel, Roadmap, Team, ImpactGoals } from "@/components/site/story";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const SNAPSHOT = [
  { l: "Stage", v: "Pre-seed" },
  { l: "Founded", v: "2025" },
  { l: "HQ", v: "Noida, UP" },
  { l: "Focus", v: "Recycled HDPE" },
];

const THESIS = [
  {
    k: "01",
    t: "Demand is mandated",
    d: "Brands must put a rising share of recycled plastic into rigid packaging: 30% in FY 2025–26, rising every year to 60% by FY 2028–29. That demand doesn't depend on a trend. It's the law.",
  },
  {
    k: "02",
    t: "Supply can't be trusted",
    d: "Most recycled granules in India come from the informal sector, with no test report, no traceability and quality that swings batch to batch. Brands can't defend that in an audit.",
  },
  {
    k: "03",
    t: "North India is open",
    d: "The organised players are concentrated in the South and West. North India has the brands, the waste and state support, but no trusted recycled-HDPE supplier at scale.",
  },
];

const MODEL = [
  { t: "Tested, ready-to-run grades", d: "We sell recycled HDPE that is lab-tested and blended to each customer's spec. Quality is the product, and it earns a premium over untested material.", tag: "Today" },
  { t: "Own conversion margin", d: "With our own plant, we capture the full spread from post-consumer waste to finished granule, and supply bottle-grade material that brands can certify.", tag: "Next" },
  { t: "Traceability & compliance", d: "Lot-level data that lets brands prove where their recycled content came from. A service layer on top of every tonne we supply.", tag: "Later" },
];

const AUDIENCE = {
  vc: {
    label: "For VCs",
    head: "A category leader, built on regulation.",
    pts: [
      { t: "Regulation-backed demand", d: "Recycled-content targets step up every year to FY 2028–29. The market grows whether or not consumers care." },
      { t: "Capital-efficient start", d: "We prove demand with partner supply and our own lab before we spend on plant." },
      { t: "Clear expansion path", d: "More capacity, brand contracts, exports, then more polymers and an asset-light partner network." },
      { t: "Trust as the moat", d: "Tested, traceable supply is hard to copy for the informal sector, and it's what brands pay for." },
    ],
  },
  bank: {
    label: "For banks & lenders",
    head: "Real assets. Mandated demand. Phased risk.",
    pts: [
      { t: "Demand backed by law", d: "Brands are legally required to buy recycled content, and the requirement rises every year." },
      { t: "Asset-backed project", d: "Plant and machinery for our first facility, with equipment quotes already in hand." },
      { t: "Phased capex", d: "We build in stages and add capacity only as orders come in." },
      { t: "Working-capital discipline", d: "Minimal credit to customers, customer-paid freight, and supply from established partner manufacturers." },
    ],
  },
} as const;

const Audience = () => {
  const [a, setA] = useState<keyof typeof AUDIENCE>("vc");
  const c = AUDIENCE[a];
  return (
    <section className="container max-w-6xl py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <Reveal>
            <Eyebrow>Why it works</Eyebrow>
          </Reveal>
          <SplitHeadline text={"Two ways to\n*build with us.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
        </div>
        <div className="inline-flex self-start rounded-full border border-foreground/15 p-1 text-sm">
          {(Object.keys(AUDIENCE) as (keyof typeof AUDIENCE)[]).map((k) => (
            <button
              key={k}
              onClick={() => setA(k)}
              className={cn("rounded-full px-5 py-2.5 transition-colors", a === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              {AUDIENCE[k].label}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={a} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }}>
          <h3 className="mt-12 text-2xl md:text-3xl font-medium">{c.head}</h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {c.pts.map((p, i) => (
              <div key={p.t} onMouseMove={spotlightMove} className="spotlight rounded-[24px] border border-foreground/10 bg-card p-7 md:p-8">
                <p className="font-mono text-xs text-primary">0{i + 1}</p>
                <h4 className="mt-4 text-xl md:text-2xl font-medium">{p.t}</h4>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

const Investors = () => (
  <Page>
    {/* Hero */}
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-16">
      <div className="absolute inset-0 aurora opacity-50" />
      <div className="relative container max-w-6xl">
        <Eyebrow>Our vision</Eyebrow>
        <SplitHeadline
          as="h1"
          animateOnMount
          delay={0.2}
          text={"Building India's\n*recycled-plastic*\ninfrastructure."}
          className="mt-6 text-[clamp(2.8rem,8vw,6.8rem)] font-medium leading-[0.92]"
        />
        <Reveal delay={0.6}>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            The law now requires brands to use recycled plastic, and the share rises every year. We're building the trusted, traceable supply they need, starting with recycled HDPE in North India.
          </p>
        </Reveal>
        <Reveal delay={0.75} className="mt-10 flex flex-wrap gap-3">
          <Magnetic>
            <Btn href="#deck" size="lg">
              Talk to the founders
            </Btn>
          </Magnetic>
          <Btn to="/about" size="lg" variant="ghost">
            Meet the team
          </Btn>
        </Reveal>
        <Reveal delay={0.9} className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t border-foreground/10">
          {SNAPSHOT.map((s, i) => (
            <div key={s.l} className={cn("py-6 pr-4", i && "md:border-l md:pl-6 border-foreground/10", i === 2 && "border-t md:border-t-0", i === 3 && "border-t md:border-t-0 border-l pl-4")}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{s.l}</p>
              <p className="mt-2 text-2xl md:text-3xl font-medium">{s.v}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>

    {/* Thesis */}
    <section className="container max-w-6xl py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow>The thesis</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-medium text-[clamp(5rem,12vw,9rem)] leading-[0.85] tracking-[-0.06em]">
              <Counter to={60} suffix="%" />
            </p>
            <p className="mt-3 text-muted-foreground max-w-xs">recycled content required in rigid plastic packaging by FY 2028–29, up from 30% today.</p>
          </Reveal>
        </div>
        <div className="md:col-span-8 border-t border-foreground/10">
          {THESIS.map((t, i) => (
            <Reveal key={t.k} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-foreground/10 py-8">
              <span className="font-mono text-xs text-primary pt-2">{t.k}</span>
              <div>
                <h3 className="text-2xl md:text-3xl font-medium">{t.t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <MarketFunnel />

    {/* Business model */}
    <section className="container max-w-6xl py-24 md:py-32">
      <Reveal>
        <Eyebrow>Business model</Eyebrow>
      </Reveal>
      <SplitHeadline text={"How we\n*make money.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {MODEL.map((m, i) => (
          <Reveal key={m.t} delay={i * 0.08}>
            <div onMouseMove={spotlightMove} className="spotlight h-full rounded-[24px] border border-foreground/10 bg-card p-8">
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">{m.tag}</span>
              <h3 className="mt-6 text-2xl font-medium">{m.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{m.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6 text-sm text-muted-foreground">Unit economics, projections and the use of funds are in the investor deck.</Reveal>
    </section>

    <Roadmap title={"The plan,\n*phase by phase.*"} />
    <Audience />
    <ImpactGoals />
    <Team />

    {/* Deck form */}
    <section id="deck" className="container max-w-6xl py-24 md:py-32 scroll-mt-20">
      <div className="grid md:grid-cols-12 gap-12 rounded-[32px] border border-foreground/10 bg-card p-8 md:p-14">
        <div className="md:col-span-4">
          <Eyebrow>Invest or partner</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-[0.95]">
            Let's <span className="serif italic text-primary">talk.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Investors, lenders and strategic partners: tell us who you are. The founders will share our deck and set up a call, usually within one working day.
          </p>
          <div className="mt-10 space-y-1 text-sm text-muted-foreground">
            <p className="text-foreground">{SITE.legal}</p>
            <p>CIN {SITE.cin}</p>
            <p>GSTIN {SITE.gstin}</p>
            <p>{SITE.office}</p>
          </div>
        </div>
        <div className="md:col-span-8">
          <LeadForm
            type="Investor"
            submitLabel="Request the deck"
            whatsappText="Hi GreenCirkit, I'm an investor and would like to see your deck."
            successTitle="Thank you."
            successBody="The founders will be in touch shortly with the deck and a few times to talk."
            fields={[
              { name: "name", label: "Your name", type: "text", required: true, half: true },
              { name: "company", label: "Fund / bank / firm", type: "text", required: true, half: true },
              { name: "email", label: "Work email", type: "email", required: true, half: true },
              { name: "phone", label: "Phone", type: "tel", half: true },
              { name: "investor", label: "You are", type: "chips", options: ["VC", "Angel", "Family office", "Bank", "NBFC", "Other"], required: true },
              { name: "interest", label: "Interested in", type: "chips", options: ["Equity", "Project / term loan", "Working capital", "Just exploring"], multi: true },
              { name: "message", label: "Anything you'd like us to cover", type: "textarea" },
            ]}
          />
        </div>
      </div>
    </section>
  </Page>
);

export default Investors;
