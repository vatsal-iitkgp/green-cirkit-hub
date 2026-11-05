import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, ScanLine, Droplets, FlaskConical, Fingerprint } from "lucide-react";
import GranuleField from "@/components/site/GranuleField";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove, EASE } from "@/components/site/motion";
import { Counter, PelletCluster, StageArt } from "@/components/site/visuals";
import { Page } from "@/components/site/Chrome";

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
          text={"Recycled HDPE,\n*engineered* to\nbottle grade."}
          className="font-medium leading-[0.92] text-[clamp(2.9rem,9vw,7.6rem)] tracking-[-0.055em]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
          className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed text-balance"
        >
          Premium rHDPE granules for packaging that has to look, run and perform like virgin. And a fair, fast buyer for your HDPE scrap.
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
const WORDS = ["Bottle-grade rHDPE", "Colour-sorted", "Batch traceable", "Odour-controlled", "Consistent MFI", "Made in India"];
const Marquee = () => (
  <div className="relative border-y border-foreground/10 py-6 overflow-hidden">
    <div className="marquee flex w-max gap-12 whitespace-nowrap">
      {[...WORDS, ...WORDS, ...WORDS, ...WORDS].map((w, i) => (
        <span key={i} className="flex items-center gap-12 text-2xl md:text-4xl font-medium tracking-tight text-foreground/80">
          {i % 2 ? <span className="serif italic text-foreground/60">{w}</span> : w}
          <span className="text-primary text-xl">✦</span>
        </span>
      ))}
    </div>
  </div>
);

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
    <SplitHeadline text={"Pick your *side* of\nthe circuit."} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
    <div className="mt-14 grid gap-5 md:grid-cols-2">
      <Reveal>
        <Door
          to="/granules"
          tag="For brands & converters"
          title="Buy bottle-grade granules"
          body="rHDPE built for blow-moulded bottles. Colour-sorted, tested every batch, traceable to source."
          cta="See specs & get a quote"
          art={<PelletCluster />}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <Door
          to="/sell-scrap"
          tag="For scrap dealers & aggregators"
          title="Sell your HDPE scrap"
          body="Detergent bottles, drums, caps. Loose, baled or grinded. Fair rates, quick decisions, honest weighing."
          cta="Get a price for your scrap"
          art={<StageArt stage={0} className="w-full" />}
        />
      </Reveal>
    </div>
  </section>
);

/* ---------------- Manifesto (scroll-lit words) ---------------- */
const MANIFESTO =
  "Every FMCG brand now has a recycled-content target. Far fewer have a supply they can certify, trace and defend in an audit. We exist to close that gap.";

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const accent = ["close", "gap."].includes(children);
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
      <Eyebrow>Why we exist</Eyebrow>
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

/* ---------------- The Circuit: horizontal scroll ---------------- */
const STAGES = [
  { k: "01", t: "Source", d: "Post-consumer HDPE — detergent and home-care bottles — bought from a vetted dealer network with origin on record." },
  { k: "02", t: "Sort", d: "AI optical sorting pulls out PP, PET and off-colours. Purity is decided here, so we don't compromise here." },
  { k: "03", t: "Wash", d: "Hot friction wash strips labels, glue and residue. Clean flakes in, nothing hidden downstream." },
  { k: "04", t: "Extrude", d: "Melt-filtered, degassed for odour and pelletised. Every batch tested before it ships with a TDS." },
];

