import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** A floating cluster of glossy pellets, pure CSS. */
const PELLETS = [
  [50, 50, 30, "n"], [30, 38, 22, "n"], [68, 34, 20, "b"], [72, 62, 24, "n"], [36, 66, 20, "l"],
  [52, 24, 16, "n"], [20, 54, 14, "b"], [84, 46, 14, "n"], [58, 78, 16, "n"], [44, 86, 11, "b"],
  [14, 30, 10, "n"], [86, 22, 10, "l"], [26, 84, 9, "n"], [90, 76, 11, "n"], [64, 12, 9, "n"],
] as const;

const FILL: Record<string, string> = {
  n: "radial-gradient(circle at 32% 28%, #fff 0%, #f1f0e6 22%, #a9a89d 100%)",
  b: "radial-gradient(circle at 32% 28%, #fff 0%, #86aee6 22%, #23447a 100%)",
  l: "radial-gradient(circle at 32% 28%, #fff 0%, #7fdc98 22%, #23663a 100%)",
};

export const PelletCluster = ({ className }: { className?: string }) => (
  <div className={cn("relative aspect-square", className)}>
    <div className="absolute inset-[12%] rounded-full bg-primary/20 blur-[80px]" />
    {PELLETS.map(([x, y, s, c], i) => (
      <motion.span
        key={i}
        className="absolute rounded-[50%] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.8)]"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${s}%`,
          height: `${s * 0.74}%`,
          background: FILL[c],
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ scale: 0, rotate: i * 23 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        animate={{ y: [0, -8 - (i % 4) * 3, 0], rotate: [i * 23, i * 23 + 10, i * 23] }}
        transition={{
          scale: { delay: i * 0.05, type: "spring", stiffness: 140, damping: 12 },
          y: { duration: 4 + (i % 5), repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut" },
        }}
      />
    ))}
  </div>
);

/** Number that counts up when scrolled into view. */
export const Counter = ({ to, decimals = 0, prefix = "", suffix = "", className }: { to: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Line illustrations for the four process stages. */
export const StageArt = ({ stage, className }: { stage: number; className?: string }) => {
  const common = { viewBox: "0 0 200 200", className: cn("text-foreground/80", className) };
  if (stage === 0)
    return (
      <svg {...common}>
        {[40, 85, 130].map((x, i) => (
          <motion.g key={x} initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.15, duration: 0.8 }}>
            <path {...stroke} d={`M${x + 8} 60 h14 v10 q12 8 12 24 v56 q0 8 -8 8 h-34 q-8 0 -8 -8 v-56 q0 -16 12 -24 z`} />
            <path {...stroke} d={`M${x + 6} 52 h18 v8 h-18 z`} className="text-primary" stroke="hsl(var(--primary))" />
            <path {...stroke} d={`M${x - 4} 110 h46`} opacity={0.35} />
          </motion.g>
        ))}
      </svg>
    );
  if (stage === 1)
    return (
      <svg {...common}>
        <path {...stroke} d="M20 140 h160" />
        <path {...stroke} d="M20 152 h160" opacity={0.4} />
        <path {...stroke} d="M70 40 h60 v18 h-60 z" />
        <motion.path
          d="M80 58 L60 136 L140 136 L120 58 Z"
          fill="hsl(var(--primary) / 0.12)"
          stroke="hsl(var(--primary))"
          strokeWidth={1}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {[30, 55, 80, 105, 130, 155].map((x, i) => (
          <motion.circle
            key={x}
            r={6}
            cy={132}
            fill={i % 3 === 1 ? "hsl(var(--primary))" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
            animate={{ cx: [x - 30, x + 30] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    );
  if (stage === 2)
    return (
      <svg {...common}>
        <path {...stroke} d="M40 60 h120 v90 q0 14 -14 14 h-92 q-14 0 -14 -14 z" />
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            {...stroke}
            stroke="hsl(var(--primary))"
            d="M48 110 q14 -10 28 0 t28 0 t28 0 t20 0"
            animate={{ x: [-6, 6, -6] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
            transform={`translate(0 ${i * 16})`}
          />
        ))}
        {[[70, 82], [100, 92], [126, 78], [86, 140], [118, 136]].map(([x, y], i) => (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={10}
            height={6}
            rx={1}
            {...stroke}
            animate={{ y: [y, y - 10, y], rotate: [0, 40, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
          />
        ))}
      </svg>
    );
  return (
    <svg {...common}>
      <path {...stroke} d="M20 80 h120 v40 h-120 z" />
      <path {...stroke} d="M30 100 q8 -14 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" opacity={0.6} />
      <path {...stroke} d="M140 92 h22 v16 h-22" />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.ellipse
          key={i}
          rx={6}
          ry={4.4}
          fill="hsl(var(--primary))"
          initial={{ cx: 162, cy: 100, opacity: 0 }}
          animate={{ cx: [162, 186], cy: [100, 168], opacity: [1, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.32, ease: "easeIn" }}
        />
      ))}
      <path {...stroke} d="M150 176 h44" opacity={0.4} />
    </svg>
  );
};
