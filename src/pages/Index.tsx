import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValue, useAnimationFrame, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GranuleField from "@/components/site/GranuleField";
import Journey from "@/components/site/Journey";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove, EASE } from "@/components/site/motion";
import { Counter, PelletCluster } from "@/components/site/visuals";
import { Page } from "@/components/site/Chrome";
import { Roadmap, MarketFunnel, ImpactGoals, Team } from "@/components/site/story";
import { VIRGIN_HDPE_BM_DELHI } from "@/content/prices";
import { POSTS, formatDate } from "@/lib/news";

/* ---------------- Hero ---------------- */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden flex flex-col">
      <div className="absolute inset-0 aurora opacity-70" />
      <GranuleField className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,hsl(var(--background)/0.92)_0%,hsl(var(--background)/0.55)_55%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <motion.div style={{ y, opacity: o }} className="relative z-10 container max-w-6xl flex-1 flex flex-col items-center justify-center text-center pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] backdrop-blur px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Pre-seed · Building in North India
        </motion.div>

        <SplitHeadline
          as="h1"
          animateOnMount
          delay={0.6}
          text={"Recycled plastic,\n*finally trusted.*"}
          className="font-medium leading-[0.92] text-[clamp(2.9rem,9vw,7.6rem)] tracking-[-0.055em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
          className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed text-balance"
        >
          India now requires brands to use recycled plastic. We're building the tested, traceable supply they can rely on, starting with recycled HDPE.<br /><span className="text-foreground/80">Built by IITians.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Magnetic>
            <Btn to="/investors" size="lg">
              Investor relations
            </Btn>
          </Magnetic>
          <Magnetic>
            <Btn to="/about" size="lg" variant="ghost">
              Our story
            </Btn>
          </Magnetic>
        </motion.div>
      </motion.div>


    </section>
  );
};

/* ---------------- Marquee ---------------- */
const WORDS = ["Regulation-backed demand", "Lab-tested lots", "Batch traceable", "North India first", "Built by IITians", "PAN India"];
const Marquee = () => {
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [-2500, 0, 2500], [-4, 1, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [8, -8]);
  const base = useMotionValue(0);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 1.2) dir.current = 1;
    let next = base.get() - dir.current * Math.abs(f) * (delta / 1000) * 1.4;
    if (next < -50) next += 50;
    if (next > 0) next -= 50;
    base.set(next);
  });
  const x = useTransform(base, (v) => `${v}%`);
  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div className="relative border-y border-foreground/10 py-6 overflow-hidden">
      <motion.div style={{ x, skewX: skew }} className="flex w-max gap-12 whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-2xl md:text-4xl font-medium tracking-tight text-foreground/80">
            {i % 2 ? <span className="serif italic text-foreground/60">{w}</span> : w}
            <span className="text-primary text-xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ---------------- Why now ---------------- */
