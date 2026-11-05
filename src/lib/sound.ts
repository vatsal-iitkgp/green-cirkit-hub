// Sound design: effects only (no background music). Generated live with the Web Audio API.
// Opt-in: nothing plays until the visitor turns sound on.

type Listener = (on: boolean) => void;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = false;
const listeners = new Set<Listener>();

const ensure = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    // soft room reverb from a generated impulse response
    const rev = ctx.createConvolver();
    const len = Math.floor(ctx.sampleRate * 2.6);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.8);
    }
    rev.buffer = ir;
    const wet = ctx.createGain();
    wet.gain.value = 0.4;
    rev.connect(wet);
    wet.connect(ctx.destination);
    master.connect(ctx.destination);
    master.connect(rev);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

/** Glass-bell voice: fundamental plus inharmonic partials, fast attack, long decay. */
function bell(note: number, t: number, vol: number, dur: number) {
  const c = ctx!;
  const f = midi(note);
  [
    [1, 1],
    [2.76, 0.4],
    [5.4, 0.15],
  ].forEach(([h, a]) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = f * h;
    o.connect(g);
    g.connect(master!);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol * a, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur / (h * 0.8));
    o.start(t);
    o.stop(t + dur + 0.1);
  });
}

function air(t: number, dur: number, peak: number) {
  const c = ctx!;
  const len = Math.floor(c.sampleRate * dur);
  const b = c.createBuffer(1, len, c.sampleRate);
  const data = b.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const s = c.createBufferSource();
  s.buffer = b;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 0.6;
  f.frequency.setValueAtTime(900, t);
  f.frequency.exponentialRampToValueAtTime(3200, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + dur * 0.45);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f);
  f.connect(g);
  g.connect(master!);
  s.start(t);
  s.stop(t + dur);
}

export const sound = {
  get on() {
    return enabled;
  },
  set(on: boolean) {
    enabled = on;
    if (on) sound.snap();
    listeners.forEach((l) => l(on));
  },
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  /** Pellets clinking: a few soft high glass notes. */
  clink() {
    if (!enabled) return;
    const c = ensure();
    const t = c.currentTime + 0.02;
    for (let i = 0; i < 6; i++) bell(96 + Math.floor(Math.random() * 8), t + i * 0.06 + Math.random() * 0.02, 0.025, 0.5);
  },
  /** Wash stage: a gentle breath of air. */
  whoosh() {
    if (!enabled) return;
    const c = ensure();
    air(c.currentTime + 0.02, 1.2, 0.05);
  },
  /** Logo forms / sound turned on: three-note glass chime. */
  snap() {
    if (!enabled) return;
    const c = ensure();
    const t = c.currentTime + 0.02;
    bell(88, t, 0.08, 2.4);
    bell(95, t + 0.07, 0.05, 2.6);
    bell(100, t + 0.14, 0.03, 2.8);
  },
  /** Tiny tick for primary buttons. */
  tick() {
    if (!enabled) return;
    const c = ensure();
    bell(100, c.currentTime + 0.005, 0.015, 0.25);
  },
};
