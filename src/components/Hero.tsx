import React from "react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtle green background / blob */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_10%_10%,#d1fae5_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: copy + CTAs */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs text-emerald-700">
            CPCB-compliant • Pan-India logistics
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Tech-driven <span className="text-emerald-600">plastic recycling</span>
            <br />for brands & recyclers
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            We buy HDPE scrap and supply near-virgin recycled granules.
            We also deliver end-to-end EPR credits for PIBOs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="/granules/buy"
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Buy HDPE Granules
            </a>
            <a
              href="/granules/sell"
              className="px-6 py-3 rounded-xl border border-emerald-300 text-emerald-700 font-semibold hover:bg-emerald-50 transition"
            >
              Sell HDPE Scrap
            </a>
          </div>

          {/* trust stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-2xl font-bold text-gray-900">20 TPD</div>
              <div className="text-xs text-gray-500">Scalable operations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">A+ Quality</div>
              <div className="text-xs text-gray-500">Odor-free, low moisture</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">EPR</div>
              <div className="text-xs text-gray-500">Compliant credits</div>
            </div>
          </div>
        </div>

        {/* RIGHT: illustration / card */}
        <div className="relative">
          <div className="rounded-2xl border bg-white shadow-sm p-6">
            <div className="h-56 md:h-72 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 border flex items-center justify-center">
              {/* Replace /hero.png with your real image placed in /public/hero.png */}
              <img
                src="/hero.png"
                alt="Recycling workflow"
                className="h-40 w-auto object-contain"
                onError={(e) => ((e.currentTarget.style.display = 'none'))}
              />
              <span className="text-sm text-emerald-700">
                Add an image at <code>/public/hero.png</code>
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border p-3">
                <div className="font-semibold text-gray-900">HDPE Granules</div>
                <div className="text-gray-500">MFI as per spec</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-semibold text-gray-900">EPR Credits</div>
                <div className="text-gray-500">Audit trail provided</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
