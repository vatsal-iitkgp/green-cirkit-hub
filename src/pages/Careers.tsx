import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MapPin, Briefcase } from "lucide-react";
import { Page } from "@/components/site/Chrome";
import { Eyebrow, Reveal, SplitHeadline, EASE } from "@/components/site/motion";
import { LeadForm } from "@/components/site/Form";
import { JOBS } from "@/content/jobs";
import { cn } from "@/lib/utils";

const VALUES = [
  { t: "Own it", d: "You run things here. You don't watch them." },
  { t: "Get on the ground", d: "Won in scrap yards, not slide decks." },
  { t: "Say it straight", d: "Especially when it's bad news." },
];

const Careers = () => {
  const [open, setOpen] = useState<string | null>(JOBS[0]?.id ?? null);
  const [applyFor, setApplyFor] = useState<string>("");

  const apply = (title: string) => {
    setApplyFor(title);
    setTimeout(() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <Page>
      <section className="container max-w-6xl pt-36 md:pt-44 pb-16">
        <Eyebrow>Careers</Eyebrow>
        <SplitHeadline
          as="h1"
          animateOnMount
          delay={0.2}
          text={"Build something\n*different.*"}
          className="mt-6 text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.92]"
        />
        <Reveal delay={0.5}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Small team. Hard problems. Real ownership.
          </p>
        </Reveal>
      </section>

      <section className="container max-w-6xl pb-16">
        <div className="grid md:grid-cols-3 border-t border-foreground/10">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08} className={cn("py-10 md:pr-8", i ? "md:border-l md:pl-8" : "", "border-foreground/10")}>
              <p className="font-mono text-xs text-primary">0{i + 1}</p>
              <h3 className="mt-5 text-2xl font-medium">{v.t}</h3>
              <p className="mt-3 text-muted-foreground">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container max-w-6xl pb-16">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-4xl md:text-6xl font-medium leading-[0.95]">
            Open <span className="serif italic text-primary">roles</span>
          </h2>
          <span className="text-sm text-muted-foreground">{JOBS.length} open</span>
        </div>
        <div className="mt-10 border-t border-foreground/10">
          {JOBS.map((j) => {
            const isOpen = open === j.id;
            return (
              <div key={j.id} className="border-b border-foreground/10">
                <button onClick={() => setOpen(isOpen ? null : j.id)} className="group w-full flex items-center justify-between gap-6 py-7 text-left">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-medium group-hover:text-primary transition-colors">{j.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" /> {j.team} · {j.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {j.location}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "grid h-12 w-12 shrink-0 place-items-center rounded-full border border-foreground/15 transition-all duration-500",
                      isOpen && "rotate-45 bg-primary text-primary-foreground border-primary",
                    )}
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-12 gap-8 pb-10">
                        <p className="md:col-span-4 text-lg text-muted-foreground">{j.summary}</p>
                        <div className="md:col-span-4">
                          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">You'll</p>
                          <ul className="space-y-2">
                            {j.doing.map((x) => (
                              <li key={x} className="flex gap-3">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:col-span-4">
                          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-3">You have</p>
                          <ul className="space-y-2">
                            {j.you.map((x) => (
                              <li key={x} className="flex gap-3">
                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                                {x}
                              </li>
                            ))}
                          </ul>
                          <button onClick={() => apply(j.title)} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                            Apply for this role
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section id="apply" className="container max-w-6xl py-16 md:py-24 scroll-mt-20">
        <div className="grid md:grid-cols-12 gap-12 rounded-[32px] border border-foreground/10 bg-card p-8 md:p-14">
          <div className="md:col-span-4">
            <Eyebrow>Apply</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-medium leading-[0.95]">
              Don't see your role? <span className="serif italic text-primary">Write anyway.</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">Tell us what you'd own here. We read every application.</p>
          </div>
          <div className="md:col-span-8">
            <LeadForm
              key={applyFor}
              type="Job Application"
              submitLabel="Send application"
              whatsappText="Hi GreenCirkit, I'd like to apply for a role."
              successTitle="Application sent."
              successBody="Thanks for reaching out. If there's a fit, we'll get in touch within a week."
              initial={applyFor ? { role: applyFor } : {}}
              fields={[
                { name: "role", label: "Role", type: "chips", options: [...JOBS.map((j) => j.title), "Open application"], required: true },
                { name: "name", label: "Full name", type: "text", required: true, half: true },
                { name: "phone", label: "Phone", type: "tel", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, half: true },
                { name: "city", label: "Current city", type: "text", half: true },
                { name: "resume", label: "LinkedIn or résumé link (Drive, Dropbox…)", type: "text", required: true },
                { name: "message", label: "Why GreenCirkit, in 2–3 lines", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>
    </Page>
  );
};

export default Careers;
