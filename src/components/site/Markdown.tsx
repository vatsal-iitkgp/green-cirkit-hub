import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

/** Tiny markdown renderer for news posts: headings, paragraphs, lists, tables, **bold**, *italic*, [links](url). */
const inline = (text: string, key = 0): ReactNode[] => {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={`${key}-${i++}`} className="text-foreground font-semibold">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("[")) {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      out.push(
        href.startsWith("/") ? (
          <Link key={`${key}-${i++}`} to={href} className="text-primary underline underline-offset-4">
            {label}
          </Link>
        ) : (
          <a key={`${key}-${i++}`} href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
            {label}
          </a>
        ),
      );
    } else out.push(<em key={`${key}-${i++}`} className="serif text-[1.08em]">{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

const Markdown = ({ src }: { src: string }) => {
  const blocks = src.trim().split(/\n{2,}/);
  return (
    <div className="space-y-6 text-[17px] leading-[1.75] text-foreground/80">
      {blocks.map((b, bi) => {
        const lines = b.split("\n");
        if (b.startsWith("## "))
          return (
            <h2 key={bi} className="pt-6 text-3xl font-medium text-foreground tracking-tight">
              {inline(b.slice(3), bi)}
            </h2>
          );
        if (b.startsWith("### "))
          return (
            <h3 key={bi} className="pt-4 text-xl font-medium text-foreground">
              {inline(b.slice(4), bi)}
            </h3>
          );
        if (lines.every((l) => l.startsWith("- ")))
          return (
            <ul key={bi} className="space-y-3">
              {lines.map((l, li) => (
                <li key={li} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{inline(l.slice(2), bi * 100 + li)}</span>
                </li>
              ))}
            </ul>
          );
        if (lines.length > 1 && lines.every((l) => l.trim().startsWith("|"))) {
          const rows = lines.filter((l) => !/^\|\s*-/.test(l.trim())).map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));
          const [head, ...body] = rows;
          return (
            <div key={bi} className="overflow-x-auto rounded-2xl border border-foreground/10">
              <table className="w-full text-left text-[15px]">
                <thead className="bg-foreground/[0.04]">
                  <tr>
                    {head.map((h, i) => (
                      <th key={i} className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((r, ri) => (
                    <tr key={ri} className="border-t border-foreground/10">
                      {r.map((c, ci) => (
                        <td key={ci} className={`px-5 py-3 ${ci ? "tabular-nums text-foreground" : ""}`}>
                          {inline(c, ri * 10 + ci)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {inline(l, bi * 100 + li)}
                {li < lines.length - 1 && " "}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default Markdown;
