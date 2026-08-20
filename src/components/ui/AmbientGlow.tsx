"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export default function AmbientGlow() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: PointerEvent) => {
      x.set(event.clientX - 260);
      y.set(event.clientY - 260);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-0 hidden h-[520px] w-[520px] rounded-full bg-neon-red/[0.035] blur-[110px] dark:bg-neon-red/[0.05] lg:block"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
