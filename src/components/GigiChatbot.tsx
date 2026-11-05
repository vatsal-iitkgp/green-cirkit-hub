import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, X, MessageCircle, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import mark from "@/assets/gc-mark.png";
import { isPhone, submitLead, whatsappLink, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { VIRGIN_HDPE_BM_DELHI } from "@/content/prices";

/* ------------------------------------------------------------------ */
/* Gigi — GreenCirkit's assistant.                                     */
/* Two guided flows (buy granules / sell scrap) that capture a lead in */
/* ~30 seconds, plus free-form AI chat with an offline fallback.        */
/* ------------------------------------------------------------------ */

type Msg = { id: number; from: "gigi" | "user"; text: string; typing?: boolean };
type Step = { key: string; ask: string; chips?: string[]; multi?: boolean; validate?: (v: string) => string | null; optional?: boolean };
type Flow = { type: "Buy Granules" | "Sell Scrap"; steps: Step[]; done: (d: Record<string, string>) => string };

const phoneCheck = (v: string) => (isPhone(v) ? null : "That number looks short. Mind re-entering with 10 digits?");

const FLOWS: Record<"buy" | "sell", Flow> = {
  buy: {
    type: "Buy Granules",
    steps: [
      { key: "volume", ask: "Great. Our live grade is GC Prime™ BM 115, blue HDPE for blow moulding. Roughly how much do you need per month?", chips: ["< 5 t", "5–25 t", "25–100 t", "100 t +"] },
      { key: "request", ask: "Would you like to start with a sample?", chips: ["Yes, send a sample", "Just a price quote"] },
      { key: "application", ask: "What will it go into?", chips: ["Jerry cans", "Bottles up to 15 L", "Personal care", "Other"] },
      { key: "name", ask: "Got it. Your name?" },
      { key: "company", ask: "And your company?" },
      { key: "phone", ask: "Best phone / WhatsApp number to reach you?", validate: phoneCheck },
    ],
    done: (d) =>
      `Thanks ${d.name?.split(" ")[0] || ""}! I've passed this to our team. Expect a call within one working day${d.request?.startsWith("Yes") ? " to plan your sample" : " with pricing"}.`,
  },
  sell: {
    type: "Sell Scrap",
    steps: [
      { key: "material", ask: "Nice. What material do you have?", chips: ["Detergent bottles", "Other HDPE bottles", "Blue drums", "Caps", "Mixed HDPE"] },
      { key: "volume", ask: "How much per month, roughly?", chips: ["< 5 t", "5–20 t", "20–50 t", "50 t +"] },
      { key: "city", ask: "Which city is the material in?" },
      { key: "name", ask: "Your name?" },
      { key: "phone", ask: "Phone / WhatsApp number? Our sourcing team will call with a rate.", validate: phoneCheck },
    ],
    done: (d) =>
      `Done, ${d.name?.split(" ")[0] || ""}! Our sourcing team will call you with a rate, usually the same day. Sending a few photos on WhatsApp speeds it up.`,
  },
};

const START_CHIPS = ["I want to buy granules", "I want to sell scrap", "I have a question"];
const ASK_CHIPS = ["What grades do you have?", "HDPE market price today", "What scrap do you buy?", "Talk to a human"];

/** Used when the AI is unreachable, so Gigi never goes silent. */
const fallbackAnswer = (q: string) => {
  const s = q.toLowerCase();
  if (/(virgin|market|today|trend|delhi)/.test(s) && /(price|rate)/.test(s)) {
    const l = VIRGIN_HDPE_BM_DELHI[VIRGIN_HDPE_BM_DELHI.length - 1];
    return `Virgin HDPE blow moulding in Delhi was about ₹${l.price}/kg on ${l.date.split("-").reverse().join("/")} (${l.source}). The full weekly tracker is at greencirkit.com/prices.`;
  }
  if (/(carbon|co2|impact|emission)/.test(s))
    return "Every kg of rHDPE used instead of virgin avoids roughly 1.6 kg CO₂e. Try our impact calculator at greencirkit.com/impact.";
  if (/(job|career|hiring|vacancy|apply)/.test(s)) return "We're hiring! See open roles at greencirkit.com/careers.";
  if (/(price|rate|cost|₹|rs)/.test(s))
    return "Pricing depends on grade, colour and monthly volume. Share your requirement and the team will send a firm quote within one working day.";
  if (/(spec|mfi|melt|density|grade|tds|sample)/.test(s))
    return "Our live grade is GC Prime™ BM 115, blue rHDPE for blow moulding: MFI 1.15 g/10 min (190°C/5 kg), density 0.958 g/cm³, tensile at yield 24 MPa, flexural modulus 975 MPa. Full TDS is on the Buy Granules page. Want a sample?";
  if (/(scrap|sell|buy.*(bottle|drum)|material)/.test(s))
    return "We buy HDPE only: detergent and cleaner bottles (top priority), other HDPE bottles, blue drums and caps. Loose, baled or grinded. We don't buy PET, PVC, films or multilayer.";
  if (/(where|location|address|office|plant)/.test(s)) return `Our office is at ${SITE.office}.`;
  if (/(food|fda|contact)/.test(s)) return "Our granules are for non-food-contact packaging: jerry cans, bottles up to 15 L, personal-care packaging and general blow-moulded containers.";
  if (/(machine|plant|capacity|technology|equipment)/.test(s)) return "We'd rather let the material speak. Request a sample and test it on your own line. The team can share more on a call.";
  return "Good question. Let me get a human on it. Tap 'Talk to a human' or message us on WhatsApp.";
};

const GigiChatbot = () => {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chips, setChips] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [flow, setFlow] = useState<{ id: "buy" | "sell"; i: number; data: Record<string, string> } | null>(null);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const idRef = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, chips]);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("gigi-teaser");
    } catch {
      /* ignore */
    }
    if (seen) return;
    const t = setTimeout(() => setTeaser(true), 7000);
    return () => clearTimeout(t);
  }, []);

  const push = (from: Msg["from"], text: string) => setMsgs((m) => [...m, { id: ++idRef.current, from, text }]);

  /** Gigi "types" before speaking, for a human pace. */
  const say = (text: string, nextChips: string[] = []) =>
    new Promise<void>((resolve) => {
      const id = ++idRef.current;
      setChips([]);
      setMsgs((m) => [...m, { id, from: "gigi", text: "", typing: true }]);
      setTimeout(() => {
        setMsgs((m) => m.map((x) => (x.id === id ? { ...x, text, typing: false } : x)));
        setChips(nextChips);
        resolve();
      }, Math.min(1100, 350 + text.length * 8));
    });

  const greet = async () => {
    await say("Hi, I'm Gigi 👋");
    await say("Looking for near-virgin rHDPE, or selling HDPE scrap? I can get you sorted in about 30 seconds.", START_CHIPS);
  };

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    try {
      sessionStorage.setItem("gigi-teaser", "1");
    } catch {
      /* ignore */
    }
    if (!msgs.length) greet();
    setTimeout(() => inputRef.current?.focus(), 400);
  };

  const reset = () => {
    setMsgs([]);
    setChips([]);
    setFlow(null);
    setHistory([]);
    greet();
  };

  const startFlow = async (id: "buy" | "sell") => {
    setFlow({ id, i: 0, data: {} });
    const s = FLOWS[id].steps[0];
    await say(s.ask, s.chips);
  };

  const advance = async (value: string) => {
    if (!flow) return;
    const f = FLOWS[flow.id];
    const step = f.steps[flow.i];
    const err = step.validate?.(value);
    if (err) {
      await say(err);
      return;
    }
    const data = { ...flow.data, [step.key]: value };
    const next = flow.i + 1;
    if (next < f.steps.length) {
      setFlow({ ...flow, i: next, data });
      const s = f.steps[next];
      await say(s.ask, s.chips);
      return;
    }
    setFlow(null);
    setBusy(true);
    const ok = await submitLead(f.type, data, "Gigi chatbot");
    setBusy(false);
    if (ok) await say(f.done(data), ["I have a question", "Start over"]);
    else await say("Hmm, I couldn't send that just now. Could you message us on WhatsApp instead? The button is at the top.", ["Start over"]);
  };

  const askAi = async (q: string) => {
    const h = [...history, { role: "user", content: q }];
    setHistory(h);
    setBusy(true);
    const id = ++idRef.current;
    setChips([]);
    setMsgs((m) => [...m, { id, from: "gigi", text: "", typing: true }]);
    let reply = "";
    try {
      const { data, error } = await supabase.functions.invoke("gigi-chat", { body: { messages: h.slice(-12) } });
      if (!error && data?.reply) reply = data.reply;
    } catch {
      /* fall through */
    }
    if (!reply) reply = fallbackAnswer(q);
    setMsgs((m) => m.map((x) => (x.id === id ? { ...x, text: reply, typing: false } : x)));
    setHistory((p) => [...p, { role: "assistant", content: reply }]);
    setChips(["I want to buy granules", "I want to sell scrap", "Talk to a human"]);
    setBusy(false);
  };

  const handle = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    push("user", text);
    setInput("");
    setChips([]);

    if (flow) return advance(text);

    const low = text.toLowerCase();
    if (text === "Start over") return reset();
    if (text === START_CHIPS[0] || /^buy\b|buy granule|need granule/.test(low)) return startFlow("buy");
    if (text === START_CHIPS[1] || /sell (my )?scrap|^sell\b/.test(low)) return startFlow("sell");
    if (text === START_CHIPS[2]) return say("Ask away. Specs, scrap, pricing, anything.", ASK_CHIPS);
    if (text === "Talk to a human")
      return say(`Sure. WhatsApp us at ${SITE.phone} or email ${SITE.email}. Or leave your details and we'll call you:`, START_CHIPS.slice(0, 2));
    return askAi(text);
  };

  const step = flow ? FLOWS[flow.id].steps[flow.i] : null;
  const placeholder = step ? (step.chips ? "Pick an option or type…" : step.key === "phone" ? "+91 …" : "Type here…") : "Ask Gigi anything…";

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ delay: 1.8 }}
            className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
          >
            <AnimatePresence>
              {teaser && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative max-w-[260px] rounded-2xl rounded-br-md border border-foreground/10 bg-card/90 backdrop-blur-xl p-4 pr-8 text-sm shadow-2xl"
                >
                  <button onClick={() => setTeaser(false)} className="absolute right-2 top-2 text-muted-foreground hover:text-foreground" aria-label="Dismiss">
                    <X size={14} />
                  </button>
                  <button onClick={openChat} className="text-left">
                    Buying rHDPE or selling scrap? <span className="text-primary">I can help in 30 seconds →</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={openChat}
              className="group flex items-center gap-3 rounded-full bg-primary pl-2 pr-5 py-2 text-primary-foreground shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.6)] transition-transform hover:scale-[1.04]"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-primary-foreground">
                <img src={mark} alt="" className="h-5 w-5 transition-transform duration-700 group-hover:rotate-[120deg]" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-primary-foreground" />
              </span>
              <span className="text-sm font-semibold">Ask Gigi</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed z-50 bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-[400px] h-[100svh] sm:h-[620px] sm:max-h-[calc(100svh-2.5rem)] flex flex-col overflow-hidden sm:rounded-[28px] border border-foreground/10 bg-background/95 backdrop-blur-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between gap-3 border-b border-foreground/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-primary">
                  <img src={mark} alt="" className="h-5 w-5 brightness-0" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
                </span>
                <div>
                  <p className="font-semibold leading-tight">Gigi</p>
                  <p className="text-xs text-muted-foreground">GreenCirkit · replies instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={whatsappLink("Hi GreenCirkit")}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-foreground/[0.07] hover:text-foreground"
                  aria-label="WhatsApp"
                  title="WhatsApp us"
                >
                  <MessageCircle size={17} />
                </a>
                <button onClick={reset} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-foreground/[0.07] hover:text-foreground" aria-label="Restart" title="Start over">
                  <RotateCcw size={16} />
                </button>
                <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-foreground/[0.07] hover:text-foreground" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Progress for guided flows */}
            {flow && (
              <div className="h-[2px] bg-foreground/10">
                <motion.div className="h-full bg-primary" animate={{ width: `${((flow.i + 1) / (FLOWS[flow.id].steps.length + 1)) * 100}%` }} />
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-2.5 no-scrollbar">
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-4 py-2.5 text-[14.5px] leading-relaxed whitespace-pre-wrap",
                      m.from === "user"
                        ? "rounded-2xl rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-2xl rounded-bl-md bg-foreground/[0.06] border border-foreground/[0.06]",
                    )}
                  >
                    {m.typing ? (
                      <span className="flex gap-1 py-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-foreground/50"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </span>
                    ) : (
                      m.text
                    )}
                  </div>
                </motion.div>
              ))}

              {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {chips.map((c, i) => (
                    <motion.button
                      key={c}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handle(c)}
                      className="rounded-full border border-primary/30 bg-primary/[0.06] px-3.5 py-2 text-[13px] text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    >
                      {c}
                    </motion.button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handle(input);
              }}
              className="p-3 border-t border-foreground/10"
            >
              <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] pl-4 pr-1.5 py-1.5 focus-within:border-primary/60 transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={busy ? "Gigi is thinking…" : placeholder}
                  inputMode={step?.key === "phone" ? "tel" : "text"}
                  disabled={busy}
                  className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/70"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
                  aria-label="Send"
                >
                  <ArrowUp size={17} strokeWidth={2.5} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10.5px] text-muted-foreground/70">Gigi is an AI assistant. The team confirms all quotes.</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GigiChatbot;
