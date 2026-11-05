import { useParams, Link } from "react-router-dom";
import { Download, ArrowLeft } from "lucide-react";
import mark from "@/assets/gc-mark.png";
import { GRADES } from "@/lib/grades";
import { SITE } from "@/lib/site";

/** Printable, shareable technical data sheet. "Download" uses the browser's Save as PDF. */
const TDS = () => {
  const { id } = useParams();
  const g = GRADES.find((x) => x.id === id) ?? GRADES[0];

  return (
    <div className="min-h-screen bg-[#e9ece9] py-8 print:bg-white print:py-0">
      <style>{`@page { size: A4; margin: 0 } @media print { .no-print { display:none !important } }`}</style>
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between px-4">
        <Link to="/granules#grades" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft className="h-4 w-4" /> Back to grades
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-[#14532d] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#166534]"
        >
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>

      <article className="mx-auto w-full max-w-[820px] bg-white text-neutral-900 shadow-xl print:shadow-none" style={{ minHeight: "1160px" }}>
        {/* Header band */}
        <header className="flex items-center justify-between px-12 py-8" style={{ background: "linear-gradient(120deg,#0f2a17,#327a3b)" }}>
          <div className="flex items-center gap-3 text-white">
            <img src={mark} alt="" className="h-9 w-9" />
            <div>
              <p className="text-xl font-semibold tracking-tight">GreenCirkit</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Technical data sheet</p>
            </div>
          </div>
          <div className="text-right text-white">
            <p className="text-2xl font-semibold tracking-tight">{g.name}</p>
            <p className="text-sm text-white/75">
              {g.colour} rHDPE · {g.family}
            </p>
          </div>
        </header>

        <div className="px-12 py-10">
          <p className="text-[15px] leading-relaxed text-neutral-700">{g.summary}</p>

          <table className="mt-8 w-full border-collapse text-[14px]">
            <thead>
              <tr className="border-b-2 border-[#327a3b] text-left text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                <th className="py-3 font-medium">Property</th>
                <th className="py-3 font-medium">Test method</th>
                <th className="py-3 font-medium">Unit</th>
                <th className="py-3 text-right font-medium">Typical value</th>
              </tr>
            </thead>
            <tbody>
              {g.tds.map((r) => (
                <tr key={r.property + r.condition} className="border-b border-neutral-200">
                  <td className="py-3.5">
                    {r.property}
                    {r.condition && <span className="text-neutral-500"> ({r.condition})</span>}
                  </td>
                  <td className="py-3.5 font-mono text-[12.5px] text-neutral-600">{r.method}</td>
                  <td className="py-3.5 text-neutral-600">{r.unit}</td>
                  <td className="py-3.5 text-right font-semibold tabular-nums">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-[12px] text-neutral-500">* {g.note}</p>

          <div className="mt-10 grid grid-cols-2 gap-8 text-[14px]">
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#327a3b]">Applications</h2>
              <ul className="mt-3 space-y-1.5 text-neutral-700">
                {g.applications.map((a) => (
                  <li key={a}>— {a}</li>
                ))}
              </ul>
            </section>
            <section className="space-y-5">
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#327a3b]">Typical process conditions</h2>
                <p className="mt-2 text-neutral-700">
                  {g.process}, melt temperature {g.processTemp}
                </p>
              </div>
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#327a3b]">Colour · Packing</h2>
                <p className="mt-2 text-neutral-700">
                  {g.colour} · {g.pack}
                </p>
              </div>
              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#327a3b]">Storage</h2>
                <p className="mt-2 text-neutral-700">Dry, covered, away from direct sunlight.</p>
              </div>
            </section>
          </div>
        </div>

        <footer className="mx-12 mt-6 flex items-end justify-between border-t border-neutral-200 py-6 text-[11.5px] text-neutral-500">
          <div>
            <p className="font-medium text-neutral-800">{SITE.legal}</p>
            <p>{SITE.office}</p>
          </div>
          <div className="text-right">
            <p>{SITE.email} · {SITE.phone}</p>
            <p>www.greencirkit.com</p>
          </div>
        </footer>
        <p className="px-12 pb-8 text-[10.5px] leading-relaxed text-neutral-400">
          The information given is based on typical values and is offered in good faith. It does not constitute a specification or warranty. Users should test the material for their own application.
        </p>
      </article>
    </div>
  );
};

export default TDS;
