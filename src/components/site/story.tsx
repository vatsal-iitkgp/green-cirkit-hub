import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, Reveal, SplitHeadline, spotlightMove, EASE } from "./motion";
import { Counter } from "./visuals";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Roadmap: click a phase to open it                                   */
/* ------------------------------------------------------------------ */
export const PHASES = [
  {
    k: "01",
    when: "Today",
    t: "Supply & lab",
    head: "Prove demand, asset-light.",
    d: "We source recycled HDPE from vetted partner manufacturers, test every lot in our own QC lab, and blend it into ready-to-run grades for blow moulders.",
    pts: ["Partner manufacturer network", "In-house QC lab", "Ready-to-run blended grades", "First customers and repeat orders"],
  },
  {
    k: "02",
    when: "Next",
    t: "Own plant",
    head: "Our first facility in North India.",
    d: "Sorting, washing and extrusion under one roof, built to turn post-consumer HDPE bottles into consistent, traceable granules.",
    pts: ["~2,500 tonnes a year", "Bottle-to-bottle rHDPE", "Full lot traceability", "Close to North India's brands and waste"],
  },
  {
    k: "03",
    when: "Then",
    t: "Scale",
    head: "Triple capacity. Sign brands.",
    d: "Expand to ~7,500 tonnes a year, supply FMCG brands on long-term contracts, and open export markets.",
    pts: ["~7,500 tonnes a year", "Long-term brand contracts", "Exports", "Lower cost per kg at scale"],
  },
  {
    k: "04",
    when: "Long term",
    t: "The circuit",
    head: "Recycling infrastructure, not one plant.",
    d: "An asset-light partner network running on the GreenCirkit brand, quality system and supply chain, extended to more materials over time.",
    pts: ["Partner-owned plants, GC-run quality", "More polymers: PET, PP and beyond", "Traceability as a service", "One trusted name for recycled content"],
  },
];

