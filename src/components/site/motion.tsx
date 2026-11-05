import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade + blur + rise into view, once. */
export const Reveal = ({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) => (
  <motion.div
    initial={{ opacity: 0, y, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

/** Headline that rises in word by word. Wrap words in *stars* to render them in italic serif. */
export const SplitHeadline = ({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  animateOnMount?: boolean;
}) => {
  const lines = text.split("\n");
  let i = 0;
  let inSerif = false;
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-80px" } })}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => {
            const opens = word.startsWith("*");
            const closes = word.endsWith("*");
            const serif = inSerif || opens;
            if (opens && !closes) inSerif = true;
            if (closes) inSerif = false;
            const clean = word.replace(/^\*|\*$/g, "");
            const idx = i++;
            return (
              <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className={cn("inline-block", serif && "serif italic text-primary pr-[0.06em]")}
                  variants={{
                    hidden: { y: "110%", rotate: 4 },
                    show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE, delay: delay + idx * 0.055 } },
                  }}
                >
                  {clean}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </MotionTag>
  );
};

/** Element gently pulled toward the cursor. */
export const Magnetic = ({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
};

/** Sets --mx/--my on the element for .spotlight cards. */
export const spotlightMove = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

type BtnProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

/** Pill button with sliding arrow. Renders Link / a / button. */
export const Btn = ({ to, href, onClick, children, variant = "primary", size = "md", className, type = "button", disabled }: BtnProps) => {
  const cls = cn(
    "group relative inline-flex items-center gap-3 rounded-full font-medium transition-all duration-300 select-none overflow-hidden",
    size === "lg" ? "h-14 pl-7 pr-2 text-base" : "h-11 pl-5 pr-1.5 text-sm",
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_10px_40px_-8px_hsl(var(--primary)/0.7)]"
      : "bg-foreground/[0.06] text-foreground border border-foreground/10 hover:bg-foreground/[0.1] backdrop-blur",
    disabled && "opacity-60 pointer-events-none",
    className,
  );
  const inner = (
    <>
      <span className="relative">{children}</span>
      <span
        className={cn(
          "relative grid place-items-center rounded-full overflow-hidden",
          size === "lg" ? "h-10 w-10" : "h-8 w-8",
          variant === "primary" ? "bg-primary-foreground text-primary" : "bg-foreground text-background",
        )}
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />
        <ArrowUpRight className="h-4 w-4 absolute -translate-x-6 translate-y-6 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href)
    return (
      <a href={href} {...(href.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" })} className={cls}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  );
};

/** Small mono label used above section headlines. */
export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground", className)}>
    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
    {children}
  </div>
);

export { EASE };
