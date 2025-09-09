import React from "react";
import { Cpu, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyGreenCirkit() {
  // KPI data for the ticker
  const KPIS: { label: string; value: string; hint: string }[] = [
    { label: "Lower EPR Costs", value: "15%", hint: "Tech-optimized compliance" },
    { label: "Traceability", value: "100%", hint: "Verifiable certificates" },
    { label: "Live Visibility", value: "24/7", hint: "Realtime dashboard" },
    { label: "Coverage", value: "PAN", hint: "Pan-India network" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* soft background wash */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 0%, hsl(var(--secondary)) 0%, transparent 40%), radial-gradient(1000px 500px at 90% 10%, hsl(var(--secondary)) 0%, transparent 45%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-white/70 backdrop-blur px-3 py-1 text-xs text-[hsl(var(--primary))] shadow-sm">
            Why GreenCirkit
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Recycling built for the next decade
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            We combine <span className="text-foreground font-medium">smart tech</span>,
            <span className="text-foreground font-medium"> guaranteed purity</span> and
            <span className="text-foreground font-medium"> nationwide execution</span>{" "}
            so brands can scale sustainability with certainty.
          </p>
        </div>

        {/* feature cards (enter animation) */}
        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-3"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          <FeatureCard
            Icon={Cpu}
            title="Smart Recycling Tech"
            desc="AI-assisted sorting, live MFI/moisture monitoring and a traceable digital trail from scrap to credits."
          />
          <FeatureCard
            Icon={ShieldCheck}
            title="Guaranteed Purity"
            desc="Near-virgin HDPE granules, zero odour, moisture controlled at source. Spec adherence, every batch."
          />
          <FeatureCard
            Icon={Truck}
            title="Nationwide, Zero-Hassle"
            desc="Pan-India logistics and CPCB-compliant EPR handled end-to-end. One partner, complete coverage."
          />
        </motion.div>

        {/* continuous-scrolling KPI ticker */}
        <div className="mt-10 rounded-2xl border bg-white/60 backdrop-blur p-0 overflow-hidden">
          <motion.div
            className="flex gap-4 py-5"
            // slide the whole strip left forever
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {/* duplicate content once to make it seamless */}
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex gap-4 px-4">
                {KPIS.map((kpi, i) => (
                  <KPIBox
                    key={`${kpi.label}-${idx}-${i}`}
                    label={kpi.label}
                    value={kpi.value}
                    hint={kpi.hint}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* subcomponents                      */
/* ---------------------------------- */

type FeatureProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

function FeatureCard({ Icon, title, desc }: FeatureProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
      whileHover={{ y: -6 }}
    >
      <div className="p-6">
        <div
          className="inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--green-accent))] text-white shadow"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--green-accent))] opacity-0 transition group-hover:opacity-100" />
    </motion.div>
  );
}

/** Non-animated box used inside the moving ticker */
function KPIBox({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="min-w-[220px] rounded-xl border bg-white p-4 text-center shadow-xs">
      <div className="text-2xl font-extrabold text-foreground tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-foreground">{label}</div>
      <div className="text-[11px] text-muted-foreground">{hint}</div>
    </div>
  );
}
