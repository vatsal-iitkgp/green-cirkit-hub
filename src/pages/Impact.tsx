import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Check, Link2, Info } from "lucide-react";
import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Reveal, SplitHeadline } from "@/components/site/motion";
import { isEmail, submitLead } from "@/lib/site";
import { VIRGIN_HDPE_BM_DELHI, RECYCLED_REF } from "@/content/prices";
import { cn } from "@/lib/utils";

// Factors (kept conservative and cited on the page)
const VIRGIN_CO2 = 1.92; // kg CO2e per kg virgin HDPE (c7-consult LCA for ALPLA)
const RECYCLED_CO2 = 0.28; // kg CO2e per kg rHDPE (upper of the two plants in the same LCA)
const CO2_SAVED_PER_KG = VIRGIN_CO2 - RECYCLED_CO2; // 1.64
const BOTTLE_G = 50; // assumed weight of a 1 L HDPE bottle, grams
const TARGETS = [
  { y: "FY26", p: 30 },
  { y: "FY27", p: 40 },
  { y: "FY28", p: 50 },
  { y: "FY29", p: 60 },
];

const fmt = (n: number, d = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: d, minimumFractionDigits: d });
const inr = (n: number) => {
  if (n >= 1e7) return `₹${fmt(n / 1e7, 2)} crore`;
  if (n >= 1e5) return `₹${fmt(n / 1e5, 1)} lakh`;
  return `₹${fmt(n)}`;
};

/** Smoothly tweens to the latest value. */
const Live = ({ value, format }: { value: number; format: (n: number) => string }) => {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => format(v));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
};

