import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import mark from "@/assets/gc-mark.png";
import { SITE, whatsappLink } from "@/lib/site";
import { Btn, EASE } from "./motion";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <Link to="/" className={cn("flex items-center gap-2.5 group", className)} aria-label="GreenCirkit home">
    <img src={mark} alt="" className="h-7 w-7 transition-transform duration-700 group-hover:rotate-[120deg]" />
    <span className="text-[17px] font-semibold tracking-[-0.03em]">GreenCirkit</span>
  </Link>
);

const LINKS = [
  { to: "/granules", label: "Buy Granules" },
  { to: "/sell-scrap", label: "Sell Scrap" },
  { to: "/#about", label: "About" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname, loc.hash]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full pl-5 pr-2 py-2 transition-all duration-500",
            scrolled || open ? "bg-background/70 backdrop-blur-xl border border-foreground/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent",
          )}
        >
          <Logo />
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "relative px-4 py-2 text-sm rounded-full transition-colors",
                    isActive && !l.to.includes("#") ? "text-foreground bg-foreground/[0.07]" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:block">
            <Btn to="/granules#sample">Request sample</Btn>
          </div>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full bg-foreground/[0.07]"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 bg-background md:hidden flex flex-col justify-end px-6 pb-10 pt-24"
          >
            {[{ to: "/", label: "Home" }, ...LINKS].map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
              >
                <Link to={l.to} className="flex items-center justify-between border-b border-foreground/10 py-5 text-4xl font-medium tracking-tight">
                  {l.label}
                  <ArrowUpRight className="h-6 w-6 text-primary" />
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={whatsappLink("Hi GreenCirkit")}>WhatsApp {SITE.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => (
  <footer className="relative overflow-hidden border-t border-foreground/10 pt-20">
    <div className="container max-w-6xl">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-muted-foreground leading-relaxed">
            Premium, near-virgin recycled HDPE for brands that can't compromise. Built in India, for a circular one.
          </p>
          <p className="mt-6 serif italic text-2xl text-foreground/80">Go Green. Close the Circuit.</p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Explore</p>
          <ul className="space-y-2.5">
            {[
              ["Buy Granules", "/granules"],
              ["Sell Scrap", "/sell-scrap"],
              ["About", "/#about"],
            ].map(([l, to]) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">Talk to us</p>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink("Hi GreenCirkit")} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                WhatsApp · {SITE.phone}
              </a>
            </li>
            <li className="text-muted-foreground">{SITE.office}</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="relative mt-16 select-none">
      <p
        aria-hidden
        className="text-center font-semibold leading-[0.8] tracking-[-0.07em] text-gradient whitespace-nowrap"
        style={{ fontSize: "clamp(4rem, 18.5vw, 17rem)" }}
      >
        GreenCirkit
      </p>
    </div>
    <div className="container max-w-6xl flex flex-col md:flex-row justify-between gap-2 py-6 text-xs text-muted-foreground border-t border-foreground/10">
      <span>© {new Date().getFullYear()} {SITE.legal}</span>
      <span>CIN U38210UP2025PTC232359</span>
    </div>
  </footer>
);

/** Lime dot cursor with a lagging ring. Desktop / fine pointers only. */
export const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[role=button],input,textarea,select,label"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-primary" style={{ x, y }} />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-primary/60 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 56 : 30, height: hover ? 56 : 30, opacity: hover ? 1 : 0.6 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
};

/** One-time intro curtain per session. */
export const Intro = () => {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem("gc-intro");
    } catch {
      return false;
    }
  });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem("gc-intro", "1");
    } catch {
      /* ignore */
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[80] bg-background flex flex-col items-center justify-center"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.img
            src={mark}
            alt=""
            className="h-14 w-14"
            initial={{ rotate: -120, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <p className="mt-6 serif italic text-2xl text-foreground/80">Close the circuit.</p>
          <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between font-mono text-xs text-muted-foreground">
            <span>Near-virgin rHDPE</span>
            <span className="text-5xl md:text-7xl font-sans font-medium text-foreground tabular-nums tracking-tighter">{n}</span>
          </div>
          <div className="absolute bottom-0 left-0 h-[2px] bg-primary" style={{ width: `${n}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/** Scroll to hash / top on route change. */
export const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
};

export const Page = ({ children }: { children: ReactNode }) => (
  <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
    {children}
  </motion.main>
);
