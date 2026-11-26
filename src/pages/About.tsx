import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove } from "@/components/site/motion";
import { Counter, PelletCluster } from "@/components/site/visuals";
import { SITE } from "@/lib/site";
import { Team } from "@/components/site/story";

const PROBLEMS = [
  { k: "01", t: "No test report", d: "Most recycled granules are sold on a sample and a promise. No datasheet. No lab numbers. Nothing to hold the seller to." },
  { k: "02", t: "Every batch is different", d: "Melt flow, colour and purity change lot to lot. Machines need re-tuning, rejects go up, and production slows down." },
  { k: "03", t: "No proof of origin", d: "Under EPR rules, brands must show where their recycled content came from. The informal supply chain can't answer." },
];

const ANSWERS = [
  { t: "A vetted partner network", d: "We work with a small group of recycled-granule manufacturers we've audited, not whoever is cheapest this week." },
  { t: "Our lab, your proof", d: "Every lot is tested by us before it's accepted. The report ships with the material." },
  { t: "Matched to your spec", d: "Blended to your requirement, with masterbatch or virgin if needed. Packed and supplied under GreenCirkit." },
];

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-25%", "5%"]);

  return (
    <Page>
      {/* Hero */}
      <section className="container max-w-6xl pt-36 md:pt-44 pb-20">
        <Eyebrow>About us</Eyebrow>
        <SplitHeadline
          as="h1"
          animateOnMount
          delay={0.2}
          text={"Recycled plastic\ndeserves *trust.*"}
          className="mt-6 text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.9]"
        />
        <Reveal delay={0.6}>
          <p className="mt-8 max-w-2xl text-xl md:text-2xl text-muted-foreground leading-snug">
            GreenCirkit supplies premium recycled HDPE from a vetted network of partner manufacturers, tested and backed by us. Built by IITians. Designed around what the industry actually needs.
          </p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="container max-w-6xl py-20 md:py-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-medium text-[clamp(5rem,12vw,9rem)] leading-[0.85] tracking-[-0.06em]">
              <Counter to={60} suffix="%" />
            </p>
            <p className="mt-3 text-muted-foreground max-w-xs">
              recycled content required in rigid plastic packaging by FY 2028–29.
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80">
          <Reveal>
            <p>
              Great businesses get built where the rules force change. India now makes brands responsible for the plastic they sell, and the recycled-content bar rises every year: <span className="text-foreground">30%, then 40, 50, 60.</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p>
              The rule is clear. The supply isn't. Brands need recycled granules that run on their machines, come with a test report, and can be traced back to source. Most of the market can't offer that.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              We started GreenCirkit to close that gap. Not as another trader, but as <span className="serif italic text-primary text-[1.15em]">the supplier you can trust.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="container max-w-6xl py-20">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
        </Reveal>
        <SplitHeadline text={"Why brands don't trust\n*recycled plastic* today."} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
        <div className="mt-12 grid md:grid-cols-3 border-t border-foreground/10">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08} className={`py-10 md:pr-8 ${i ? "md:border-l md:pl-8" : ""} border-foreground/10`}>
              <p className="font-mono text-xs text-primary">{p.k}</p>
              <h3 className="mt-6 text-3xl font-medium">{p.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 rounded-2xl border border-foreground/10 bg-card px-6 py-5 text-lg">
          <span className="text-muted-foreground">The result: </span>brands either overpay for virgin plastic, or buy recycled and hope it works.
        </Reveal>
      </section>

      {/* What we're solving */}
      <section className="container max-w-6xl py-20">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>What we do about it</Eyebrow>
            </Reveal>
            <SplitHeadline text={"Trust, built\n*into the granule.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
            <Reveal delay={0.2}>
              <PelletCluster className="mt-8 max-w-[320px]" />
            </Reveal>
          </div>
          <div className="md:col-span-7 space-y-4">
            {ANSWERS.map((a, i) => (
              <Reveal key={a.t} delay={i * 0.08}>
                <div onMouseMove={spotlightMove} className="spotlight rounded-[24px] border border-foreground/10 bg-card p-8 flex gap-6">
                  <span className="font-mono text-sm text-primary pt-1">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-medium">{a.t}</h3>
                    <p className="mt-2 text-muted-foreground">{a.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IIT band */}
      <section ref={ref} className="forest relative overflow-hidden border-y border-primary/15 py-20 md:py-28 my-10">
        <motion.p style={{ x: x1 }} className="whitespace-nowrap text-[clamp(4rem,12vw,10rem)] font-medium leading-none tracking-[-0.05em] text-foreground/90">
          IIT Kharagpur · IIT Roorkee · IIT Kharagpur · IIT Roorkee ·
        </motion.p>
        <motion.p style={{ x: x2 }} className="whitespace-nowrap serif italic text-[clamp(3.5rem,10vw,8.5rem)] leading-none text-primary">
          Built by IITians · Built by IITians · Built by IITians ·
        </motion.p>
      </section>

      {/* Team */}
      <Team eyebrow="Founders & advisors" />

      {/* Founder note */}
      <section className="container max-w-4xl py-10 md:py-16">
        <Reveal>
          <p className="serif italic text-[clamp(1.8rem,4vw,3rem)] leading-snug text-foreground/90">
            "An engineer by education, a strategy guy by profession, and a recycler by choice."
          </p>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Vatsal Gupta · Co-founder</p>
        </Reveal>
      </section>

      {/* Vision */}
      <section className="container max-w-6xl py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { l: "Vision", t: "To build the infrastructure India's recycling economy runs on, starting as its most trusted name in recycled HDPE." },
            { l: "Mission", t: "Make recycled plastic something brands choose with confidence, not compromise." },
          ].map((v, i) => (
            <Reveal key={v.l} delay={i * 0.08}>
              <div className="h-full rounded-[28px] border border-foreground/10 p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">{v.l}</p>
                <p className="mt-4 text-2xl md:text-3xl font-medium leading-snug">{v.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-sm text-muted-foreground">
          {SITE.legal} · {SITE.office} · CIN {SITE.cin} · GSTIN {SITE.gstin}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container max-w-6xl py-20 md:py-28 text-center">
        <SplitHeadline text={"Work with *us.*"} className="text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.92]" />
        <Reveal delay={0.2} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Magnetic>
            <Btn to="/granules#sample" size="lg">
              Request a sample
            </Btn>
          </Magnetic>
          <Magnetic>
            <Btn to="/careers" size="lg" variant="ghost">
              Join the team
            </Btn>
          </Magnetic>
        </Reveal>
      </section>
    </Page>
  );
};

export default About;