const Circuit = () => {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh] hidden md:block">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container max-w-6xl flex items-end justify-between mb-12">
          <div>
            <Eyebrow>The process</Eyebrow>
            <h2 className="mt-5 text-6xl font-medium leading-[0.95]">
              Bottle to bottle, <span className="serif italic text-primary">in four moves.</span>
            </h2>
          </div>
          <div className="w-48 h-px bg-foreground/15 relative mb-4">
            <motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 bg-primary" />
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]">
          {STAGES.map((s, i) => (
            <div
              key={s.k}
              onMouseMove={spotlightMove}
              className="spotlight shrink-0 w-[44vw] max-w-[620px] h-[58vh] rounded-[28px] border border-foreground/10 bg-card p-10 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="text-8xl font-medium tracking-tighter text-foreground/10">{s.k}</span>
                <StageArt stage={i} className="w-40 h-40" />
              </div>
              <div>
                <h3 className="text-5xl font-medium">{s.t}</h3>
                <p className="mt-4 max-w-md text-muted-foreground text-lg leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-[30vw] h-[58vh] flex flex-col justify-center pr-20">
            <p className="serif italic text-5xl leading-tight">…and the circuit closes.</p>
            <div className="mt-8">
              <Btn to="/granules">See the granules</Btn>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CircuitMobile = () => (
  <section className="md:hidden container py-20">
    <Eyebrow>The process</Eyebrow>
    <h2 className="mt-5 text-5xl font-medium leading-[0.95]">
      Bottle to bottle, <span className="serif italic text-primary">in four moves.</span>
    </h2>
    <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5">
      {STAGES.map((s, i) => (
        <div key={s.k} className="snap-center shrink-0 w-[82vw] rounded-3xl border border-foreground/10 bg-card p-7">
          <div className="flex justify-between items-start">
            <span className="text-6xl font-medium text-foreground/10">{s.k}</span>
            <StageArt stage={i} className="w-24 h-24" />
          </div>
          <h3 className="mt-6 text-3xl font-medium">{s.t}</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">{s.d}</p>
        </div>
      ))}
    </div>
  </section>
);

/* ---------------- Product spotlight ---------------- */
const SPEC_PREVIEW = [
  { l: "Melt flow index", v: <><Counter to={0.3} decimals={1} />–<Counter to={0.6} decimals={1} /></>, u: "g/10 min · 190°C/2.16 kg" },
  { l: "Density", v: <Counter to={0.96} decimals={2} prefix="~" />, u: "g/cm³" },
  { l: "PCR content", v: <Counter to={95} prefix=">" suffix="%" />, u: "post-consumer" },
  { l: "Pack", v: <Counter to={25} />, u: "kg bags" },
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
        <SplitHeadline text={"GC Prime™\n*rHDPE* bottle grade."} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-muted-foreground text-lg leading-relaxed">
            Made from post-consumer HDPE bottles, for blow moulding new ones. Natural and colour-sorted lots.
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
          <Btn to="/granules">Full spec sheet</Btn>
          <span className="text-xs text-muted-foreground">Target specs · TDS with every batch</span>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Why (bento) ---------------- */
const WHY = [
  { i: ScanLine, t: "Sorted by machine, not by eye", d: "AI optical sorting by polymer and colour. Fewer specks, fewer rejects on your line.", span: "md:col-span-4" },
  { i: Fingerprint, t: "Traceable to the batch", d: "Every bag maps back to its source lot. Audit questions answered in minutes, not weeks.", span: "md:col-span-2" },
  { i: Droplets, t: "Odour-controlled", d: "Hot wash plus vacuum degassing during extrusion. Bottles that don't smell recycled.", span: "md:col-span-2" },
  { i: FlaskConical, t: "Lab-tested, every lot", d: "MFI, density, ash and moisture checked before dispatch. Results go with the shipment.", span: "md:col-span-4" },
];

const Why = () => (
  <section className="container max-w-6xl py-24 md:py-32">
    <Reveal>
      <Eyebrow>Why GreenCirkit</Eyebrow>
    </Reveal>
    <SplitHeadline text={"Premium isn't a word.\nIt's a *spec sheet.*"} className="mt-5 text-5xl md:text-7xl font-medium leading-[0.95]" />
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
        { n: <Counter to={10} suffix="Mt" prefix="~" />, l: "Plastic waste India generates every year. Most of it is never recycled into bottles again." },
        { n: <Counter to={1.5} decimals={1} suffix=" t/hr" />, l: "Planned washing and sorting capacity at our own plant, sized to scale from day one." },
      ].map((x, i) => (
        <Reveal key={i} delay={i * 0.1} className={`py-14 md:py-20 ${i ? "md:border-l md:pl-10" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-foreground/10 md:pr-10`}>
          <p className="text-6xl md:text-7xl font-medium tracking-[-0.05em]">{x.n}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-xs">{x.l}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------------- About ---------------- */
const About = () => (
  <section id="about" className="container max-w-6xl py-28 md:py-40 scroll-mt-24">
    <div className="grid gap-14 md:grid-cols-12">
      <div className="md:col-span-5">
        <Reveal>
          <Eyebrow>About</Eyebrow>
        </Reveal>
        <SplitHeadline text={"Building recycling\n*infrastructure,* not\njust a recycler."} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.98]" />
      </div>
      <div className="md:col-span-6 md:col-start-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
        <Reveal>
          <p>
            India's recycling is still mostly informal. Quality swings lot to lot, and nobody can prove where the plastic came from. Brands with real recycled-content targets can't build on that.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            GreenCirkit is the organised alternative: a vetted sourcing network, machine-grade sorting and washing, and batch-level traceability, built for the brands that need it.
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
      <SplitHeadline text={"Let's close the\n*circuit* together."} className="relative text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.92]" />
      <Reveal delay={0.3} className="relative mt-12 flex flex-col sm:flex-row gap-3 justify-center">
        <Magnetic>
          <Btn to="/granules#quote" size="lg">
            Get a granule quote
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
    <Circuit />
    <CircuitMobile />
    <Product />
    <Why />
    <Numbers />
    <About />
    <FinalCTA />
  </Page>
);

export default Index;
