import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useVelocity, useSpring, useMotionValue, useAnimationFrame, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, ScanLine, Droplets, FlaskConical, Fingerprint } from "lucide-react";
import GranuleField from "@/components/site/GranuleField";
import Journey from "@/components/site/Journey";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove, EASE } from "@/components/site/motion";
import { Counter, PelletCluster, StageArt } from "@/components/site/visuals";
import { Page } from "@/components/site/Chrome";
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
          Now onboarding buyers & scrap partners
        </motion.div>

        <SplitHeadline
          as="h1"
          animateOnMount
          delay={0.6}
          text={"Not your usual\n*recycler.*"}
          className="font-medium leading-[0.92] text-[clamp(2.9rem,9vw,7.6rem)] tracking-[-0.055em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
          className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed text-balance"
        >
          Premium recycled HDPE granules. Tested. Traceable. Trusted.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Magnetic>
            <Btn to="/granules" size="lg">
              Buy Granules
            </Btn>
          </Magnetic>
          <Magnetic>
            <Btn to="/sell-scrap" size="lg" variant="ghost">
              Sell Scrap
            </Btn>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="relative z-10 container max-w-6xl pb-8 flex items-end justify-between text-xs text-muted-foreground font-mono uppercase tracking-[0.16em]"
      >
        <span className="hidden sm:block">Noida · India</span>
        <span className="flex items-center gap-2 mx-auto sm:mx-0">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" /> Scroll
        </span>
        <span className="hidden sm:block">Move your cursor ↗</span>
      </motion.div>
    </section>
  );
};

/* ---------------- Marquee ---------------- */
const WORDS = ["Near-virgin rHDPE", "Colour-consistent", "Batch traceable", "Lab-tested lots", "Consistent MFI", "Made in India"];
const Marquee = () => {
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [-2500, 0, 2500], [-6, 1, 6], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [8, -8]);
  const base = useMotionValue(0);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 1.2) dir.current = 1;
    let next = base.get() - dir.current * Math.abs(f) * (delta / 1000) * 3.2;
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

/* ---------------- Two doors ---------------- */
const Door = ({
  to,
  tag,
  title,
  body,
  cta,
  art,
}: {
  to: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
  art: React.ReactNode;
}) => (
  <Link
    to={to}
    onMouseMove={spotlightMove}
    className="spotlight group relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-8 md:p-10 transition-transform duration-700 hover:-translate-y-1"
  >
    <div className="flex items-start justify-between">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{tag}</span>
      <span className="grid h-12 w-12 place-items-center rounded-full border border-foreground/15 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45 group-hover:border-primary">
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </div>
    <div className="pointer-events-none mx-auto my-6 h-52 w-52 md:h-60 md:w-60 opacity-90 transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-6">
      {art}
    </div>
    <div className="relative">
      <h3 className="text-4xl md:text-5xl font-medium leading-[0.95] max-w-[12ch]">{title}</h3>
      <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">{body}</p>
      <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary">
        {cta}
        <span className="h-px w-8 bg-primary transition-all duration-500 group-hover:w-16" />
      </span>
    </div>
  </Link>
);

const Doors = () => (
  <section className="container max-w-6xl py-28 md:py-36">
    <Reveal>
      <Eyebrow>Two ways to work with us</Eyebrow>
    </Reveal>
    <SplitHeadline text={"Buy. *Or sell.*"} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      <Reveal>
        <Door
          to="/granules"
          tag="For brands & converters"
          title="Buy near-virgin granules"
          body="Near-virgin rHDPE. Tested every lot. Sample first."
          cta="See grades & request a sample"
          art={<PelletCluster />}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <Door
          to="/sell-scrap"
          tag="For scrap dealers & aggregators"
          title="Sell your HDPE scrap"
          body="Fair rates. Fast decisions. Honest weighing."
          cta="Get a price for your scrap"
          art={<StageArt stage={0} className="w-full" />}
        />
      </Reveal>
    </div>
  </section>
);

/* ---------------- Manifesto (scroll-lit words) ---------------- */
const MANIFESTO =
  "Recycled plastic has a trust problem. Quality swings. Origins vanish. Specs are guesswork. We exist to end that.";

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = ["end", "that."].includes(children);
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
      <div ref={ref} className="mt-8 text-[clamp(2rem,5vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.04em]">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </div>
    </section>
  );
};

/* ---------------- Product spotlight ---------------- */
const SPEC_PREVIEW = [
  { l: "Melt flow index", v: <Counter to={1.15} decimals={2} />, u: "g/10 min · 190°C/5 kg" },
  { l: "Density", v: <Counter to={0.958} decimals={3} />, u: "g/cm³" },
  { l: "Tensile at yield", v: <Counter to={24} />, u: "MPa" },
  { l: "Flexural modulus", v: <Counter to={975} />, u: "MPa" },
];

