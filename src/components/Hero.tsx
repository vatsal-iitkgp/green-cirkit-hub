import React from "react";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 leading-tight">
        Turning Plastic Waste <br />
        <span className="bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
          into Opportunity
        </span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
        GreenCirkit supplies CPCB-compliant EPR credits and near-virgin HDPE granules. 
        Odor-free. Moisture-free. Scalable 20 TPD operations.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/granules/sell"
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Sell HDPE Scrap
        </a>
        <a
          href="/granules/buy"
          className="px-6 py-3 border border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition"
        >
          Buy Granules
        </a>
      </div>
    </section>
  );
}
