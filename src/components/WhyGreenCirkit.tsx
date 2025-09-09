import React from "react";
import {
  Cpu,
  ShieldCheck,
  Truck,
  Globe,
  LineChart,
  Link2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WhyGreenCirkit() {
  return (
    <section className="relative overflow-hidden">
      {/* gradient background */}
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
            <span className="text-foreground font-medium"> nationwide execution</span> so brands can scale sustainability with certainty.
          </p>
        </div>

        {/* floating feature cards */}
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

        {/* floating KPI strip */}
        <motion.div
          className="mt-10 rounded-2xl border bg-white/80 backdrop-blur px-4 py-5 shadow-sm"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <KPI label="Lower EPR Costs" value="15%" hint="Tech-optimized compliance" />
            <KPI label="Traceability" value="100%" hint="Verifiable certificates" />
            <KPI label="Live Visibility" value="24/7" hint="Realtime dashboard" />
            <KPI label="Coverage" value="PAN" hint="Pan-India network" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
        <div className="inline-grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--green-accent))] text-white shadow"
             aria-hidden="true">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--green-accent))] opacity-0 transition group-hover:opacity-100" />
    </motion.div>
  );
}

type KPIProps = { label: string; value: string; hint: string };

function KPI({ label, value, hint }: KPIProps) {
  return (
    <motion.div
      className="rounded-xl border bg-white p-4 text-center shadow-xs"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-2xl font-extrabold text-foreground tracking-tight">{value}</div>
      <div className="mt-1 text-xs font-medium text-foreground">{label}</div>
      <div className="text-[11px] text-muted-foreground">{hint}</div>
    </motion.div>
  );
}
