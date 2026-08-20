"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PointerEvent, ReactNode } from "react";
import { itemVariants } from "./SectionWrapper";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      variants={itemVariants}
      onPointerMove={handlePointerMove}
      whileHover={
        hover
          ? {
              y: -6,
              rotateX: 1.5,
              rotateY: -1.5,
              transition: { duration: 0.25 },
            }
          : undefined
      }
      className={cn(
        "spotlight-card glass neon-border rounded-xl p-6 transition-all duration-300",
        hover && "hover:shadow-[0_0_25px_rgba(255,23,68,0.12)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
