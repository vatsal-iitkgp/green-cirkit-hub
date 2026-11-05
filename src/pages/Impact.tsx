import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { Check, Link2, Info, Minus, Plus, MapPin } from "lucide-react";
import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Reveal, SplitHeadline } from "@/components/site/motion";
import { isEmail, submitLead } from "@/lib/site";
import { VIRGIN_HDPE_BM_DELHI, RECYCLED_REF } from "@/content/prices";
import { cn } from "@/lib/utils";

/* ---------------- factors (stated on the page) ---------------- */
const CO2_SAVED_PER_KG = 1.92 - 0.28; // virgin vs recycled HDPE, kg CO2e per kg (c7-consult LCA for ALPLA)
const BOTTLE_G = 50; // a 1 L HDPE detergent bottle, grams
const BOTTLE_H_M = 0.25; // its height, metres
const TREE_KG_YR = 22; // CO2 a mature tree absorbs in a year, kg (commonly used estimate)
const CAR_T_YR = 4.6; // CO2 from a typical passenger car in a year, tonnes (US EPA)
const TRUCK_T = 10; // a 10-tonne truckload
const DELHI_MUMBAI_KM = 1400;

const MODES = {
  month: { step: 25, min: 25, max: 1000, presets: [25, 50, 100, 250, 500], def: 50 },
  year: { step: 100, min: 100, max: 12000, presets: [300, 600, 1200, 3000, 6000], def: 600 },
} as const;
type Mode = keyof typeof MODES;

