"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-red/50 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: cn(
      "bg-neon-red/10 text-neon-red border border-neon-red/40",
      "hover:bg-neon-red/20 hover:border-neon-red/70 hover:shadow-[0_0_20px_rgba(255,23,68,0.3)]",
      "dark:bg-neon-red/10 dark:hover:bg-neon-red/20"
    ),
    secondary: cn(
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-color)]",
      "hover:border-neon-red/50 hover:text-neon-red hover:shadow-[0_0_15px_rgba(255,23,68,0.15)]"
    ),
    ghost: cn(
      "bg-transparent text-[var(--text-secondary)]",
      "hover:text-neon-red hover:bg-neon-red/5"
    ),
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as Record<string, unknown>)}
    >
      {content}
    </motion.button>
  );
}