const STATS = [
  { v: <Counter to={60} suffix="%" />, l: "recycled content required in rigid plastic packaging by FY 2028–29, up from 30% today" },
  { v: <>₹<Counter to={4000} /> Cr</>, l: "HDPE rigid-packaging market that falls under those targets (our estimate)" },
  { v: <><Counter to={10} /> Mn t</>, l: "of plastic waste India generates a year, mostly handled informally" },
];
const WhyNow = () => (
  <section className="container max-w-6xl py-24 md:py-32">
    <Reveal>
      <Eyebrow>Why now</Eyebrow>
    </Reveal>
    <SplitHeadline text={"The rules changed.\n*The supply didn't.*"} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
    <div className="mt-14 grid md:grid-cols-3 border-t border-foreground/10">
      {STATS.map((s, i) => (
        <Reveal key={i} delay={i * 0.1} className={`py-10 md:pr-8 ${i ? "md:border-l md:pl-8 border-t md:border-t-0" : ""} border-foreground/10`}>
          <p className="text-6xl md:text-7xl font-medium tracking-[-0.05em]">{s.v}</p>
          <p className="mt-4 max-w-xs text-muted-foreground leading-relaxed">{s.l}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------------- What we do ---------------- */
const PILLARS = [
  { k: "01", t: "Source", d: "Recycled HDPE from vetted partner manufacturers today. Our own North India plant next." },
  { k: "02", t: "Verify", d: "Every lot tested in our QC lab. A test report travels with every shipment." },
  { k: "03", t: "Supply", d: "Ready-to-run grades blended to each customer's spec, under the GreenCirkit name." },
];
const WhatWeDo = () => (
  <section className="relative overflow-hidden py-24 md:py-32">
    <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    <div className="relative container max-w-6xl grid gap-14 md:grid-cols-12 items-center">
      <div className="md:col-span-5">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
        </Reveal>
        <SplitHeadline text={"Recycled HDPE,\n*with proof.*"} className="mt-5 text-5xl md:text-6xl font-medium leading-[0.95]" />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed">
            We turn recycled plastic into something a brand can put its name on: consistent, tested and traceable.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <PelletCluster className="mt-8 max-w-[300px]" />
        </Reveal>
      </div>
      <div className="md:col-span-7 space-y-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.k} delay={i * 0.08}>
            <div onMouseMove={spotlightMove} className="spotlight rounded-[24px] border border-foreground/10 bg-card p-8 flex gap-6">
              <span className="font-mono text-sm text-primary pt-1.5">{p.k}</span>
              <div>
                <h3 className="text-3xl font-medium">{p.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <Link to="/granules" className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-primary hover:underline underline-offset-4">
            See our first product, GC Prime™ BM 115 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Manifesto (scroll-lit words) ---------------- */
const MANIFESTO =
  "Brands must use more recycled plastic every year. But most recycled granules in India come with no test report, no proof of origin, and quality that changes every batch. So brands don't trust them. We're here to fix that.";

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = ["fix", "that."].includes(children);
  return (
    <motion.span style={{ opacity }} className={accent ? "serif italic text-primary" : undefined}>
      {children}{" "}
    </motion.span>
  );
};

const Manifesto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = MANIFESTO.split(" ");
  return (
    <section className="container max-w-5xl py-24 md:py-40">
      <Eyebrow>The problem</Eyebrow>
      <div ref={ref} className="mt-8 text-[clamp(1.8rem,4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.04em]">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </div>
    </section>
  );
};

/* ---------------- Market pulse (tools teaser) ---------------- */
const Pulse = () => {
  const latest = VIRGIN_HDPE_BM_DELHI[VIRGIN_HDPE_BM_DELHI.length - 1];
  const posts = POSTS.slice(0, 3);
  return (
    <section className="container max-w-6xl py-24 md:py-32">
      <Reveal>
        <Eyebrow>Insights</Eyebrow>
      </Reveal>
      <SplitHeadline text={"Market *pulse.*"} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
      <div className="mt-14 grid gap-5 md:grid-cols-6">
        <Reveal className="md:col-span-3">
          <Link to="/prices" onMouseMove={spotlightMove} className="spotlight group flex h-full min-h-[300px] flex-col justify-between rounded-[28px] border border-foreground/10 bg-card p-8">
            <div className="flex items-start justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Virgin HDPE BM · Delhi</p>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div>
              <p className="text-7xl md:text-8xl font-medium tracking-[-0.06em]">
                ₹<Counter to={latest.price} decimals={latest.price % 1 ? 1 : 0} />
                <span className="text-xl text-muted-foreground font-normal tracking-normal">/kg</span>
              </p>
              <p className="mt-3 text-sm text-muted-foreground">Updated weekly · open the price tracker</p>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-3">
          <Link to="/impact" onMouseMove={spotlightMove} className="forest spotlight group flex h-full min-h-[300px] flex-col justify-between rounded-[28px] border border-primary/20 p-8">
            <div className="flex items-start justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">Impact calculator</p>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-medium leading-tight max-w-md">
                25 t of rHDPE a month avoids <span className="serif italic text-primary">~490 t CO₂e</span> a year.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">What does yours do? Slide and see →</p>
            </div>
          </Link>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-6">
          <div className="rounded-[28px] border border-foreground/10 bg-card p-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Latest from the newsroom</p>
              <Link to="/news" className="text-sm text-primary hover:underline underline-offset-4">All news</Link>
            </div>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              {posts.map((p) => (
                <Link key={p.slug} to={`/news/${p.slug}`} className="group border-t border-foreground/10 pt-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="text-primary">{p.category}</span>
                    <span>{formatDate(p.date)}</span>
                  </div>
                  <p className="mt-3 text-lg font-medium leading-snug group-hover:text-primary transition-colors">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------------- Final CTA ---------------- */
const FinalCTA = () => (
  <section className="container max-w-6xl py-16 md:py-24">
    <div className="forest relative overflow-hidden rounded-[36px] border border-primary/20 px-6 py-24 md:py-32 text-center">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <SplitHeadline text={"Build the circuit\n*with us.*"} className="relative text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.92]" />
      <Reveal delay={0.3} className="relative mt-12 flex flex-col sm:flex-row gap-3 justify-center">
        <Magnetic>
          <Btn to="/investors#deck" size="lg">
            Request the investor deck
          </Btn>
        </Magnetic>
        <Magnetic>
          <Btn href="mailto:contact@greencirkit.com" size="lg" variant="ghost">
            Get in touch
          </Btn>
        </Magnetic>
      </Reveal>
    </div>
  </section>
);

const Index = () => (
  <Page>
    <Hero />
    <Marquee />
    <WhyNow />
    <Manifesto />
    <WhatWeDo />
    <Journey />
    <Roadmap />
    <MarketFunnel />
    <ImpactGoals />
    <Team />
    <Pulse />
    <FinalCTA />
  </Page>
);

export default Index;
