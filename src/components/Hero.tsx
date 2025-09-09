import React from "react";

export default function Hero() {
  return (
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
            <a
              href="/granules/sell"
              className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] bg-white/70 backdrop-blur text-[hsl(var(--primary))] font-semibold hover:bg-[hsl(var(--secondary))] transition"
            >
              Sell HDPE Scrap
            </a>
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

        {/* RIGHT: image card */}
        <div className="relative">
          <div className="rounded-2xl border bg-white/90 backdrop-blur shadow-sm p-6">
            <div className="h-56 md:h-72 rounded-xl bg-gradient-to-br from-[hsl(var(--secondary))] to-white border flex items-center justify-center">
              {/* Put your real visual at /public/hero.png */}
              <img
                src="/hero.png"
                alt="Recycling workflow"
                className="h-40 w-auto object-contain"
                onError={(e) => ((e.currentTarget.style.display = 'none'))}
              />
              <span className="text-sm text-[hsl(var(--primary))]">
                Add an image at <code>/public/hero.png</code>
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border p-3">
                <div className="font-semibold text-foreground">HDPE Granules</div>
                <div className="text-muted-foreground">MFI as per spec</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-semibold text-foreground">EPR Credits</div>
                <div className="text-muted-foreground">Audit trail provided</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
