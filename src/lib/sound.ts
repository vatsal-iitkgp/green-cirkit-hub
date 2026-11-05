// "Lab precision" sound design, generated live with the Web Audio API.
// Opt-in only: nothing plays until the visitor turns sound on.

type Listener = (on: boolean) => void;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let ambient: { g: GainNode; os: OscillatorNode[] } | null = null;
let enabled = false;
const listeners = new Set<Listener>();

const ensure = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

function tone(freq: number, type: OscillatorType, t: number, a: number, peak: number, d: number) {
  const c = ctx!;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  g.connect(master!);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  o.start(t);
  o.stop(t + a + d + 0.05);
}

function noise(t: number, dur: number, f0: number, f1: number, peak: number) {
  const c = ctx!;
  const len = Math.floor(c.sampleRate * dur);
  const b = c.createBuffer(1, len, c.sampleRate);
  const data = b.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource();
  s.buffer = b;
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.Q.value = 0.7;
  f.frequency.setValueAtTime(f0, t);
  f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.4);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f);
  f.connect(g);
  g.connect(master!);
  s.start(t);
  s.stop(t + dur);
}

function startAmbient() {
  const c = ensure();
  if (ambient) return;
  const g = c.createGain();
  g.gain.value = 0.0001;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1800;
  lp.connect(g);
  g.connect(master!);
  const lfo = c.createOscillator();
  const lg = c.createGain();
  lfo.frequency.value = 0.12;
  lg.gain.value = 0.012;
  lfo.connect(lg);
  lg.connect(g.gain);
  lfo.start();
  const os = [lfo];
  [220, 329.6, 493.9].forEach((f, i) => {
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    o.detune.value = (i - 1) * 6;
    o.connect(lp);
    o.start();
    os.push(o);
  });
  g.gain.setTargetAtTime(0.03, c.currentTime, 1.2);
  ambient = { g, os };
}

function stopAmbient() {
  if (!ambient || !ctx) return;
  const { g, os } = ambient;
  g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);
  os.forEach((o) => o.stop(ctx!.currentTime + 2));
  ambient = null;
}

export const sound = {
  get on() {
    return enabled;
  },
  set(on: boolean) {
    enabled = on;
    try {
      localStorage.setItem("gc-sound", on ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (on) {
      startAmbient();
      sound.snap();
    } else stopAmbient();
    listeners.forEach((l) => l(on));
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  /** Pellets clinking: glassy high ticks. */
  clink() {
    if (!enabled) return;
    const c = ensure();
    const t = c.currentTime + 0.02;
    for (let i = 0; i < 7; i++) tone(2200 + Math.random() * 1400, "sine", t + i * 0.05 + Math.random() * 0.02, 0.001, 0.07, 0.05);
  },
  /** Wash vortex: airy rising whoosh. */
  whoosh() {
    if (!enabled) return;
    const c = ensure();
    noise(c.currentTime + 0.02, 1.1, 800, 4000, 0.1);
  },
  /** Logo forms: bright three-note chime. */
  snap() {
    if (!enabled) return;
    const c = ensure();
    const t = c.currentTime + 0.02;
    tone(1318.5, "sine", t, 0.002, 0.15, 0.9);
    tone(1975.5, "sine", t + 0.06, 0.002, 0.1, 1.1);
    tone(2637, "sine", t + 0.12, 0.002, 0.06, 1.2);
  },
  /** Tiny UI tick for primary clicks. */
  tick() {
    if (!enabled) return;
    const c = ensure();
    tone(2600, "sine", c.currentTime + 0.005, 0.001, 0.04, 0.04);
  },
};

// Pause the ambient tone while the tab is hidden.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!enabled) return;
    if (document.hidden) stopAmbient();
    else startAmbient();
  });
}
