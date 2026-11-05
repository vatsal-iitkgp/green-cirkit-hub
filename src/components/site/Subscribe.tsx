import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { isEmail, submitLead } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Email capture for the GreenCirkit Brief (weekly HDPE prices + regulation updates). */
export const SubscribeForm = ({ source, className, compact }: { source: string; className?: string; compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setState("error");
      return;
    }
    setState("sending");
    const ok = await submitLead("Subscribe", { email, name: email }, source);
    setState(ok ? "done" : "error");
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            You're in. The next brief lands in your inbox.
          </motion.p>
        ) : (
          <motion.form key="f" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border bg-foreground/[0.04] pl-5 pr-1.5 py-1.5 transition-colors focus-within:border-primary/60",
                state === "error" ? "border-destructive/60" : "border-foreground/15",
              )}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="you@company.com"
                autoComplete="email"
                className={cn("flex-1 min-w-0 bg-transparent outline-none placeholder:text-muted-foreground/60", compact ? "text-sm" : "text-base")}
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className={cn(
                  "group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary font-medium text-primary-foreground transition-shadow hover:shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.7)] disabled:opacity-60",
                  compact ? "h-9 px-4 text-sm" : "h-11 px-5 text-sm",
                )}
              >
                {state === "sending" ? "…" : "Subscribe"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <p className={cn("mt-2 pl-5 text-xs", state === "error" ? "text-destructive" : "text-muted-foreground")}>
              {state === "error" ? "Please enter a valid email." : "Weekly HDPE prices + rule changes. No spam, unsubscribe anytime."}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Full-width subscribe band used on content pages. */
export const SubscribeBand = ({ source }: { source: string }) => (
  <section className="container max-w-6xl py-16 md:py-24">
    <div className="forest relative overflow-hidden rounded-[32px] border border-primary/20 p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">The GreenCirkit Brief</p>
        <h2 className="mt-4 text-4xl md:text-5xl font-medium leading-[0.95]">
          One email. <span className="serif italic text-primary">Every week.</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-md">HDPE prices and rule changes that matter.</p>
      </div>
      <SubscribeForm source={source} className="min-w-0" />
    </div>
  </section>
);