const fmt = (n: number, d = 0) => n.toLocaleString("en-IN", { maximumFractionDigits: d, minimumFractionDigits: d });
const trim = (n: number, d: number) => n.toLocaleString("en-IN", { maximumFractionDigits: d });
const big = (n: number) => {
  if (n >= 1e7) return `${trim(n / 1e7, n >= 1e8 ? 1 : 2)} crore`;
  if (n >= 1e5) return `${trim(n / 1e5, 1)} lakh`;
  return fmt(n);
};
const inr = (n: number) => `₹${big(n)}`;
const snap = (v: number, m: Mode) => {
  const { step, min, max } = MODES[m];
  return Math.min(max, Math.max(min, Math.round(v / step) * step));
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
  const [mode, setMode] = useState<Mode>(() => (params.get("p") === "year" ? "year" : "month"));
  const [tonnes, setTonnes] = useState(() => snap(Number(params.get("t")) || MODES[mode].def, mode));
  const [draft, setDraft] = useState<string | null>(null);
  const [virgin, setVirgin] = useState(String(VIRGIN_HDPE_BM_DELHI[VIRGIN_HDPE_BM_DELHI.length - 1].price));
  const [recycled, setRecycled] = useState(String((RECYCLED_REF[0].low + RECYCLED_REF[0].high) / 2));
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<"idle" | "sending" | "done" | "error">("idle");

  const cfg = MODES[mode];
  const yearly = mode === "month" ? tonnes * 12 : tonnes;
  const v = Number(virgin) || 0;
  const r = Number(recycled) || 0;

  const x = useMemo(() => {
    const kg = yearly * 1000;
    const bottles = (kg * 1000) / BOTTLE_G;
    const km = (bottles * BOTTLE_H_M) / 1000;
    const co2 = (kg * CO2_SAVED_PER_KG) / 1000;
    return {
      bottles,
      km,
      trips: km / DELHI_MUMBAI_KM,
      co2,
      trees: (co2 * 1000) / TREE_KG_YR,
      cars: co2 / CAR_T_YR,
      trucks: yearly / TRUCK_T,
      savings: kg * Math.max(0, v - r),
    };
  }, [yearly, v, r]);

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setTonnes(snap(m === "year" ? tonnes * 12 : tonnes / 12, m));
    setMode(m);
  };
  const stepBy = (d: number) => setTonnes((t) => snap(t + d * cfg.step, mode));
  const pct = ((tonnes - cfg.min) / (cfg.max - cfg.min)) * 100;

  const share = async () => {
    const p = new URLSearchParams({ t: String(tonnes), p: mode });
    setParams(p, { replace: true });
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/impact?${p.toString()}`);
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
        volume: `${fmt(tonnes)} t/${mode}`,
        bottles_per_year: big(x.bottles),
        co2_avoided_t: fmt(x.co2),
        trees_equivalent: fmt(x.trees),
        truckloads: fmt(x.trucks),
        savings_per_year: inr(x.savings),
      },
      "Impact calculator",
    );
    setSent(ok ? "done" : "error");
  };

  return (
    <Page>
      <section className="container max-w-6xl pt-36 md:pt-44 pb-12">
        <Eyebrow>Impact calculator</Eyebrow>
        <SplitHeadline as="h1" animateOnMount delay={0.2} text={"Your impact,\n*in numbers.*"} className="mt-6 text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.92]" />
        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Pick how much recycled HDPE you'd use. See what it means in bottles, trees, trucks and rupees.</p>
        </Reveal>
      </section>

      <section className="container max-w-6xl pb-16">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-12">
          {/* ---------------- Controls ---------------- */}
          <div className="min-w-0 lg:col-span-5 rounded-[28px] border border-foreground/10 bg-card p-7 md:p-9 lg:sticky lg:top-24 self-start">
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Your rHDPE volume</p>
              <div className="flex rounded-full border border-foreground/15 p-1 text-xs">
                {(["month", "year"] as const).map((m) => (
                  <button key={m} onClick={() => switchMode(m)} className={cn("rounded-full px-3 py-1 transition-colors", m === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
                    per {m}
                  </button>
                ))}
              </div>
            </div>

            {/* stepper */}
            <div className="mt-7 flex items-center gap-3">
              <button
                onClick={() => stepBy(-1)}
                aria-label={`Decrease by ${cfg.step} tonnes`}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-foreground/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Minus className="h-5 w-5" />
              </button>
              <div className="min-w-0 flex-1 text-center">
                <input
                  value={draft ?? fmt(tonnes)}
                  onChange={(e) => setDraft(e.target.value.replace(/[^\d]/g, ""))}
                  onFocus={(e) => {
                    setDraft(String(tonnes));
                    e.target.select();
                  }}
                  onBlur={() => {
                    if (draft !== null) setTonnes(snap(Number(draft) || cfg.min, mode));
                    setDraft(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                  inputMode="numeric"
                  size={1}
                  aria-label="Tonnes"
                  className="w-full bg-transparent text-center font-medium tracking-[-0.05em] tabular-nums outline-none text-[clamp(2.6rem,5.5vw,4.25rem)] leading-none"
                />
                <p className="mt-2 text-sm text-muted-foreground">tonnes per {mode}</p>
              </div>
              <button
                onClick={() => stepBy(1)}
                aria-label={`Increase by ${cfg.step} tonnes`}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-foreground/15 hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* slider */}
            <div className="relative mt-7">
              <div className="h-2 rounded-full bg-foreground/10" />
              <div className="absolute inset-y-0 left-0 h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
              <input
                type="range"
                min={cfg.min}
                max={cfg.max}
                step={cfg.step}
                value={tonnes}
                onChange={(e) => setTonnes(Number(e.target.value))}
                className="absolute inset-0 -top-2 h-6 w-full cursor-pointer opacity-0"
                aria-label="Volume slider"
              />
              <div className="pointer-events-none absolute -top-[7px] h-5 w-5 -ml-2.5 rounded-full border-4 border-background bg-primary shadow-[0_0_0_6px_hsl(var(--primary)/0.2)]" style={{ left: `${pct}%` }} />
              <div className="mt-3 flex justify-between text-[11px] text-muted-foreground tabular-nums">
                <span>{fmt(cfg.min)} t</span>
                <span>steps of {cfg.step} t</span>
                <span>{fmt(cfg.max)} t</span>
              </div>
            </div>

            {/* presets */}
            <div className="mt-5 flex flex-wrap gap-2">
              {cfg.presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setTonnes(p)}
                  className={cn("rounded-full border px-3.5 py-1.5 text-sm tabular-nums transition-colors", p === tonnes ? "border-primary bg-primary text-primary-foreground" : "border-foreground/15 hover:border-foreground/40")}
                >
                  {fmt(p)} t
                </button>
              ))}
            </div>

            <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Prices, ₹/kg (edit if yours differ)</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { l: "Virgin HDPE", v: virgin, set: setVirgin },
                { l: "rHDPE", v: recycled, set: setRecycled },
              ].map((f) => (
                <label key={f.l} className="rounded-2xl border border-foreground/10 px-4 py-3 focus-within:border-primary/60">
                  <span className="block text-[11px] text-muted-foreground">{f.l}</span>
                  <span className="flex items-baseline gap-1 text-xl font-medium">
                    ₹
                    <input
                      value={f.v}
                      onChange={(e) => f.set(e.target.value.replace(/[^\d.]/g, ""))}
                      inputMode="decimal"
                      size={1}
                      className="w-full bg-transparent outline-none tabular-nums"
                    />
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ---------------- Results ---------------- */}
          <div className="min-w-0 lg:col-span-7 grid grid-cols-[minmax(0,1fr)] gap-5 content-start">
            {/* Bottles + Delhi → Mumbai */}
            <div className="forest rounded-[28px] border border-primary/20 p-7 md:p-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">Every year, you put back in the loop</p>
              <p className="mt-3 text-5xl md:text-7xl font-medium tracking-[-0.05em]">
                <Live value={x.bottles} format={big} />
              </p>
              <p className="mt-1 text-lg text-foreground/80">detergent bottles</p>

              <div className="mt-8">
                <p className="text-sm text-muted-foreground">
                  Laid end to end, that's <span className="text-foreground font-medium"><Live value={x.km} format={(n) => `${fmt(n)} km`} /></span>
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-sm"><MapPin className="h-4 w-4 text-primary" />Delhi</span>
                  <div className="relative h-2 flex-1 rounded-full bg-foreground/10 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      animate={{ width: `${Math.min(100, x.trips * 100)}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="flex items-center gap-1.5 text-sm">Mumbai<MapPin className="h-4 w-4 text-primary" /></span>
                </div>
                <p className="mt-4 text-2xl md:text-3xl font-medium">
                  {x.trips >= 1 ? (
                    <>
                      Delhi to Mumbai, <span className="serif italic text-primary"><Live value={x.trips} format={(n) => `${fmt(n, 1)}×`} /></span>
                    </>
                  ) : (
                    <>
                      <span className="serif italic text-primary"><Live value={x.trips * 100} format={(n) => `${fmt(n)}%`} /></span> of the way from Delhi to Mumbai
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {/* Trees */}
              <div className="rounded-[28px] border border-foreground/10 bg-card p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Carbon you avoid</p>
                <p className="mt-3 text-4xl font-medium tracking-tight">
                  <Live value={x.co2} format={(n) => fmt(n)} />
                  <span className="ml-2 text-lg text-muted-foreground font-normal tracking-normal">t CO₂</span>
                </p>
                <p className="mt-3 text-foreground/80">
                  = what <span className="text-foreground font-medium"><Live value={x.trees} format={big} /> trees</span> absorb in a year
                </p>
              </div>

              {/* Trucks */}
              <div className="rounded-[28px] border border-foreground/10 bg-card p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Plastic kept out of landfill</p>
                <p className="mt-3 text-4xl font-medium tracking-tight">
                  <Live value={yearly} format={(n) => fmt(n)} />
                  <span className="ml-2 text-lg text-muted-foreground font-normal tracking-normal">tonnes</span>
                </p>
                <p className="mt-3 text-foreground/80">
                  = <span className="text-foreground font-medium"><Live value={x.trucks} format={(n) => fmt(n)} /> full trucks</span> of waste, every year
                </p>
              </div>

              {/* Cars */}
              <div className="rounded-[28px] border border-foreground/10 bg-card p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Same as taking off the road</p>
                <p className="mt-3 text-4xl font-medium tracking-tight">
                  <Live value={x.cars} format={(n) => fmt(n)} />
                  <span className="ml-2 text-lg text-muted-foreground font-normal tracking-normal">cars</span>
                </p>
                <p className="mt-3 text-foreground/80">for a whole year</p>
              </div>

            </div>

            {/* Money */}
            <div className="rounded-[28px] border border-foreground/10 bg-card p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">You save on resin</p>
                <p className="mt-3 text-4xl md:text-5xl font-medium tracking-tight">
                  <Live value={x.savings} format={inr} />
                  <span className="ml-2 text-lg text-muted-foreground font-normal tracking-normal">a year</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  ≈ <Live value={x.savings / 12} format={inr} /> a month, at ₹{fmt(Math.max(0, v - r), 1)}/kg below virgin
                </p>
              </div>
              <Btn to="/granules#sample">Request a sample</Btn>
            </div>

            {/* Share / email */}
            <div className="rounded-[28px] border border-foreground/10 bg-card p-7">
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
            <span className="text-foreground">How we calculate.</span> Bottles: a 1 L HDPE detergent bottle weighs about {BOTTLE_G} g and stands about {BOTTLE_H_M * 100} cm tall;
            Delhi to Mumbai taken as {fmt(DELHI_MUMBAI_KM)} km by road. Carbon: virgin HDPE 1.92 kg CO₂e/kg vs recycled 0.28 kg CO₂e/kg (c7-consult life-cycle assessment for
            ALPLA, European plants), so 1.64 kg saved per kg; Indian figures will differ, so treat this as indicative. Trees: a mature tree absorbs roughly {TREE_KG_YR} kg CO₂ a
            year (common estimate). Cars: {CAR_T_YR} t CO₂ per passenger car per year (US EPA). Trucks: {TRUCK_T} t per load. Prices are indicative and editable.
          </p>
        </div>
      </section>
    </Page>
  );
};

export default Impact;