const Impact = () => {
  const [params, setParams] = useSearchParams();
  const [tonnes, setTonnes] = useState(() => Number(params.get("t")) || 25);
  const [period, setPeriod] = useState<"month" | "year">(() => (params.get("p") === "year" ? "year" : "month"));
  const [target, setTarget] = useState(1);
  const [virgin, setVirgin] = useState(VIRGIN_HDPE_BM_DELHI[VIRGIN_HDPE_BM_DELHI.length - 1].price);
  const [recycled, setRecycled] = useState((RECYCLED_REF[0].low + RECYCLED_REF[0].high) / 2);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<"idle" | "sending" | "done" | "error">("idle");

  const yearly = period === "month" ? tonnes * 12 : tonnes;
  const r = useMemo(() => {
    const kg = yearly * 1000;
    return {
      co2: (kg * CO2_SAVED_PER_KG) / 1000, // tonnes
      bottles: (kg * 1000) / BOTTLE_G,
      packaging: yearly / (TARGETS[target].p / 100),
      savings: kg * Math.max(0, virgin - recycled),
      cars: (kg * CO2_SAVED_PER_KG) / 1000 / 4.6, // passenger cars driven for a year (US EPA avg 4.6 t)
    };
  }, [yearly, target, virgin, recycled]);

  const max = period === "month" ? 500 : 6000;
  const pct = Math.min(100, (tonnes / max) * 100);

  const share = async () => {
    const p = new URLSearchParams({ t: String(tonnes), p: period });
    setParams(p, { replace: true });
    const url = `${window.location.origin}/impact?${p.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const sendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) return setSent("error");
    setSent("sending");
    const ok = await submitLead(
      "Impact Report",
      {
        email,
        name: email,
        volume: `${tonnes} t/${period}`,
        co2_avoided_t_per_year: fmt(r.co2, 1),
        bottles_per_year: fmt(r.bottles),
        packaging_covered_t: `${fmt(r.packaging)} at ${TARGETS[target].p}% (${TARGETS[target].y})`,
        savings_per_year: inr(r.savings),
      },
      "Impact calculator",
    );
    setSent(ok ? "done" : "error");
  };

  // bottle wall: 1 icon = N bottles
  const perIcon = r.bottles > 2e7 ? 1e6 : r.bottles > 2e6 ? 1e5 : 1e4;
  const icons = Math.min(120, Math.max(1, Math.round(r.bottles / perIcon)));

  return (
    <Page>
      <section className="container max-w-6xl pt-36 md:pt-44 pb-12">
        <Eyebrow>Impact calculator</Eyebrow>
        <SplitHeadline
          as="h1"
          animateOnMount
          delay={0.2}
          text={"What switching to\nrHDPE *really* does."}
          className="mt-6 text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.92]"
        />
        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Slide in your volume. See the carbon, the bottles, your EPR coverage, and the money.</p>
        </Reveal>
      </section>

      <section className="container max-w-6xl pb-16">
        <div className="grid gap-5 lg:grid-cols-12">
          {/* Controls */}
          <div className="lg:col-span-5 rounded-[28px] border border-foreground/10 bg-card p-7 md:p-10 lg:sticky lg:top-24 self-start">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Your rHDPE volume</p>
              <div className="flex rounded-full border border-foreground/15 p-1 text-xs">
                {(["month", "year"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setTonnes((t) => (p === "year" && period === "month" ? t * 12 : p === "month" && period === "year" ? Math.max(1, Math.round(t / 12)) : t));
                    }}
                    className={cn("rounded-full px-3 py-1 transition-colors", p === period ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
                  >
                    per {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <input
                type="number"
                min={1}
                value={tonnes}
                onChange={(e) => setTonnes(Math.max(0, Number(e.target.value)))}
                style={{ width: `${Math.max(2, String(tonnes).length) + 0.4}ch` }}
                className="bg-transparent text-7xl font-medium tracking-[-0.05em] outline-none tabular-nums"
                aria-label="Tonnes"
              />
              <span className="text-xl text-muted-foreground">tonnes</span>
            </div>
            <div className="relative mt-6">
              <div className="h-2 rounded-full bg-foreground/10" />
              <div className="absolute inset-y-0 left-0 h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
              <input
                type="range"
                min={1}
                max={max}
                value={Math.min(tonnes, max)}
                onChange={(e) => setTonnes(Number(e.target.value))}
                className="absolute inset-0 -top-2 h-6 w-full cursor-pointer opacity-0"
                aria-label="Volume slider"
              />
              <div
                className="pointer-events-none absolute -top-[7px] h-5 w-5 -ml-2.5 rounded-full border-4 border-background bg-primary shadow-[0_0_0_6px_hsl(var(--primary)/0.2)]"
                style={{ left: `${pct}%` }}
              />
            </div>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">EPR recycled-content target</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {TARGETS.map((t, i) => (
                <button
                  key={t.y}
                  onClick={() => setTarget(i)}
                  className={cn(
                    "rounded-2xl border py-3 text-center transition-colors",
                    i === target ? "border-primary bg-primary/10" : "border-foreground/10 hover:border-foreground/30",
                  )}
                >
                  <span className="block text-lg font-medium">{t.p}%</span>
                  <span className="block text-[11px] text-muted-foreground">{t.y}</span>
                </button>
              ))}
            </div>

            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Prices (₹/kg, editable)</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { l: "Virgin HDPE", v: virgin, set: setVirgin },
                { l: "rHDPE", v: recycled, set: setRecycled },
              ].map((f) => (
                <label key={f.l} className="rounded-2xl border border-foreground/10 px-4 py-3 focus-within:border-primary/60">
                  <span className="block text-[11px] text-muted-foreground">{f.l}</span>
                  <span className="flex items-baseline gap-1">
                    ₹
                    <input
                      type="number"
                      value={f.v}
                      onChange={(e) => f.set(Number(e.target.value))}
                      className="w-full bg-transparent text-xl font-medium outline-none tabular-nums"
                    />
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Defaults: Delhi market levels from our price tracker.</p>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2 content-start">
            <div className="forest sm:col-span-2 rounded-[28px] border border-primary/20 p-7 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">CO₂e avoided per year</p>
              <p className="mt-3 text-6xl md:text-8xl font-medium tracking-[-0.05em]">
                <Live value={r.co2} format={(v) => fmt(v, v < 100 ? 1 : 0)} />
                <span className="ml-3 text-2xl md:text-3xl text-muted-foreground font-normal tracking-normal">tonnes</span>
              </p>
              <p className="mt-4 text-muted-foreground">
                About the yearly emissions of <span className="text-foreground"><Live value={r.cars} format={(v) => fmt(v)} /> cars</span>.
              </p>
            </div>

            <div className="rounded-[28px] border border-foreground/10 bg-card p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Bottles back in the loop</p>
              <p className="mt-3 text-4xl md:text-5xl font-medium tracking-tight">
                <Live value={r.bottles} format={(v) => (v >= 1e7 ? `${fmt(v / 1e7, 2)} crore` : v >= 1e5 ? `${fmt(v / 1e5, 1)} lakh` : fmt(v))} />
              </p>
              <div className="mt-5 flex flex-wrap gap-[3px]" aria-hidden>
                {Array.from({ length: icons }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.004 }}
                    className="h-3.5 w-2 rounded-[2px] rounded-t-[4px] bg-primary/80"
                  />
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">1 mark ≈ {fmt(perIcon)} bottles · per year</p>
            </div>

            <div className="rounded-[28px] border border-foreground/10 bg-card p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Rigid packaging covered</p>
              <p className="mt-3 text-4xl md:text-5xl font-medium tracking-tight">
                <Live value={r.packaging} format={(v) => fmt(v)} />
                <span className="ml-2 text-lg text-muted-foreground font-normal tracking-normal">t/yr</span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                of Category I packaging can meet the {TARGETS[target].y} {TARGETS[target].p}% recycled-content rule with this volume.
              </p>
            </div>

            <div className="sm:col-span-2 rounded-[28px] border border-foreground/10 bg-card p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Resin cost difference per year</p>
                <p className="mt-3 text-4xl md:text-5xl font-medium tracking-tight">
                  <Live value={r.savings} format={(v) => inr(v)} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">at ₹{fmt(virgin - recycled, 1)}/kg below virgin</p>
              </div>
              <Btn to="/granules#sample">Request a sample</Btn>
            </div>

            {/* Share / email */}
            <div className="sm:col-span-2 rounded-[28px] border border-foreground/10 bg-card p-7">
              {sent === "done" ? (
                <p className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  Done. Our team will send your impact summary.
                </p>
              ) : (
                <form onSubmit={sendReport} noValidate className="flex flex-col xl:flex-row xl:items-center gap-3">
                  <p className="text-sm shrink-0">Email me this report</p>
                  <div className="flex flex-1 gap-3 min-w-0">
                  <div className={cn("flex flex-1 min-w-0 items-center gap-2 rounded-full border bg-foreground/[0.04] pl-5 pr-1.5 py-1.5", sent === "error" ? "border-destructive/60" : "border-foreground/15")}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setSent("idle");
                      }}
                      placeholder="you@company.com"
                      className="flex-1 min-w-0 bg-transparent text-sm outline-none"
                    />
                    <button type="submit" className="h-9 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground">
                      {sent === "sending" ? "…" : "Send"}
                    </button>
                  </div>
                  <button type="button" onClick={share} className="inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full border border-foreground/15 px-4 h-11 text-sm hover:border-primary">
                    {copied ? <Check className="h-4 w-4 text-primary" /> : <Link2 className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy link"}
                  </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-foreground/10 p-6 text-xs text-muted-foreground leading-relaxed flex gap-3">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            <span className="text-foreground">How we calculate.</span> CO₂e: virgin HDPE 1.92 kg CO₂e/kg vs recycled 0.28 kg CO₂e/kg, from an independent life-cycle
            assessment by c7-consult for ALPLA (European plants), so the saving here is 1.64 kg per kg. Indian grid and logistics will differ; treat this as indicative. Car
            equivalent: 4.6 t CO₂ per passenger car per year (US EPA). Bottles: assumes a 1 L HDPE bottle weighs about 50 g. EPR coverage: your annual rHDPE volume divided
            by the minimum recycled-content share for Category I rigid packaging under the Plastic Waste Management (Amendment) Rules, 2026. Prices are indicative and
            editable.
          </p>
        </div>
      </section>
    </Page>
  );
};

export default Impact;
