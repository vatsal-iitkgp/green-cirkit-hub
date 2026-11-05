import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Minus, TrendingUp } from "lucide-react";
import { Page } from "@/components/site/Chrome";
import { Eyebrow, Reveal, SplitHeadline } from "@/components/site/motion";
import { Counter } from "@/components/site/visuals";
import { SubscribeBand } from "@/components/site/Subscribe";
import { PRODUCER_MOVES, RANGE_NOTE, RECYCLED_REF, SOURCES, VIRGIN_HDPE_BM_DELHI, type PricePoint } from "@/content/prices";
import { formatDate } from "@/lib/news";
import { cn } from "@/lib/utils";

type View = "daily" | "weekly" | "monthly";

const weekKey = (d: Date) => {
  const x = new Date(d);
  const day = (x.getDay() + 6) % 7; // Monday start
  x.setDate(x.getDate() - day);
  return x.toISOString().slice(0, 10);
};

function bucket(points: PricePoint[], view: View) {
  if (view === "daily") return points.map((p) => ({ key: p.date, label: formatDate(p.date), price: p.price, n: 1 }));
  const groups = new Map<string, number[]>();
  for (const p of points) {
    const d = new Date(p.date + "T00:00:00");
    const k = view === "weekly" ? weekKey(d) : p.date.slice(0, 7);
    groups.set(k, [...(groups.get(k) || []), p.price]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, arr]) => ({
      key: k,
      label:
        view === "weekly"
          ? `Wk of ${formatDate(k)}`
          : new Date(k + "-01T00:00:00").toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      price: Math.round((arr.reduce((s, v) => s + v, 0) / arr.length) * 10) / 10,
      n: arr.length,
    }));
}

const ChartTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { label: string; price: number; n: number } }[] }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-xl border border-foreground/10 bg-background/95 px-4 py-3 shadow-2xl backdrop-blur">
      <p className="text-xs text-muted-foreground">{p.label}</p>
      <p className="mt-1 text-xl font-medium tabular-nums">
        ₹{p.price.toFixed(1)}
        <span className="text-sm text-muted-foreground font-normal">/kg</span>
      </p>
      {p.n > 1 && <p className="text-[11px] text-muted-foreground">avg of {p.n} quotes</p>}
    </div>
  );
};

