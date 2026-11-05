import { useEffect } from "react";

/**
 * Pressing any button or link pops a small burst of rHDPE pellets from the
 * press point, with a soft ring, plus a short glassy "pop" sound file.
 */
const COLORS = [
  "radial-gradient(circle at 32% 28%, #fff 0%, #8fe3a7 30%, #2f7a3e 100%)",
  "radial-gradient(circle at 32% 28%, #fff 0%, #f1f0e6 30%, #a9a89d 100%)",
  "radial-gradient(circle at 32% 28%, #fff 0%, #86aee6 30%, #23447a 100%)",
];


/* ---------- press sound: a tiny pre-rendered file (public/sfx/press.mp3, 8 KB) ---------- */
let base: HTMLAudioElement | null = null;
const getBase = () => {
  if (!base) {
    base = new Audio("/sfx/press.mp3");
    base.preload = "auto";
    base.volume = 0.9;
  }
  return base;
};
const playPress = () => {
  const b = getBase();
  // clone so rapid clicks can overlap
  const a = b.cloneNode(true) as HTMLAudioElement;
  a.volume = b.volume;
  a.play().catch(() => {
    /* blocked or unavailable: stay silent */
  });
};

const ClickBurst = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:90;overflow:hidden";
    document.body.appendChild(layer);

    const burst = (x: number, y: number) => {
      // ring
      const ring = document.createElement("span");
      ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;border:2px solid hsl(140 52% 56%);box-shadow:0 0 18px hsl(140 52% 56% / .6);`;
      layer.appendChild(ring);
      ring
        .animate(
          [
            { transform: "scale(0.4)", opacity: 0.9 },
            { transform: "scale(9)", opacity: 0 },
          ],
          { duration: 700, easing: "cubic-bezier(0.22,1,0.36,1)" },
        )
        .finished.then(() => ring.remove());

      // pellets
      const n = 16;
      for (let i = 0; i < n; i++) {
        const p = document.createElement("span");
        const size = 8 + Math.random() * 7;
        p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size * 0.74}px;margin:-${size / 2}px 0 0 -${size / 2}px;border-radius:50%;background:${COLORS[i % 5 === 4 ? 2 : i % 2]};box-shadow:0 0 10px hsl(140 52% 56% / .45), 0 2px 4px rgba(0,0,0,.35)`;
        layer.appendChild(p);
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        const d = 60 + Math.random() * 70;
        const dx = Math.cos(a) * d;
        const dy = Math.sin(a) * d;
        const rot = (Math.random() - 0.5) * 540;
        p.animate(
          [
            { transform: "translate(0,0) rotate(0deg) scale(0.4)", opacity: 1 },
            { transform: `translate(${dx * 0.8}px,${dy * 0.8}px) rotate(${rot * 0.7}deg) scale(1)`, opacity: 1, offset: 0.55 },
            { transform: `translate(${dx}px,${dy + 18}px) rotate(${rot}deg) scale(0.6)`, opacity: 0 },
          ],
          { duration: 900 + Math.random() * 300, easing: "cubic-bezier(0.22,1,0.36,1)" },
        ).finished.then(() => p.remove());
      }
    };

    const onDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("button, a, [role=button]");
      if (!target) return;
      if (!reduce) burst(e.clientX, e.clientY);
    };
    // Sound plays on the completed tap/click: phones only allow audio to start on
    // touch-end / click, not on touch-start.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest("button, a, [role=button]");
      if (!target) return;
      try {
        playPress();
      } catch {
        /* audio unavailable */
      }
    };
    // warm the file cache early
    getBase().load();

    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("click", onClick, true);
      layer.remove();
    };
  }, []);

  return null;
};

export default ClickBurst;
