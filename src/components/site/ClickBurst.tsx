import { useEffect } from "react";

/**
 * Pressing any button or link pops a small burst of rHDPE pellets from the
 * press point, with a soft ring, plus a quiet glassy "pop". DOM + Web Animations + Web Audio.
 */
const COLORS = [
  "radial-gradient(circle at 32% 28%, #fff 0%, #8fe3a7 30%, #2f7a3e 100%)",
  "radial-gradient(circle at 32% 28%, #fff 0%, #f1f0e6 30%, #a9a89d 100%)",
  "radial-gradient(circle at 32% 28%, #fff 0%, #86aee6 30%, #23447a 100%)",
];


/* ---------- press sound: soft glass "pop" + tiny pellet ticks (always on, very quiet) ---------- */
let actx: AudioContext | null = null;
let out: GainNode | null = null;
const getAudio = () => {
  if (!actx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    actx = new AC();
    out = actx.createGain();
    out.gain.value = 1;
    const rev = actx.createConvolver();
    const len = Math.floor(actx.sampleRate * 1.2);
    const ir = actx.createBuffer(2, len, actx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    rev.buffer = ir;
    const wet = actx.createGain();
    wet.gain.value = 0.25;
    out.connect(actx.destination);
    out.connect(rev);
    rev.connect(wet);
    wet.connect(actx.destination);
  }
  return actx;
};

const blip = (c: AudioContext, t: number, f0: number, f1: number, vol: number, dur: number) => {
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.6);
  o.connect(g);
  g.connect(out!);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t);
  o.stop(t + dur + 0.02);
};

// Put the audio engine to sleep shortly after each sound, so the browser tab's
// "playing audio" speaker icon disappears.
let sleepTimer: ReturnType<typeof setTimeout> | undefined;
const sleepSoon = (ms: number) => {
  clearTimeout(sleepTimer);
  sleepTimer = setTimeout(() => {
    if (actx && actx.state === "running") actx.suspend();
  }, ms);
};

const schedule = (c: AudioContext, lead: number) => {
  const t = c.currentTime + lead;
  blip(c, t, 1400, 620, 0.28, 0.13); // the pop
  blip(c, t, 2800, 2600, 0.06, 0.25); // glassy shimmer
  for (let i = 0; i < 3; i++) {
    const tt = t + 0.07 + i * 0.045 + Math.random() * 0.02;
    blip(c, tt, 3200 + Math.random() * 1600, 2800, 0.03, 0.06); // pellets landing
  }
};

const playPress = () => {
  const c = getAudio();
  if (!c) return;
  sleepSoon(8000); // stay awake while the visitor is clicking around
  if (c.state === "running") {
    schedule(c, 0.005);
  } else {
    // Output devices (esp. Mac / Bluetooth) need a moment to wake; play after that.
    c.resume().then(() => schedule(c, 0.12));
  }
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
    // Unlock audio on the very first interaction anywhere (iOS needs a played buffer).
    const unlock = () => {
      const c = getAudio();
      if (c) {
        const b = c.createBuffer(1, 1, 22050);
        const src = c.createBufferSource();
        src.buffer = b;
        src.connect(c.destination);
        src.start(0);
        sleepSoon(8000);
      }
      window.removeEventListener("touchend", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("touchend", unlock, { passive: true });
    window.addEventListener("click", unlock);
    window.addEventListener("keydown", unlock);

    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("touchend", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      layer.remove();
    };
  }, []);

  return null;
};

export default ClickBurst;