const Prices = () => {
  const [view, setView] = useState<View>("daily");
  const [table, setTable] = useState(false);
  const data = useMemo(() => bucket(VIRGIN_HDPE_BM_DELHI, view), [view]);
  const latest = VIRGIN_HDPE_BM_DELHI[VIRGIN_HDPE_BM_DELHI.length - 1];
  const rNat = RECYCLED_REF[0];
  const gap = latest.price - (rNat.low + rNat.high) / 2;
  const min = Math.min(...data.map((d) => d.price));
  const max = Math.max(...data.map((d) => d.price));

  return (
    <Page>
      <section className="container max-w-6xl pt-36 md:pt-44 pb-10">
        <Eyebrow>Price tracker · Delhi</Eyebrow>
        <SplitHeadline
          as="h1"
          animateOnMount
          delay={0.2}
          text={"Virgin HDPE prices,\n*tracked every week.*"}
          className="mt-6 text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.92]"
        />
        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Open-market virgin HDPE blow-moulding prices in Delhi, plus producer list-price moves and where recycled sits against virgin. INR/kg, before GST and freight.
          </p>
        </Reveal>
      </section>

      {/* Stat tiles */}
      <section className="container max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-foreground/10">
          {[
            {
              l: "Virgin HDPE BM · Delhi",
              v: <>₹<Counter to={latest.price} decimals={latest.price % 1 ? 1 : 0} /></>,
              s: `${formatDate(latest.date)} · ${latest.source}`,
            },
            {
              l: "3-month range",
              v: <>₹{RANGE_NOTE.low}–{RANGE_NOTE.high}</>,
              s: `${formatDate(RANGE_NOTE.from)} – ${formatDate(RANGE_NOTE.to)} · ${RANGE_NOTE.source}`,
            },
            {
              l: "Recycled discount",
              v: <>~₹<Counter to={gap} decimals={0} /></>,
              s: `Virgin vs ${rNat.grade.toLowerCase()} (₹${rNat.low}–${rNat.high})`,
            },
            {
              l: "RIL blow moulding · last move",
              v: (
                <span className="inline-flex items-center gap-2">
                  <Minus className="h-6 w-6 text-muted-foreground" /> Flat
                </span>
              ),
              s: "1 Nov 2026",
            },
          ].map((t, i) => (
            <Reveal key={t.l} delay={i * 0.06} className={cn("py-8 pr-4", i % 2 ? "pl-6 border-l" : "", i >= 2 ? "border-t lg:border-t-0" : "", i === 2 ? "lg:pl-6 lg:border-l" : "", "border-foreground/10")}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">{t.l}</p>
              <p className="mt-3 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight tabular-nums">{t.v}</p>
              <p className="mt-2 text-xs text-muted-foreground">{t.s}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Chart */}
      <section className="container max-w-6xl py-14">
        <div className="rounded-[28px] border border-foreground/10 bg-card p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-medium">Virgin HDPE blow moulding · Delhi open market</h2>
              <p className="mt-1 text-sm text-muted-foreground">INR/kg · midpoint where a range was quoted</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-full border border-foreground/15 p-1 text-sm">
                {(["daily", "weekly", "monthly"] as View[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn("rounded-full px-4 py-1.5 capitalize transition-colors", v === view ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setTable((t) => !t)}
                className="rounded-full border border-foreground/15 px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {table ? "Chart" : "Table"}
              </button>
            </div>
          </div>

          {table ? (
            <table className="mt-8 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/10 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="py-3 font-normal">Period</th>
                  <th className="py-3 font-normal text-right">₹/kg</th>
                  <th className="py-3 font-normal text-right">Quotes</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.key} className="border-b border-foreground/10">
                    <td className="py-3">{d.label}</td>
                    <td className="py-3 text-right tabular-nums">{d.price.toFixed(1)}</td>
                    <td className="py-3 text-right tabular-nums text-muted-foreground">{d.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="mt-8 h-[320px] -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="gcArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--foreground) / 0.08)" />
                  <XAxis dataKey="label" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis
                    domain={[Math.floor(Math.min(min, RANGE_NOTE.low) - 2), Math.ceil(Math.max(max, RANGE_NOTE.high) + 2)]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "hsl(var(--foreground) / 0.25)", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#gcArea)"
                    dot={{ r: 4, fill: "hsl(var(--primary))", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                    isAnimationActive
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Tracking began 12 Oct 2026; points are added weekly. Indicative open-market levels, not an offer to buy or sell.
          </p>
        </div>
      </section>

      {/* Producer moves + recycled */}
      <section className="container max-w-6xl pb-10 grid gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-[28px] border border-foreground/10 bg-card p-6 md:p-10">
          <h2 className="text-2xl font-medium">Producer price moves</h2>
          <p className="mt-1 text-sm text-muted-foreground">List-price revisions by RIL, IOCL and OPaL that touch HDPE</p>
          <ol className="mt-8 relative border-l border-foreground/15 ml-2">
            {PRODUCER_MOVES.map((m, i) => (
              <Reveal key={i} delay={i * 0.04} className="relative pl-7 pb-6 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-card" />
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted-foreground">{formatDate(m.date)}</span>
                  <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 font-medium">{m.who}</span>
                  <TrendingUp className="h-3.5 w-3.5 text-primary" aria-label="increase" />
                </div>
                <p className="mt-1.5">{m.move}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-5 rounded-[28px] border border-foreground/10 bg-card p-6 md:p-10">
          <h2 className="text-2xl font-medium">Recycled vs virgin</h2>
          <p className="mt-1 text-sm text-muted-foreground">Delhi, last traded {formatDate(RECYCLED_REF[0].date)}</p>
          <div className="mt-8 space-y-5">
            {[{ grade: "Virgin HDPE blow moulding", low: latest.price, high: latest.price, virgin: true }, ...RECYCLED_REF].map((r) => {
              const mid = (r.low + r.high) / 2;
              const pct = ((mid - 100) / (145 - 100)) * 100;
              return (
                <div key={r.grade}>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <span className={"virgin" in r ? "text-foreground" : "text-muted-foreground"}>{r.grade}</span>
                    <span className="tabular-nums font-medium">₹{r.low === r.high ? r.low : `${r.low}–${r.high}`}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-foreground/[0.06] overflow-hidden">
                    <div className={cn("h-full rounded-full", "virgin" in r ? "bg-foreground/70" : "bg-primary")} style={{ width: `${Math.max(4, pct)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Bars scaled from ₹100 to ₹145/kg.</p>
        </div>
      </section>

      <section className="container max-w-6xl pb-6">
        <p className="text-xs text-muted-foreground">
          Sources:{" "}
          {SOURCES.map((s, i) => (
            <span key={s.name}>
              <a href={s.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
                {s.name}
                <ArrowUpRight className="inline h-3 w-3" />
              </a>
              {i < SOURCES.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>

      <SubscribeBand source="Prices page" />
    </Page>
  );
};

export default Prices;
