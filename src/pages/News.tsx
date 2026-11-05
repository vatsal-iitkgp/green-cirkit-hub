import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Page } from "@/components/site/Chrome";
import { Eyebrow, Reveal, SplitHeadline, spotlightMove } from "@/components/site/motion";
import Markdown from "@/components/site/Markdown";
import { SubscribeBand, SubscribeForm } from "@/components/site/Subscribe";
import { POSTS, formatDate } from "@/lib/news";
import { cn } from "@/lib/utils";

export const NewsList = () => {
  const cats = useMemo(() => ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))], []);
  const [cat, setCat] = useState("All");
  const list = POSTS.filter((p) => cat === "All" || p.category === cat);
  const [lead, ...rest] = list;

  return (
    <Page>
      <section className="container max-w-6xl pt-36 md:pt-44 pb-10">
        <Eyebrow>Newsroom</Eyebrow>
        <SplitHeadline as="h1" animateOnMount delay={0.2} text={"What's *moving.*"} className="mt-6 text-[clamp(2.8rem,7vw,6rem)] font-medium leading-[0.92]" />
        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  c === cat ? "border-primary bg-primary text-primary-foreground" : "border-foreground/15 hover:border-foreground/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <SubscribeForm source="News page" compact className="w-full md:w-[420px]" />
        </div>
      </section>

      <section className="container max-w-6xl pb-10">
        {lead && (
          <Reveal>
            <Link
              to={`/news/${lead.slug}`}
              onMouseMove={spotlightMove}
              className="spotlight group grid md:grid-cols-12 gap-8 rounded-[32px] border border-foreground/10 bg-card p-8 md:p-12"
            >
              <div className="md:col-span-8">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">{lead.category}</span>
                  <span className="text-muted-foreground">{formatDate(lead.date)}</span>
                </div>
                <h2 className="mt-6 text-3xl md:text-5xl font-medium leading-[1] group-hover:text-primary transition-colors">{lead.title}</h2>
              </div>
              <div className="md:col-span-4 flex flex-col justify-between gap-6">
                <p className="text-muted-foreground leading-relaxed">{lead.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm text-primary">
                  Read the story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                to={`/news/${p.slug}`}
                onMouseMove={spotlightMove}
                className="spotlight group flex h-full min-h-[280px] flex-col justify-between rounded-[24px] border border-foreground/10 bg-card p-7"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full border border-foreground/15 px-3 py-1">{p.category}</span>
                    <span className="text-muted-foreground">{formatDate(p.date)}</span>
                  </div>
                  <h3 className="mt-5 text-xl md:text-2xl font-medium leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
                </div>
                <p className="mt-6 text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <SubscribeBand source="News page band" />
    </Page>
  );
};

export const NewsPost = () => {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/news" replace />;
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const isPdf = post.sourceUrl?.endsWith(".pdf");

  return (
    <Page>
      <article className="container max-w-3xl pt-36 md:pt-44 pb-16">
        <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All news
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mt-10 flex items-center gap-3 text-xs">
            <span className="rounded-full bg-primary/15 px-3 py-1 text-primary">{post.category}</span>
            <span className="text-muted-foreground">{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-medium leading-[0.98] text-balance">{post.title}</h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">{post.summary}</p>
        </motion.div>
        <div className="my-12 h-px bg-foreground/10" />
        <Markdown src={post.body} />

        {post.source && (
          <div className="mt-14 rounded-2xl border border-foreground/10 bg-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Source</p>
              <p className="mt-1 text-sm">{post.source}</p>
            </div>
            {post.sourceUrl && (
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
              >
                {isPdf ? <FileText className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                {isPdf ? "Read the notification (PDF)" : "Read the original"}
              </a>
            )}
          </div>
        )}
      </article>

      {more.length > 0 && (
        <section className="container max-w-6xl pb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">Keep reading</p>
          <div className="grid gap-5 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to={`/news/${p.slug}`} onMouseMove={spotlightMove} className="spotlight group rounded-[24px] border border-foreground/10 bg-card p-7">
                <span className="text-xs text-muted-foreground">{formatDate(p.date)}</span>
                <h3 className="mt-3 text-lg font-medium leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
      <SubscribeBand source={`News post: ${post.slug}`} />
    </Page>
  );
};
