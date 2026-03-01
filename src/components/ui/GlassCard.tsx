"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
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
  return (
    <motion.div
      variants={itemVariants}
      whileHover={
        hover ? { y: -4, transition: { duration: 0.25 } } : undefined
      }
      className={cn(
        "glass neon-border rounded-xl p-6 transition-all duration-300",
        hover && "hover:shadow-[0_0_25px_rgba(255,23,68,0.12)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
