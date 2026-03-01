"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function SectionWrapper({
  id,
  children,
  className,
  title,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={cn("relative py-20 md:py-28 px-4 sm:px-6 lg:px-8", className)}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mx-auto max-w-6xl">
        {title && (
          <motion.div variants={titleVariants} className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-gradient">{title}</span>
            </h2>
            <div className="neon-line mx-auto mt-4 w-24" />
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
