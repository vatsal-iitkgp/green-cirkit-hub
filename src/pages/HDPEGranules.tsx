import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove } from "@/components/site/motion";
import { PelletCluster } from "@/components/site/visuals";
import { LeadForm } from "@/components/site/Form";

const SPECS = [
  ["Melt flow index", "190°C / 2.16 kg", "0.3 – 0.6", "g/10 min", "ASTM D1238"],
  ["Density", "at 23°C", "0.950 – 0.965", "g/cm³", "ASTM D792"],
  ["Tensile strength", "at yield", "19 – 27", "MPa", "ASTM D638"],
  ["Flexural modulus", "", "700 – 1,250", "MPa", "ASTM D790"],
  ["ESCR", "", "≥ 40", "hours", "ASTM D1693"],
  ["Ash content", "", "< 2.5", "%", "ASTM D5630"],
  ["Moisture", "", "< 0.5", "%", "—"],
  ["PCR content", "post-consumer", "> 95", "%", "—"],
];

const USES = [
  { t: "Home-care bottles", d: "Detergent, floor and toilet-cleaner bottles. Our feedstock is exactly this, so it goes back where it came from." },
  { t: "Personal-care bottles", d: "Shampoo and lotion bottles (non-food contact) where colour and finish matter." },
  { t: "Containers & jerry cans", d: "Blow-moulded containers that need stiffness and stress-crack resistance." },
];

const STEPS = [
  { k: "01", t: "Tell us what you need", d: "Grade, colour, monthly volume, application. Two minutes." },
  { k: "02", t: "Sample + TDS", d: "We send a sample lot with its test report. Run it on your line." },
  { k: "03", t: "Lock supply", d: "Agreed spec, steady monthly volume, test report with every batch." },
];

