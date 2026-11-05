import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { cn } from "@/lib/utils";

/** Bottom-left "Sound on/off" pill with animated bars. Off by default. */
const SoundToggle = () => {
  const [on, setOn] = useState(sound.on);
  useEffect(() => {
    const unsub = sound.subscribe(setOn);
    return () => {
      unsub();
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2 }}
      onClick={() => sound.set(!on)}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      className={cn(
        "fixed bottom-5 left-5 z-50 flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs backdrop-blur-xl transition-colors",
        on ? "border-primary/50 bg-primary/10 text-foreground" : "border-foreground/10 bg-background/70 text-muted-foreground hover:text-foreground",
      )}
    >
      <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className={cn("w-[2px] rounded-full", on ? "bg-primary" : "bg-foreground/40")}
            animate={on ? { height: ["30%", "100%", "45%", "80%", "30%"] } : { height: "30%" }}
            transition={on ? { duration: 1.1 + i * 0.15, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
            style={{ height: "30%" }}
          />
        ))}
      </span>
      <span className="font-mono uppercase tracking-[0.14em]">Sound {on ? "on" : "off"}</span>
    </motion.button>
  );
};

export default SoundToggle;
