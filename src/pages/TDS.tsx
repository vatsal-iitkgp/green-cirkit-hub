import { Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, ArrowLeft, Check } from "lucide-react";
import mark from "@/assets/gc-mark.png";
import { GRADES } from "@/lib/grades";
import { SITE } from "@/lib/site";

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#327a3b]">{children}</h2>
);

/** Printable, shareable technical data sheet. "Download" uses the browser's Save as PDF. */
const TDS = () => {
  const { id } = useParams();
  const g = GRADES.find((x) => x.id === id) ?? GRADES[0];
  const groups = Array.from(new Set(g.tds.map((r) => r.group)));

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
        <header className="px-12 pt-8 pb-7" style={{ background: "linear-gradient(120deg,#0f2a17,#327a3b)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <img src={mark} alt="" className="h-9 w-9" />
              <div>
                <p className="text-xl font-semibold tracking-tight">GreenCirkit</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">Product data sheet</p>
              </div>
            </div>
            <div className="text-right text-white">
              <p className="text-2xl font-semibold tracking-tight">{g.name}</p>
              <p className="text-sm text-white/75">
                Recycled HDPE · {g.colour} · {g.family}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-1 border-t border-white/15 pt-4 text-[11px] text-white/70">
            <span>Document {g.docNo}</span>
            <span>Revision {g.revision}</span>
            <span>Issued {g.issued}</span>
          </div>
        </header>

        <div className="px-12 py-9">
          {/* Overview */}
          <section className="grid grid-cols-5 gap-8">
            <div className="col-span-3">
              <H>Product overview</H>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-700">{g.summary}</p>
            </div>
            <div className="col-span-2">
              <H>Key features</H>
              <ul className="mt-3 space-y-1.5 text-[13.5px] text-neutral-700">
                {g.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#327a3b]" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Properties */}
          <section className="mt-9">
            <H>Typical properties</H>
            <table className="mt-3 w-full border-collapse text-[13.5px]">
              <thead>
                <tr className="bg-[#f1f5f1] text-left text-[10.5px] uppercase tracking-[0.12em] text-neutral-500">
                  <th className="px-3 py-2.5 font-medium">Property</th>
                  <th className="px-3 py-2.5 font-medium">Test standard</th>
                  <th className="px-3 py-2.5 text-right font-medium">Typical value</th>
                  <th className="px-3 py-2.5 font-medium">Unit</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((grp) => (
                  <Fragment key={grp}>
                    <tr>
                      <td colSpan={4} className="px-3 pt-4 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#327a3b]">
                        {grp}
                      </td>
                    </tr>
                    {g.tds
                      .filter((r) => r.group === grp)
                      .map((r) => (
                        <tr key={r.property} className="border-b border-neutral-200">
                          <td className="px-3 py-2.5">
                            {r.property}
                            {r.condition && <span className="block text-[11.5px] text-neutral-500">{r.condition}</span>}
                          </td>
                          <td className="px-3 py-2.5 font-mono text-[12px] text-neutral-600">{r.method}</td>
                          <td className="px-3 py-2.5 text-right font-semibold tabular-nums">{r.value}</td>
                          <td className="px-3 py-2.5 text-neutral-600">{r.unit}</td>
                        </tr>
                      ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[11.5px] leading-relaxed text-neutral-500">{g.note}</p>
          </section>

          {/* Use + processing */}
          <section className="mt-9 grid grid-cols-2 gap-8 text-[13.5px]">
            <div>
              <H>Where to use it</H>
              <ul className="mt-3 space-y-1.5 text-neutral-700">
                {g.applications.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#327a3b]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <H>Processing guidance</H>
              <ul className="mt-3 space-y-1.5 text-neutral-700">
                {g.processing.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#327a3b]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* QA + pack */}
          <section className="mt-9 grid grid-cols-2 gap-8 text-[13.5px]">
            <div className="rounded-xl bg-[#f1f5f1] p-5">
              <H>Quality assurance</H>
              <p className="mt-2 text-neutral-700 leading-relaxed">
                Supplied by GreenCirkit from vetted partner manufacturers. Every lot is checked against this sheet before dispatch, and a lot-wise test report travels with each shipment.
              </p>
            </div>
            <div className="rounded-xl bg-[#f1f5f1] p-5">
              <H>Packing & storage</H>
              <p className="mt-2 text-neutral-700 leading-relaxed">
                {g.pack}. {g.storage}
              </p>
            </div>
          </section>
        </div>

        <footer className="mx-12 mt-2 flex items-end justify-between border-t border-neutral-200 py-6 text-[11.5px] text-neutral-500">
          <div>
            <p className="font-medium text-neutral-800">{SITE.legal}</p>
            <p>{SITE.office}</p>
          </div>
          <div className="text-right">
            <p>
              {SITE.email} · {SITE.phone}
            </p>
            <p>www.greencirkit.com</p>
          </div>
        </footer>
        <p className="px-12 pb-8 text-[10.5px] leading-relaxed text-neutral-400">
          Values shown are typical and for guidance only; they are not a purchase specification. Agreed specifications are confirmed per order. Please trial the material on your own equipment before full-scale use.
        </p>
      </article>
    </div>
  );
};

export default TDS;
