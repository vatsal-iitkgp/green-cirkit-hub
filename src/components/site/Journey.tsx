import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import mark from "@/assets/gc-mark.png";
import { EASE, Eyebrow } from "./motion";
import { sound } from "@/lib/sound";

/**
 * "The Journey" — a scroll-scrubbed particle film.
 * ~1,500 particles start as used bottles, get sorted (non-HDPE flung out),
 * swirl through a wash vortex as flakes, then re-form as pellets that build
 * the GreenCirkit mark. Scroll drives the story; the cursor disturbs it.
 */

const STAGES = [
  { k: "01", t: "Collect", d: "Used HDPE bottles, by the thousand. Bought from a vetted dealer network, origin on record." },
  { k: "02", t: "Sort", d: "Anything that isn't HDPE leaves the line. Purity is decided here, so we don't compromise here." },
  { k: "03", t: "Clean", d: "Labels, glue, residue. Gone. Only clean flakes move forward." },
  { k: "04", t: "Re-born", d: "Uniform granules. Near-virgin, tested, ready to run on your line." },
];

type Pt = {
  // targets per stage
  tx: Float32Array;
  ty: Float32Array;
  x: number;
  y: number;
  ox: number; // cursor offset
  oy: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  delay: number;
  mat: number; // 0 blue, 1 white, 2 contaminant
  seed: number;
};

const MAT_COL = [
  ["#9cc0f0", "#2a4f8a"],
  ["#f4f3ea", "#a9a89d"],
  ["#ffb36b", "#a0441c"],
];
const FINAL_COL = [
  ["#a8efbd", "#2f7a3e"],
  ["#e9fbef", "#6fbf86"],
  ["#5fcf80", "#1d5c2b"],
];

function sprite(light: string, dark: string, kind: "dot" | "flake" | "pellet") {
  const s = 48;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d")!;
  g.translate(s / 2, s / 2);
  if (kind === "flake") {
    g.fillStyle = light;
    g.beginPath();
    g.moveTo(-18, -8);
    g.lineTo(14, -14);
    g.lineTo(20, 6);
    g.lineTo(-10, 14);
    g.closePath();
    g.fill();
    g.fillStyle = dark;
    g.globalAlpha = 0.5;
    g.beginPath();
    g.moveTo(-10, 14);
    g.lineTo(20, 6);
    g.lineTo(14, 2);
    g.lineTo(-12, 8);
    g.fill();
    return c;
  }
  g.scale(1, kind === "pellet" ? 0.72 : 1);
  const grad = g.createRadialGradient(-6, -8, 1, 0, 0, 22);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.3, light);
  grad.addColorStop(1, dark);
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, 21, 0, Math.PI * 2);
  g.fill();
  return c;
}

/** Sample n filled pixel positions from something drawn on an offscreen canvas. */
function samplePixels(draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number, step = 3) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  draw(g, w, h);
  const data = g.getImageData(0, 0, w, h).data;
  const pts: [number, number, number][] = [];
  for (let y = 0; y < h; y += step)
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      if (data[i + 3] > 128) pts.push([x, y, data[i]]); // red channel used as a tag
    }
  return pts;
}

