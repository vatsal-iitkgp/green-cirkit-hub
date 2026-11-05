// News posts live in src/content/news/*.md (front-matter + markdown).
// To publish a post: add a new .md file there. Newest first, automatically.

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  source?: string;
  sourceUrl?: string;
  featured?: boolean;
  body: string;
};

const files = import.meta.glob("../content/news/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

function parse(path: string, raw: string): Post {
  const slug = path.split("/").pop()!.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i < 0) continue;
      meta[line.slice(0, i).trim()] = line
        .slice(i + 1)
        .trim()
        .replace(/^"(.*)"$/, "$1");
    }
  }
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    category: meta.category || "News",
    summary: meta.summary || "",
    source: meta.source,
    sourceUrl: meta.sourceUrl,
    featured: meta.featured === "true",
    body: m ? m[2] : raw,
  };
}

export const POSTS: Post[] = Object.entries(files)
  .map(([p, raw]) => parse(p, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
