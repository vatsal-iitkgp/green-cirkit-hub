import { useEffect, useRef } from "react";

/**
 * Hero canvas: thousands of glossy rHDPE pellets drifting in 3D space.
 * Pellets scatter away from the cursor and settle back. Pure 2D canvas, no deps.
 */
type P = { x: number; y: number; z: number; vx: number; vy: number; ox: number; oy: number; rot: number; vr: number; c: number };

const COLORS = [
  ["#f4f3ea", "#b9b8ad"], // natural
  ["#f4f3ea", "#b9b8ad"],
  ["#f4f3ea", "#b9b8ad"],
  ["#dfe9f2", "#8fa6bb"], // pale blue
  ["#7fa3d6", "#2c4f86"], // HDPE blue
  ["#8fe3a7", "#2f7a3e"], // brand green
  ["#5fcf80", "#1d5c2b"], // deep green
];

function makeSprite(light: string, dark: string) {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d")!;
  g.translate(s / 2, s / 2);
  g.scale(1, 0.72);
  const grad = g.createRadialGradient(-8, -10, 2, 0, 0, 30);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.25, light);
  grad.addColorStop(1, dark);
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, 28, 0, Math.PI * 2);
  g.fill();
  // rim
  g.strokeStyle = "rgba(0,0,0,0.35)";
  g.lineWidth = 2;
  g.stroke();
  return c;
}

const GranuleField = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = COLORS.map(([l, d]) => makeSprite(l, d));
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      t = 0;
    let parts: P[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let scrollY = 0;

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(340, (w * h) / 4200));
      parts = Array.from({ length: n }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x,
          y,
          ox: x,
          oy: y,
          z: Math.pow(Math.random(), 1.6),
          vx: 0,
          vy: 0,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.01,
          c: Math.floor(Math.random() * COLORS.length),
        };
      });
      parts.sort((a, b) => a.z - b.z);
    };

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const depth = 0.25 + p.z * 0.75;
        // slow drift around origin
        const driftX = Math.sin(t * 0.004 * (0.5 + p.z) + p.oy * 0.01) * 14 * depth;
        const driftY = Math.cos(t * 0.003 * (0.5 + p.z) + p.ox * 0.01) * 10 * depth - scrollY * (0.15 + p.z * 0.5);
        const tx = p.ox + driftX;
        const ty = p.oy + driftY;
        // cursor repel
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const R = 150;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = ((R - d) / R) * 2.4 * depth;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
            p.vr += 0.004 * f;
          }
        }
        p.vx += (tx - p.x) * 0.012;
        p.vy += (ty - p.y) * 0.012;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.vr *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr + 0.0015;

        const size = 4 + depth * 13;
        ctx.save();
        ctx.globalAlpha = 0.18 + depth * 0.82;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.drawImage(sprites[p.c], -size / 2, -size / 2, size, size);
        ctx.restore();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => init();

    init();
    draw();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
};

export default GranuleField;