const Granules = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <Page>
      {/* Hero */}
      <section ref={ref} className="relative overflow-hidden pt-36 md:pt-44 pb-20">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
        <div className="relative container max-w-6xl grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Eyebrow>Buy granules</Eyebrow>
            <SplitHeadline
              as="h1"
              animateOnMount
              delay={0.2}
              text={"GC Prime™\n*rHDPE,* bottle grade."}
              className="mt-6 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.92]"
            />
            <Reveal delay={0.6}>
              <p className="mt-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Post-consumer HDPE bottles, sorted, washed and re-extruded into granules your blow-moulding line can run like virgin.
              </p>
            </Reveal>
            <Reveal delay={0.75} className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Btn href="#quote" size="lg">
                  Request a sample
                </Btn>
              </Magnetic>
              <Btn href="#specs" size="lg" variant="ghost">
                View specs
              </Btn>
            </Reveal>
          </div>
          <motion.div style={{ rotate: rot, scale }} className="md:col-span-5">
            <PelletCluster className="max-w-[460px] mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Variants */}
      <section className="container max-w-6xl py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { n: "GC Prime™ Natural", d: "Light, natural-tone granules for bottles that get coloured downstream.", sw: "radial-gradient(circle at 32% 28%, #fff, #f1f0e6 25%, #a9a89d)" },
            { n: "GC Prime™ Colour-sorted", d: "Sorted by colour (blue and more) so your bottles match lot after lot.", sw: "radial-gradient(circle at 32% 28%, #fff, #86aee6 25%, #23447a)" },
          ].map((v, i) => (
            <Reveal key={v.n} delay={i * 0.1}>
              <div onMouseMove={spotlightMove} className="spotlight rounded-[24px] border border-foreground/10 bg-card p-8 md:p-10 flex items-center gap-8">
                <span className="shrink-0 h-20 w-24 rounded-[50%] shadow-[0_20px_40px_-14px_rgba(0,0,0,0.9)]" style={{ background: v.sw }} />
                <div>
                  <h3 className="text-2xl md:text-3xl font-medium">{v.n}</h3>
                  <p className="mt-2 text-muted-foreground">{v.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="container max-w-6xl py-20 md:py-28 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Technical data</Eyebrow>
            </Reveal>
            <SplitHeadline text={"The *numbers* that\nmatter on your line."} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
          </div>
          <Reveal>
            <p className="text-sm text-muted-foreground max-w-xs">Target specification. Every batch ships with its own test report.</p>
          </Reveal>
        </div>
        <div className="mt-12 border-t border-foreground/10">
          {SPECS.map(([name, cond, val, unit, method], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group grid grid-cols-12 items-baseline gap-4 border-b border-foreground/10 py-5 md:py-6 transition-colors hover:bg-foreground/[0.02]"
            >
              <div className="col-span-7 md:col-span-5">
                <p className="text-lg md:text-xl group-hover:text-primary transition-colors">{name}</p>
                {cond && <p className="text-xs text-muted-foreground mt-0.5">{cond}</p>}
              </div>
              <p className="col-span-5 md:col-span-4 text-right md:text-left text-2xl md:text-3xl font-medium tracking-tight tabular-nums">
                {val} <span className="text-sm text-muted-foreground font-normal">{unit}</span>
              </p>
              <p className="hidden md:block md:col-span-3 text-right font-mono text-xs text-muted-foreground">{method}</p>
            </motion.div>
          ))}
        </div>
        <Reveal className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <span>Packing · 25 kg bags</span>
          <span>Store dry, below 50°C, away from sunlight</span>
          <span>Non-food-contact applications</span>
        </Reveal>
      </section>

      {/* Uses */}
      <section className="container max-w-6xl py-20">
        <Reveal>
          <Eyebrow>Built for</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {USES.map((u, i) => (
            <Reveal key={u.t} delay={i * 0.08}>
              <div onMouseMove={spotlightMove} className="spotlight h-full rounded-[24px] border border-foreground/10 bg-card p-8 min-h-[240px] flex flex-col justify-between">
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl font-medium">{u.t}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{u.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How ordering works */}
      <section className="container max-w-6xl py-20">
        <SplitHeadline text={"From first call to\n*steady supply.*"} className="text-4xl md:text-6xl font-medium leading-[0.95]" />
        <div className="mt-12 grid md:grid-cols-3 border-t border-foreground/10">
          {STEPS.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.1} className={`py-10 ${i ? "md:border-l md:pl-8" : ""} md:pr-8 border-foreground/10`}>
              <p className="font-mono text-xs text-primary">{s.k}</p>
              <h3 className="mt-6 text-2xl font-medium">{s.t}</h3>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="container max-w-6xl py-24 md:py-32 scroll-mt-20">
        <div className="grid md:grid-cols-12 gap-12 rounded-[32px] border border-foreground/10 bg-card p-8 md:p-14">
          <div className="md:col-span-4">
            <Eyebrow>Get a quote</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-[0.95]">
              Tell us your <span className="serif italic text-primary">spec.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">We reply within one working day with price, availability and a sample plan.</p>
          </div>
          <div className="md:col-span-8">
            <LeadForm
              type="Buy Granules"
              submitLabel="Request quote"
              whatsappText="Hi GreenCirkit, I'd like a quote for rHDPE bottle-grade granules."
              successTitle="Got it. Thank you."
              successBody="Our team will reach out within one working day with pricing and a sample plan."
              fields={[
                { name: "name", label: "Your name", type: "text", required: true, half: true },
                { name: "company", label: "Company", type: "text", required: true, half: true },
                { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true },
                { name: "email", label: "Work email", type: "email", half: true },
                { name: "volume", label: "Monthly volume", type: "chips", options: ["< 5 t", "5–25 t", "25–100 t", "100 t +"], required: true },
                { name: "colour", label: "Colour", type: "chips", options: ["Natural", "Blue", "Other colour", "Not sure yet"] },
                { name: "application", label: "Application", type: "chips", options: ["Home-care bottles", "Personal-care bottles", "Containers / jerry cans", "Other"], multi: true },
                { name: "message", label: "Anything else? (target MFI, delivery city…)", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>
    </Page>
  );
};

export default Granules;