const Product = () => (
  <section className="relative overflow-hidden py-28 md:py-40">
    <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    <div className="relative container max-w-6xl grid gap-16 md:grid-cols-2 items-center">
      <Reveal className="order-2 md:order-1">
        <PelletCluster className="max-w-[520px] mx-auto" />
      </Reveal>
      <div className="order-1 md:order-2">
        <Reveal>
          <Eyebrow>The product</Eyebrow>
        </Reveal>
        <SplitHeadline text={"GC Prime™\n*near-virgin* rHDPE."} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-muted-foreground text-lg leading-relaxed">
            Our first grade is live: BM 115, blue HDPE for blow moulding. More grades are on the way.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 border-t border-foreground/10">
          {SPEC_PREVIEW.map((s, i) => (
            <Reveal key={s.l} delay={0.1 * i} className={`py-6 border-b border-foreground/10 ${i % 2 === 0 ? "pr-6 border-r" : "pl-6"}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{s.l}</p>
              <p className="mt-2 text-4xl md:text-5xl font-medium tracking-tight">{s.v}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.u}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} className="mt-10 flex items-center gap-5">
          <Btn to="/granules">View grades</Btn>
          <Btn to="/granules#sample" variant="ghost">Request sample</Btn>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Why (bento) ---------------- */
const WHY = [
  { i: ScanLine, t: "Pure", d: "Sorted before it's melted. Fewer specks, fewer rejects.", span: "md:col-span-4" },
  { i: Fingerprint, t: "Traceable", d: "Every bag maps back to its source lot.", span: "md:col-span-2" },
  { i: Droplets, t: "Near-virgin", d: "Runs like virgin. No re-tuning your line.", span: "md:col-span-2" },
  { i: FlaskConical, t: "Tested", d: "Every lot. The report ships with it.", span: "md:col-span-4" },
];

const Why = () => (
  <section className="container max-w-6xl py-24 md:py-32">
    <Reveal>
      <Eyebrow>Why us</Eyebrow>
    </Reveal>
    <SplitHeadline text={"Built on *proof,*\nnot promises."} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
    <div className="mt-14 grid gap-5 md:grid-cols-6">
      {WHY.map((w, i) => (
        <Reveal key={w.t} delay={i * 0.08} className={w.span}>
          <div onMouseMove={spotlightMove} className="spotlight h-full rounded-[24px] border border-foreground/10 bg-card p-8 md:p-10 min-h-[260px] flex flex-col justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <w.i className="h-5 w-5" />
            </span>
            <div className="mt-10">
              <h3 className="text-2xl md:text-3xl font-medium">{w.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed max-w-md">{w.d}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------------- Numbers ---------------- */
const Numbers = () => (
  <section className="forest border-y border-primary/15">
    <div className="container max-w-6xl grid md:grid-cols-3">
      {[
        { n: <Counter to={60} suffix="%" />, l: "Recycled content required in rigid plastic packaging by FY29 under India's EPR rules." },
        { n: <Counter to={10} suffix="Mt" prefix="~" />, l: "Plastic waste India generates every year. Most of it never comes back as quality material." },
        { n: <Counter to={100} suffix="%" />, l: "Of our lots are lab-tested before dispatch. The report travels with the material." },
      ].map((x, i) => (
        <Reveal key={i} delay={i * 0.1} className={`py-14 md:py-20 ${i ? "md:border-l md:pl-10" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-foreground/10 md:pr-10`}>
          <p className="text-6xl md:text-7xl font-medium tracking-[-0.05em]">{x.n}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-xs">{x.l}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------------- Market pulse (tools teaser) ---------------- */
const Pulse = () => {
  const latest = VIRGIN_HDPE_BM_DELHI[VIRGIN_HDPE_BM_DELHI.length - 1];
  const posts = POSTS.slice(0, 3);
  return (
    <section className="container max-w-6xl py-24 md:py-32">
      <Reveal>
        <Eyebrow>Market pulse</Eyebrow>
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

/* ---------------- About ---------------- */
const About = () => (
  <section id="about" className="container max-w-6xl py-28 md:py-40 scroll-mt-24">
    <div className="grid gap-14 md:grid-cols-12">
      <div className="md:col-span-5">
        <Reveal>
          <Eyebrow>About</Eyebrow>
        </Reveal>
        <SplitHeadline text={"Built to be\n*trusted.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.98]" />
      </div>
      <div className="md:col-span-6 md:col-start-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
        <Reveal>
          <p>
            Most recycled plastic in India is sold on trust alone. We'd rather earn it, one tested, traceable lot at a time.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            Premium material. Straight answers. Built in India by IIT alumni.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="grid sm:grid-cols-2 gap-4 pt-6">
          {[
            { n: "Anuj Gupta", r: "Director", b: "IIT Roorkee · 30+ years building and running ventures" },
            { n: "Vatsal Gupta", r: "Director", b: "IIT Kharagpur · ex-Houlihan Lokey, strategy & operations" },
          ].map((p) => (
            <div key={p.n} className="rounded-2xl border border-foreground/10 bg-card p-6">
              <p className="text-foreground text-xl font-medium">{p.n}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary mt-1">{p.r}</p>
              <p className="mt-3 text-sm">{p.b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Final CTA ---------------- */
const FinalCTA = () => (
  <section className="container max-w-6xl py-16 md:py-24">
    <div className="forest relative overflow-hidden rounded-[36px] border border-primary/20 px-6 py-24 md:py-32 text-center">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <SplitHeadline text={"Trust,\n*by the granule.*"} className="relative text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.92]" />
      <Reveal delay={0.3} className="relative mt-12 flex flex-col sm:flex-row gap-3 justify-center">
        <Magnetic>
          <Btn to="/granules#sample" size="lg">
            Request a sample
          </Btn>
        </Magnetic>
        <Magnetic>
          <Btn to="/sell-scrap#sell" size="lg" variant="ghost">
            Sell us scrap
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
    <Doors />
    <Manifesto />
    <Journey />
    <Product />
    <Why />
    <Numbers />
    <Pulse />
    <About />
    <FinalCTA />
  </Page>
);

export default Index;
