"use client";

import { motion, useReducedMotion } from "framer-motion";

const technologies = [
  "GO",
  "PYTHON",
  "KAFKA",
  "CLICKHOUSE",
  "REACT",
  "FASTAPI",
  "MONGODB",
  "PYTORCH",
  "DOCKER",
  "KUBERNETES",
];

function MarqueeSet() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {technologies.map((technology) => (
        <div key={technology} className="flex items-center">
          <span className="px-5 font-mono text-xs font-medium tracking-[0.24em] text-[var(--text-secondary)] sm:px-8 sm:text-sm">
            {technology}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 border border-neon-red/70" />
        </div>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/50 py-4">
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />
      <motion.div
        className="flex w-max"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        <MarqueeSet />
        <MarqueeSet />
      </motion.div>
    </div>
  );
}