export const Roadmap = ({ title = "Where we're *going.*" }: { title?: string }) => {
  const [i, setI] = useState(0);
  const p = PHASES[i];
  return (
    <section className="container max-w-6xl py-24 md:py-32">
      <Reveal>
        <Eyebrow>Roadmap</Eyebrow>
      </Reveal>
      <SplitHeadline text={title} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />

      {/* Track */}
      <div className="relative mt-14">
        <div className="absolute left-0 right-0 top-[19px] h-px bg-foreground/10" />
        <motion.div
          className="absolute left-0 top-[19px] h-px bg-primary"
          animate={{ width: `${(i / (PHASES.length - 1)) * 100}%` }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <div className="relative grid grid-cols-4">
          {PHASES.map((ph, n) => (
            <button key={ph.k} onClick={() => setI(n)} className="group flex flex-col items-start text-left">
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border font-mono text-xs transition-all duration-500",
                  n <= i ? "border-primary bg-primary text-primary-foreground" : "border-foreground/20 bg-background text-muted-foreground group-hover:border-primary/60",
                )}
              >
                {ph.k}
              </span>
              <span className="mt-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{ph.when}</span>
              <span className={cn("mt-1 pr-2 text-[13px] leading-tight sm:text-xl md:text-2xl font-medium transition-colors", n === i ? "text-foreground" : "text-foreground/50 group-hover:text-foreground/80")}>
                {ph.t}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div className="mt-10 rounded-[28px] border border-foreground/10 bg-card p-8 md:p-12 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.k}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid gap-10 md:grid-cols-12"
          >
            <div className="md:col-span-7">
              <p className="font-mono text-xs text-primary">
                Phase {p.k} · {p.when}
              </p>
              <h3 className="mt-4 text-3xl md:text-5xl font-medium leading-[1.02] tracking-tight">{p.head}</h3>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
            <ul className="md:col-span-5 divide-y divide-foreground/10 border-y border-foreground/10 self-start">
              {p.pts.map((t) => (
                <li key={t} className="flex items-center gap-3 py-3.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex gap-2">
          <button onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0} className="rounded-full border border-foreground/15 px-4 py-2 text-sm disabled:opacity-30 hover:border-primary">
            ← Back
          </button>
          <button onClick={() => setI((n) => Math.min(PHASES.length - 1, n + 1))} disabled={i === PHASES.length - 1} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-30">
            Next phase →
          </button>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Market funnel: hover / tap a layer                                  */
/* ------------------------------------------------------------------ */
const FUNNEL = [
  { v: "10 Mn t", l: "Plastic waste India generates a year", d: "The starting pool. Most of it is collected and recycled informally, with no quality control or traceability.", w: 100 },
  { v: "₹4,000 Cr", l: "HDPE in rigid packaging", d: "~400,000 tonnes of HDPE used in rigid packaging that falls under recycled-content targets.", w: 78 },
  { v: "₹2,000 Cr", l: "Recycled HDPE the 60% rule will demand", d: "~200,000 tonnes of recycled HDPE brands will need as targets reach 60% by FY 2028–29.", w: 56 },
  { v: "₹500 Cr", l: "Our first market: North India, non-food", d: "~50,000 tonnes: North India's share of non-food rigid packaging, our first market.", w: 36 },
];

export const MarketFunnel = () => {
  const [i, setI] = useState(3);
  return (
    <section className="container max-w-6xl py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow>The market</Eyebrow>
          </Reveal>
          <SplitHeadline text={"A market the law\n*is creating.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-10">
              <p className="text-6xl md:text-7xl font-medium tracking-[-0.05em] text-primary">{FUNNEL[i].v}</p>
              <p className="mt-2 text-lg">{FUNNEL[i].l}</p>
              <p className="mt-3 max-w-sm text-muted-foreground leading-relaxed">{FUNNEL[i].d}</p>
            </motion.div>
          </AnimatePresence>
          <p className="mt-8 text-xs text-muted-foreground">Our estimates, valued at ~₹100/kg. Tap a layer.</p>
        </div>
        <div className="md:col-span-7 flex flex-col items-center gap-2.5">
          {FUNNEL.map((f, n) => (
            <motion.button
              key={f.l}
              onMouseEnter={() => setI(n)}
              onClick={() => setI(n)}
              initial={{ opacity: 0, scaleX: 0.6 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: n * 0.12, ease: EASE }}
              style={{ "--w": `${f.w}%`, "--wm": `${100 - n * 11}%` } as React.CSSProperties}
              className={cn(
                "relative w-[var(--wm)] md:w-[var(--w)] rounded-2xl border px-5 py-5 md:py-6 text-left transition-colors duration-300",
                n === i ? "border-primary bg-primary/15" : "border-foreground/10 bg-card hover:border-primary/40",
              )}
            >
              <p className={cn("text-xl md:text-2xl font-medium tracking-tight", n === i && "text-primary")}>{f.v}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{f.l}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Impact goals: toggle phase                                          */
/* ------------------------------------------------------------------ */
const CO2 = 1.64; // kg CO2e avoided per kg rHDPE vs virgin
export const ImpactGoals = () => {
  const [t, setT] = useState(7500);
  const co2 = Math.round(t * CO2);
  const bottles = Math.round((t * 1000) / 0.05 / 1e6); // 50 g bottles, millions
  const cars = Math.round(co2 / 4.6);
  const items = [
    { v: t, u: "tonnes", l: "of plastic waste back in use, every year" },
    { v: bottles, u: "million", l: "bottles' worth of HDPE recycled a year" },
    { v: co2, u: "t CO₂e", l: "avoided a year versus virgin plastic" },
    { v: cars, u: "cars", l: "taken off the road, in emissions terms" },
  ];
  return (
    <section className="container max-w-6xl py-16 md:py-24">
      <div className="forest relative overflow-hidden rounded-[36px] border border-primary/20 p-8 md:p-14">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Eyebrow>The impact we're building toward</Eyebrow>
            <SplitHeadline text={"Every tonne,\n*counted.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
          </div>
          <div className="inline-flex self-start rounded-full border border-foreground/15 bg-background/40 p-1 text-sm">
            {[
              { v: 2500, l: "Phase 2 plant" },
              { v: 7500, l: "Phase 3 scale" },
            ].map((o) => (
              <button
                key={o.v}
                onClick={() => setT(o.v)}
                className={cn("rounded-full px-4 py-2 transition-colors", t === o.v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
        <div className="relative mt-12 grid grid-cols-2 lg:grid-cols-4 border-t border-foreground/10">
          {items.map((it, n) => (
            <div key={it.l} className={cn("py-8 pr-4", n % 2 && "pl-4 lg:pl-6 border-l border-foreground/10", n === 2 && "lg:pl-6 lg:border-l", n > 1 && "border-t lg:border-t-0 border-foreground/10")}>
              <p className="text-4xl md:text-6xl font-medium tracking-[-0.05em]">
                <Counter key={`${t}-${n}`} to={it.v} />
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">{it.u}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.l}</p>
            </div>
          ))}
        </div>
        <p className="relative mt-4 text-xs text-muted-foreground">
          Targets at full capacity. Assumes ~1.64 kg CO₂e saved per kg of recycled HDPE used instead of virgin, 50 g per bottle, 4.6 t CO₂e per car a year.
        </p>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* Team + advisors                                                     */
/* ------------------------------------------------------------------ */
export const FOUNDERS = [
  { n: "Vatsal Gupta", r: "Co-founder & Director", tag: "IIT Kharagpur", b: "Investment banking at Houlihan Lokey, then a fintech founder's office. Leads strategy, sales and operations." },
  { n: "Anuj Gupta", r: "Co-founder & Director", tag: "IIT Roorkee", b: "30+ years building and running ventures in real estate and industrial development. Leads operations and finance." },
];
export const ADVISORS = [
  { n: "Ranjit Singh", r: "Advisor", tag: "Ex-MD Kalpataru", b: "Former MD of Kalpataru and former COO of Polyplex. Decades of plant building and industrial operations." },
  { n: "Abhinav Ramaria", r: "Advisor", tag: "IIT Kanpur · IIM Lucknow", b: "Strategy and growth advisor to early-stage companies." },
];

const Initials = ({ n }: { n: string }) => (
  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary/15 text-lg font-medium text-primary">
    {n
      .split(" ")
      .map((w) => w[0])
      .join("")}
  </span>
);

export const Team = ({ eyebrow = "The team" }: { eyebrow?: string }) => (
  <section className="container max-w-6xl py-24 md:py-32">
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
    </Reveal>
    <SplitHeadline text={"IIT founders.\n*50+ years of industry behind them.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.98]" />
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      {[...FOUNDERS, ...ADVISORS].map((p, i) => (
        <Reveal key={p.n} delay={(i % 2) * 0.08}>
          <div onMouseMove={spotlightMove} className="spotlight h-full rounded-[24px] border border-foreground/10 bg-card p-7 md:p-8 flex gap-5">
            <Initials n={p.n} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-2xl font-medium">{p.n}</h3>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">{p.tag}</span>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.r}</p>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.b}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
