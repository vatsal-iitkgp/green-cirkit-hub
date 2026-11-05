import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Plus } from "lucide-react";
import { Page } from "@/components/site/Chrome";
import { Btn, Eyebrow, Magnetic, Reveal, SplitHeadline, spotlightMove } from "@/components/site/motion";
import { PelletCluster } from "@/components/site/visuals";
import { LeadForm } from "@/components/site/Form";
import { GRADES, type Grade } from "@/lib/grades";

const STEPS = [
  { k: "01", t: "Request a sample", d: "Pick a grade, tell us your application. Two minutes." },
  { k: "02", t: "Run it on your line", d: "Sample lot with its TDS. Test it on your own machines." },
  { k: "03", t: "Lock supply", d: "Agreed spec, steady monthly volume, test report with every lot." },
];

const GradeCard = ({ g }: { g: Grade }) => (
  <div onMouseMove={spotlightMove} className="spotlight rounded-[32px] border border-foreground/10 bg-card overflow-hidden">
    {/* Header */}
    <div className="grid md:grid-cols-12 gap-10 p-8 md:p-12 border-b border-foreground/10">
      <div className="md:col-span-5 flex flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Available now
          </span>
          <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-muted-foreground">{g.family}</span>
          <span className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-muted-foreground">{g.colour}</span>
        </div>
        <h3 className="mt-6 text-4xl md:text-5xl font-medium leading-[0.95]">{g.name}</h3>
        <p className="mt-2 serif italic text-2xl text-primary">{g.colour} HDPE · {g.family.toLowerCase()}</p>
        <p className="mt-5 text-muted-foreground leading-relaxed">{g.summary}</p>
        <PelletCluster tone="blue" className="mt-6 w-56 md:w-64 self-center md:self-start" />
        <dl className="mt-auto grid grid-cols-2 gap-4 pt-6 text-sm">
          <div>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Process</dt>
            <dd className="mt-1">{g.process}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Melt temp</dt>
            <dd className="mt-1">{g.processTemp}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Colour</dt>
            <dd className="mt-1">{g.colour}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">Pack</dt>
            <dd className="mt-1">{g.pack}</dd>
          </div>
        </dl>
      </div>

      {/* TDS */}
      <div className="md:col-span-7">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Technical data · typical values</p>
          <Link to={`/tds/${g.id}`} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline underline-offset-4">
            <FileText className="h-4 w-4" /> Download TDS
          </Link>
        </div>
        <div className="mt-4 border-t border-foreground/10">
          {g.tds.map((r, i) => (
            <motion.div
              key={r.property + r.condition}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group grid grid-cols-12 items-baseline gap-3 border-b border-foreground/10 py-4"
            >
              <div className="col-span-7 sm:col-span-6">
                <p className="group-hover:text-primary transition-colors">{r.property}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {r.condition ? `${r.condition} · ` : ""}
                  <span className="font-mono">{r.method}</span>
                </p>
              </div>
              <p className="col-span-5 sm:col-span-6 text-right text-2xl md:text-3xl font-medium tracking-tight tabular-nums">
                {r.value} <span className="text-sm text-muted-foreground font-normal">{r.unit}</span>
              </p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{g.note}</p>
      </div>
    </div>

    {/* Footer */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 md:px-12">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Applications</p>
        <div className="flex flex-wrap gap-2">
          {g.applications.map((a) => (
            <span key={a} className="rounded-full border border-foreground/15 px-3.5 py-1.5 text-sm">
              {a}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        <Btn href="#sample">Request sample</Btn>
      </div>
    </div>
  </div>
);

const Granules = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <Page>
      {/* Hero */}
      <section ref={ref} className="relative overflow-hidden pt-36 md:pt-44 pb-16">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
        <div className="relative container max-w-6xl grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Eyebrow>Buy granules</Eyebrow>
            <SplitHeadline
              as="h1"
              animateOnMount
              delay={0.2}
              text={"Recycled.\n*Near-virgin.*"}
              className="mt-6 text-[clamp(2.9rem,7.5vw,6.2rem)] font-medium leading-[0.92]"
            />
            <Reveal delay={0.6}>
              <p className="mt-8 max-w-lg text-lg text-muted-foreground leading-relaxed">
                GC Prime™ grades. Every lot tested, traced and backed by a TDS.
              </p>
            </Reveal>
            <Reveal delay={0.75} className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <Btn href="#sample" size="lg">
                  Request a sample
                </Btn>
              </Magnetic>
              <Btn href="#grades" size="lg" variant="ghost">
                View grades
              </Btn>
            </Reveal>
          </div>
          <motion.div style={{ rotate: rot, scale }} className="md:col-span-5">
            <PelletCluster className="max-w-[460px] mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Grades */}
      <section id="grades" className="container max-w-6xl py-16 md:py-24 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>Grades</Eyebrow>
            </Reveal>
            <SplitHeadline text={"Pick your *grade.*"} className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95]" />
          </div>
          <Reveal>
            <p className="text-sm text-muted-foreground max-w-xs">
              {GRADES.length} grade available today. More on the way.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-6">
          {GRADES.map((g) => (
            <Reveal key={g.id}>
              <GradeCard g={g} />
            </Reveal>
          ))}
          <Reveal>
            <a
              href="#sample"
              className="group flex items-center justify-between gap-6 rounded-[32px] border border-dashed border-foreground/15 p-8 md:p-10 hover:border-primary/60 transition-colors"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-medium">Need a different grade?</h3>
                <p className="mt-2 text-muted-foreground">Other colours, MFI ranges or processes. Tell us your spec and we'll tell you what's possible.</p>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-foreground/15 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-90">
                <Plus className="h-6 w-6" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* How ordering works */}
      <section className="container max-w-6xl py-20">
        <SplitHeadline text={"From sample to\n*steady supply.*"} className="text-4xl md:text-6xl font-medium leading-[0.95]" />
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

      {/* Sample / quote */}
      <section id="sample" className="container max-w-6xl py-24 md:py-32 scroll-mt-20">
        <div className="forest grid md:grid-cols-12 gap-12 rounded-[32px] border border-primary/20 p-8 md:p-14">
          <div className="md:col-span-4">
            <Eyebrow>Request a sample</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-[0.95]">
              Test it on <span className="serif italic text-primary">your line.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">We reply within one working day to plan your sample, along with pricing and the TDS.</p>
          </div>
          <div className="md:col-span-8">
            <LeadForm
              type="Buy Granules"
              submitLabel="Send request"
              whatsappText="Hi GreenCirkit, I'd like a sample of your rHDPE granules."
              successTitle="Request received."
              successBody="Our team will reach out within one working day to plan your sample."
              initial={{ request: "Sample", grade: GRADES[0].name }}
              fields={[
                { name: "request", label: "I'd like", type: "chips", options: ["Sample", "Price quote", "TDS"], multi: true, required: true },
                { name: "grade", label: "Grade", type: "chips", options: [...GRADES.map((g) => g.name), "Something else"], required: true },
                { name: "name", label: "Your name", type: "text", required: true, half: true },
                { name: "company", label: "Company", type: "text", required: true, half: true },
                { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true },
                { name: "email", label: "Work email", type: "email", half: true },
                { name: "volume", label: "Monthly volume", type: "chips", options: ["< 5 t", "5–25 t", "25–100 t", "100 t +"] },
                { name: "application", label: "Application", type: "chips", options: [...GRADES[0].applications, "Other"], multi: true },
                { name: "message", label: "Anything else? (delivery city, target spec…)", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>
    </Page>
  );
};

export default Granules;