/** Simple detergent-bottle silhouette with a cap. Red channel tags: 10 = body, 200 = cap. */
function drawBottle(g: CanvasRenderingContext2D, cx: number, by: number, s: number, tilt: number) {
  g.save();
  g.translate(cx, by);
  g.rotate(tilt);
  g.fillStyle = "rgb(10,0,0)";
  const w = 70 * s,
    h = 150 * s;
  g.beginPath();
  g.roundRect(-w / 2, -h, w, h, 14 * s);
  g.fill();
  // shoulder + neck
  g.beginPath();
  g.moveTo(-w / 2 + 6 * s, -h + 10 * s);
  g.quadraticCurveTo(-w * 0.25, -h - 30 * s, -12 * s, -h - 34 * s);
  g.lineTo(12 * s, -h - 34 * s);
  g.quadraticCurveTo(w * 0.25, -h - 30 * s, w / 2 - 6 * s, -h + 10 * s);
  g.fill();
  // handle cut-out look: a loop on the side
  g.lineWidth = 9 * s;
  g.strokeStyle = "rgb(10,0,0)";
  g.beginPath();
  g.ellipse(w / 2 - 2 * s, -h + 40 * s, 14 * s, 26 * s, 0, -Math.PI / 2, Math.PI / 2);
  g.stroke();
  // cap
  g.fillStyle = "rgb(200,0,0)";
  g.beginPath();
  g.roundRect(-14 * s, -h - 54 * s, 28 * s, 22 * s, 4 * s);
  g.fill();
  g.restore();
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const Journey = () => {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(0);
  const [pct, setPct] = useState(0);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
    setStage(Math.round(clamp(v * 3.6 - 0.3, 0, 3)));
    setPct(v);
  });

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      t = 0,
      running = false;
    let pts: Pt[] = [];
    let CX = 0,
      CY = 0,
      mobile = false;
    const mouse = { x: -9999, y: -9999 };
    const sprites = {
      dot: MAT_COL.map(([l, d]) => sprite(l, d, "dot")),
      flake: MAT_COL.map(([l, d]) => sprite(l, d, "flake")),
      pellet: FINAL_COL.map(([l, d]) => sprite(l, d, "pellet")),
    };
    const logo = new Image();
    logo.src = mark;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mobile = w < 768;
      const N = mobile ? 1100 : 2300;
      const cx = mobile ? w / 2 : w * 0.62;
      const cy = mobile ? h * 0.42 : h * 0.55;
      const S = mobile ? Math.min(w * 0.82, h * 0.42) : Math.min(w * 0.55, h * 0.8);

      // Stage 0: a pile of bottles
      const bottles = samplePixels(
        (g, W, H) => {
          const s = W / 520;
          drawBottle(g, W * 0.22, H * 0.92, s * 1.0, -0.25);
          drawBottle(g, W * 0.5, H * 0.95, s * 1.2, 0.05);
          drawBottle(g, W * 0.78, H * 0.9, s * 0.95, 0.3);
          drawBottle(g, W * 0.36, H * 0.55, s * 0.75, -0.6);
          drawBottle(g, W * 0.66, H * 0.5, s * 0.7, 0.7);
        },
        Math.round(S),
        Math.round(S),
        mobile ? 4 : 3,
      );
      // Stage 3: the GreenCirkit mark
      const logoPts =
        logo.complete && logo.naturalWidth
          ? samplePixels(
              (g, W, H) => {
                const r = Math.min(W / logo.naturalWidth, H / logo.naturalHeight) * 0.92;
                const lw = logo.naturalWidth * r,
                  lh = logo.naturalHeight * r;
                g.drawImage(logo, (W - lw) / 2, (H - lh) / 2, lw, lh);
              },
              Math.round(S * 0.8),
              Math.round(S * 0.8),
              mobile ? 4 : 3,
            )
          : [];

      pts = Array.from({ length: N }, (_, i) => {
        const b = bottles[Math.floor(Math.random() * bottles.length)] || [0, 0, 10];
        const isCap = b[2] > 100;
        const mat = isCap ? 2 : Math.random() < 0.12 ? 2 : Math.random() < 0.72 ? 0 : 1;
        const tx = new Float32Array(4);
        const ty = new Float32Array(4);
        // 0: bottles
        tx[0] = cx - S / 2 + b[0] + (Math.random() - 0.5) * 2;
        ty[0] = cy - S / 2 + b[1] + (Math.random() - 0.5) * 2;
        // 1: sorted — HDPE into a central stream, contaminants flung to the edges
        if (mat === 2) {
          const side = Math.random() < 0.5 ? -1 : 1;
          tx[1] = cx + side * (S * 0.55 + Math.random() * S * 0.4);
          ty[1] = cy + (Math.random() - 0.5) * h * 0.9;
        } else {
          const lane = mat === 0 ? -1 : 1;
          tx[1] = cx + lane * S * 0.09 + (Math.random() - 0.5) * S * 0.14;
          ty[1] = Math.random() * h; // animated as a flowing stream
        }
        // 2: wash vortex
        const r = Math.pow(Math.random(), 0.6) * S * 0.48;
        const a = Math.random() * Math.PI * 2;
        tx[2] = r;
        ty[2] = a; // polar, animated
        // 3: logo
        const l = logoPts[Math.floor(Math.random() * logoPts.length)] || [S * 0.4, S * 0.4];
        tx[3] = mat === 2 ? cx + (Math.random() - 0.5) * w * 2 : cx - S * 0.4 + l[0];
        ty[3] = mat === 2 ? -200 - Math.random() * 400 : cy - S * 0.4 + l[1];
        return {
          tx,
          ty,
          x: tx[0],
          y: ty[0],
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.04,
          delay: Math.random(),
          mat,
          seed: Math.random() * 1000,
        };
      });
      CX = cx;
      CY = cy;
    };

    const target = (p: Pt, k: number): [number, number] => {
      const cx = CX;
      const cy = CY;
      if (k === 1 && p.mat !== 2) {
        // flowing downward stream
        const y = (p.ty[1] + t * (0.8 + (p.seed % 1) * 0.8)) % (h + 40);
        return [p.tx[1] + Math.sin(y * 0.02 + p.seed) * 6, y - 20];
      }
      if (k === 2) {
        const r = p.tx[2];
        const a = p.ty[2] + t * (0.006 + 6 / (r + 40)) * 0.6;
        return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.82];
      }
      if (k === 3) {
        return [p.tx[3] + Math.sin(t * 0.02 + p.seed) * 1.2, p.ty[3] + Math.cos(t * 0.02 + p.seed) * 1.2];
      }
      return [p.tx[k] + Math.sin(t * 0.01 + p.seed) * 1.5, p.ty[k] + Math.cos(t * 0.012 + p.seed) * 1.5];
    };

    const frame = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      const sF = clamp(progress.current * 3.6 - 0.3, 0, 3); // small hold at start and end
      const seg = Math.min(2, Math.floor(sF));
      const f = sF - seg;

      for (const p of pts) {
        // staggered, held transition between stages
        const local = ease(clamp((f - 0.12 - p.delay * 0.35) / 0.5));
        const [ax, ay] = target(p, seg);
        const [bx, by] = target(p, seg + 1);
        let x = ax + (bx - ax) * local;
        let y = ay + (by - ay) * local;
        // arc the path a little for an organic, thrown feel
        y -= Math.sin(local * Math.PI) * 60 * (p.delay - 0.5);

        // cursor disturbance (spring)
        const dx = x + p.ox - mouse.x;
        const dy = y + p.oy - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2) || 1;
          const force = (140 - d) / 140;
          p.vx += (dx / d) * force * 3;
          p.vy += (dy / d) * force * 3;
          p.vr += 0.01 * force;
        }
        p.vx += -p.ox * 0.05;
        p.vy += -p.oy * 0.05;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.ox += p.vx;
        p.oy += p.vy;
        p.vr *= 0.98;
        x += p.ox;
        y += p.oy;
        p.rot += p.vr + (seg >= 1 && seg < 3 ? 0.02 : 0.004);

        // what it looks like at this moment
        const stageVis = seg + local;
        let img: HTMLCanvasElement;
        let size: number;
        let alpha = 1;
        if (stageVis < 1.5) {
          img = sprites.dot[p.mat];
          size = mobile ? 4.6 : 5.6;
        } else if (stageVis < 2.5) {
          img = sprites.flake[p.mat];
          size = mobile ? 7 : 9;
        } else {
          img = sprites.pellet[p.mat === 2 ? 2 : p.mat];
          size = mobile ? 8 : 10.5;
        }
        if (p.mat === 2) alpha = clamp(1.6 - stageVis, 0, 1); // contaminants fade out after sorting
        if (alpha <= 0.01) continue;
        ctx.globalAlpha = alpha;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(p.rot);
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "100px" });
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onResize = () => build();

    const init = () => {
      build();
      io.observe(cv);
    };
    if (logo.complete) init();
    else {
      logo.onload = init;
      logo.onerror = init;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // stage sounds (only if the visitor turned sound on)
  const prevStage = useRef(stage);
  useEffect(() => {
    if (prevStage.current === stage) return;
    prevStage.current = stage;
    if (stage === 1) sound.clink();
    else if (stage === 2) sound.whoosh();
    else if (stage === 3) sound.snap();
    else sound.clink();
  }, [stage]);

  const s = STAGES[stage];

  return (
    <section ref={section} className="relative h-[520vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* stage-tinted backdrop */}
        <div
          className="absolute inset-0 transition-[background] duration-1000"
          style={{
            background:
              stage === 3
                ? "radial-gradient(60% 60% at 62% 55%, hsl(var(--primary)/0.22), transparent 70%)"
                : stage === 2
                  ? "radial-gradient(50% 50% at 62% 55%, hsl(210 60% 50% / 0.14), transparent 70%)"
                  : "radial-gradient(50% 50% at 62% 55%, hsl(var(--foreground)/0.05), transparent 70%)",
          }}
        />
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />

        {/* copy */}
        <div className="relative z-10 container max-w-6xl h-full flex flex-col justify-between pt-28 pb-10 pointer-events-none">
          <div>
            <Eyebrow>The process · scroll to run it</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl font-medium leading-[0.95] max-w-[14ch]">
              Waste to <span className="serif italic text-primary">near-virgin.</span>
            </h2>
          </div>

          <div className="max-w-sm md:max-w-md -mx-5 px-5 pt-16 pb-2 md:m-0 md:p-0 bg-gradient-to-t from-background via-background/90 to-transparent md:bg-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="font-mono text-sm text-primary">{s.k} / 04</p>
                <p className="mt-2 text-[clamp(3rem,10vw,8rem)] font-medium leading-[0.85] tracking-[-0.06em]">{s.t}</p>
                <p className="mt-3 md:mt-5 text-muted-foreground md:text-lg leading-relaxed">{s.d}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* progress rail */}
          <div className="flex items-center gap-4">
            {STAGES.map((x, i) => (
              <div key={x.k} className="flex items-center gap-2">
                <span className={`font-mono text-[11px] transition-colors duration-500 ${i <= stage ? "text-foreground" : "text-muted-foreground/50"}`}>{x.t}</span>
                {i < 3 && (
                  <span className="relative h-px w-10 md:w-20 bg-foreground/15 overflow-hidden">
                    <span className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${clamp(pct * 3.6 - 0.3 - i) * 100}%` }} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
