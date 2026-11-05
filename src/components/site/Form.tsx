import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Btn, EASE } from "./motion";
import { isEmail, isPhone, submitLead, whatsappLink, type LeadType } from "@/lib/site";

export type FieldDef =
  | { name: string; label: string; type: "text" | "tel" | "email"; required?: boolean; placeholder?: string; half?: boolean }
  | { name: string; label: string; type: "chips"; options: string[]; multi?: boolean; required?: boolean }
  | { name: string; label: string; type: "textarea"; placeholder?: string };

const inputCls =
  "peer w-full bg-transparent border-0 border-b border-foreground/15 px-0 pt-6 pb-2.5 text-lg text-foreground outline-none transition-colors focus:border-primary placeholder:text-transparent focus:placeholder:text-muted-foreground/50";

const Floating = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="relative block">
    {children}
    <span className="pointer-events-none absolute left-0 top-6 text-lg text-muted-foreground transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">
      {label}
    </span>
  </label>
);

export const LeadForm = ({
  type,
  fields,
  submitLabel,
  whatsappText,
  successTitle,
  successBody,
}: {
  type: LeadType;
  fields: FieldDef[];
  submitLabel: string;
  whatsappText: string;
  successTitle: string;
  successBody: string;
}) => {
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: string, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const toggleChip = (f: Extract<FieldDef, { type: "chips" }>, opt: string) => {
    const cur = (data[f.name] || "").split(", ").filter(Boolean);
    if (f.multi) set(f.name, (cur.includes(opt) ? cur.filter((c) => c !== opt) : [...cur, opt]).join(", "));
    else set(f.name, cur[0] === opt ? "" : opt);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    for (const f of fields) {
      const v = (data[f.name] || "").trim();
      if ("required" in f && f.required && !v) errs[f.name] = "Required";
      else if (f.type === "tel" && v && !isPhone(v)) errs[f.name] = "Enter a valid phone number";
      else if (f.type === "email" && v && !isEmail(v)) errs[f.name] = "Enter a valid email";
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    const ok = await submitLead(type, data, `Website · ${type}`);
    setState(ok ? "done" : "error");
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="py-16 text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <Check className="h-9 w-9" strokeWidth={2.5} />
            </motion.span>
            <h3 className="mt-8 text-4xl font-medium">{successTitle}</h3>
            <p className="mt-3 text-muted-foreground max-w-sm mx-auto">{successBody}</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -10 }} className="grid grid-cols-2 gap-x-8 gap-y-7">
            {fields.map((f) => {
              const err = errors[f.name];
              if (f.type === "chips") {
                const cur = (data[f.name] || "").split(", ").filter(Boolean);
                return (
                  <div key={f.name} className="col-span-2">
                    <p className="text-sm text-muted-foreground mb-3">
                      {f.label}
                      {f.multi && <span className="text-muted-foreground/60"> · pick all that apply</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {f.options.map((o) => {
                        const on = cur.includes(o);
                        return (
                          <button
                            type="button"
                            key={o}
                            onClick={() => toggleChip(f, o)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                              on ? "border-primary bg-primary text-primary-foreground" : "border-foreground/15 hover:border-foreground/40",
                            )}
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                    {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
                  </div>
                );
              }
              if (f.type === "textarea")
                return (
                  <div key={f.name} className="col-span-2">
                    <Floating label={f.label}>
                      <textarea
                        rows={2}
                        placeholder={f.placeholder || " "}
                        value={data[f.name] || ""}
                        onChange={(e) => set(f.name, e.target.value)}
                        className={cn(inputCls, "resize-none")}
                      />
                    </Floating>
                  </div>
                );
              return (
                <div key={f.name} className={f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}>
                  <Floating label={f.label + (f.required ? " *" : "")}>
                    <input
                      type={f.type}
                      placeholder={f.placeholder || " "}
                      value={data[f.name] || ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      className={cn(inputCls, err && "border-destructive")}
                      autoComplete={f.type === "tel" ? "tel" : f.type === "email" ? "email" : f.name === "name" ? "name" : f.name === "company" ? "organization" : "off"}
                    />
                  </Floating>
                  {err && <p className="mt-1.5 text-xs text-destructive">{err}</p>}
                </div>
              );
            })}

            <div className="col-span-2 mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <Btn type="submit" size="lg" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : submitLabel}
              </Btn>
              <a
                href={whatsappLink(whatsappText)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-primary" /> or message us on WhatsApp
              </a>
            </div>
            {state === "error" && (
              <p className="col-span-2 text-sm text-destructive">
                Couldn't send right now. Please try again, or reach us on WhatsApp.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
