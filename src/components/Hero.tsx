import React, { useState } from "react";
import logoImage from "@/assets/greencirkit-logo.jpg";
import { Button } from "@/components/ui/button";
import ImpactCalculatorModal from "@/components/ImpactCalculatorModal";

export default function Hero() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <>
    <section className="relative overflow-hidden">
      {/* Background: brand gradients */}
      <div
        className="absolute inset-0 -z-10 opacity-90"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />
      <div
        className="absolute -top-40 -right-40 w-[44rem] h-[44rem] -z-10 rounded-full blur-3xl opacity-35"
        style={{ backgroundImage: "var(--gradient-green)" }}
      />

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: copy + CTAs */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-white/80 backdrop-blur px-3 py-1 text-xs text-[hsl(var(--primary))] shadow-sm">
            CPCB-compliant • Pan-India logistics
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
            Tech-driven{" "}
            <span className="text-[hsl(var(--primary))]">plastic recycling</span>
            <br />
            for brands & recyclers
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            We buy HDPE scrap and supply near-virgin recycled granules. We also
            deliver end-to-end EPR credits for PIBOs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/granules/buy"
              className="px-6 py-3 rounded-xl bg-[hsl(var(--primary))] text-white font-semibold hover:brightness-95 transition shadow"
            >
              Buy HDPE Granules
            </a>
            <Button
              variant="outline"
              onClick={() => setIsCalculatorOpen(true)}
              className="px-6 py-3 rounded-xl font-semibold"
            >
              🧮 Calculate Impact
            </Button>
          </div>

          {/* trust stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-2xl font-bold text-foreground">20 TPD</div>
              <div className="text-xs text-muted-foreground">Scalable operations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">A+ Quality</div>
              <div className="text-xs text-muted-foreground">Odor-free, low moisture</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">EPR</div>
              <div className="text-xs text-muted-foreground">Compliant credits</div>
            </div>
          </div>
        </div>

        {/* RIGHT: startup-style dashboard card */}
        <div className="relative">
          <div className="rounded-2xl border bg-white/90 backdrop-blur shadow-sm p-6">
            {/* top ribbon / pipeline */}
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]">
                ♻️ Real-time Quality & EPR
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Live KPIs</span>
            </div>

            {/* main row: KPI ring + two tiles */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {/* KPI ring */}
              <div className="col-span-1 rounded-xl border p-4 grid place-items-center">
                <div className="relative h-28 w-28">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(hsl(var(--primary)) 0 290deg, hsl(var(--border)) 290deg 360deg)",
                    }}
                  />
                  <div className="absolute inset-[10px] rounded-full bg-white grid place-items-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground">96%</div>
                      <div className="text-[10px] text-muted-foreground">Quality Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MFI tile */}
              <div className="col-span-1 rounded-xl border p-4">
                <div className="text-xs text-muted-foreground">MFI (Target)</div>
                <div className="mt-1 text-lg font-semibold text-foreground">0.8–1.2</div>
                <div className="mt-2 h-2 w-full rounded bg-[hsl(var(--secondary))]">
                  <div className="h-2 rounded bg-[hsl(var(--primary))]" style={{ width: "72%" }} />
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">Spec adherence</div>
              </div>

              {/* Moisture tile */}
              <div className="col-span-1 rounded-xl border p-4">
                <div className="text-xs text-muted-foreground">Moisture</div>
                <div className="mt-1 text-lg font-semibold text-foreground">&lt; 0.2%</div>
                <div className="mt-2 h-2 w-full rounded bg-[hsl(var(--secondary))]">
                  <div className="h-2 rounded bg-[hsl(var(--primary))]" style={{ width: "90%" }} />
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">Odor-free output</div>
              </div>
            </div>

            {/* bottom row: EPR / Granules badges */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border p-3">
                <div className="font-semibold text-foreground">EPR Credits</div>
                <div className="text-muted-foreground">Audit trail • CPCB compliant</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-semibold text-foreground">HDPE Granules</div>
                <div className="text-muted-foreground">Near-virgin • Degassed</div>
              </div>
            </div>
          </div>

          {/* floating badge */}
          <div className="absolute -bottom-3 -right-3 rounded-xl border bg-white/90 backdrop-blur shadow px-3 py-2 text-xs">
            <span className="text-[hsl(var(--primary))] font-semibold">On-time dispatch</span>{" "}
            <span className="text-muted-foreground">99.2%</span>
          </div>
        </div>
      </div>
    </section>

    {/* Impact Calculator Modal */}
    <ImpactCalculatorModal
      isOpen={isCalculatorOpen}
      onClose={() => setIsCalculatorOpen(false)}
    />
    </>
  );
}
