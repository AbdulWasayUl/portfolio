"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { PointerEvent } from "react";
import { useI18n } from "@/components/I18nProvider";
import { useTheme } from "@/components/ThemeProvider";
import { socialLinks } from "@/data/portfolio";
import Button from "@/components/ui/Button";
import DirectionalArrow from "@/components/ui/DirectionalArrow";
import LocalTimeWidget from "@/components/ui/LocalTimeWidget";
import SocialIcons from "@/components/ui/SocialIcons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const orbX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);
  const profileImage =
    theme === "dark"
      ? "/images/abdul-wasay-dark.png"
      : "/images/abdul-wasay-light.png";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8"
    >
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,23,68,0.08),transparent_38%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute start-[12%] top-[12%] h-80 w-80 rounded-full bg-neon-red/[0.07] blur-[110px]"
        style={reduceMotion ? undefined : { x: orbX, y: orbY }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] end-[8%] h-96 w-96 rounded-full bg-neon-purple/[0.06] blur-[130px]"
        style={reduceMotion ? undefined : { x: orbY, y: orbX }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 sm:gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="min-w-0 text-center lg:text-start"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-500 dark:text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for meaningful work
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-2 font-mono text-xs tracking-[0.24em] text-neon-red sm:text-sm"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mb-4 text-[clamp(2.7rem,12.5vw,4rem)] font-black leading-[0.93] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            <span className="animated-gradient text-gradient block bg-gradient-to-r from-neon-red via-neon-purple to-neon-red">
              <span className="block sm:inline">{t.hero.name.split(" ")[0]}</span>
              <span className="block sm:inline">
                <span className="hidden sm:inline"> </span>
                {t.hero.name.split(" ").slice(1).join(" ")}
              </span>
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base font-semibold text-[var(--text-primary)] sm:text-2xl lg:justify-start"
          >
            <span>{t.hero.title}</span>
            <span className="font-mono text-neon-red/40">/</span>
            <span className="text-[var(--text-secondary)]">Full-spectrum product engineering</span>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg lg:mx-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button variant="primary" size="lg" onClick={() => scrollTo("projects")}>
              {t.hero.viewProjects}
              <DirectionalArrow direction="down-right" className="h-[18px] w-[18px]" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollTo("contact")}>
              {t.hero.contactMe}
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <SocialIcons links={socialLinks} />
            <span className="hidden h-5 w-px bg-[var(--border-color)] sm:block" />
            <LocalTimeWidget />
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[330px] [perspective:1000px] sm:max-w-[430px]"
        >
          <motion.div
            className="relative aspect-[4/5] rounded-[2rem] border border-neon-red/25 bg-gradient-to-br from-neon-red/[0.1] via-[var(--bg-card)] to-neon-purple/[0.08] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.24)]"
            style={reduceMotion ? undefined : { rotateX, rotateY }}
          >
            <div className="project-visual-grid pointer-events-none absolute inset-3 rounded-[1.6rem]" />
            <div className="relative h-full overflow-hidden rounded-[1.55rem] border border-white/10 bg-[var(--bg-secondary)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={profileImage}
                    alt="Abdul Wasay — Software Engineer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 1024px) 430px, 38vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-red">Currently</p>
                  <p className="mt-1 text-sm font-semibold">Building products end to end</p>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 font-mono text-[10px] text-white/70 backdrop-blur-md">
                  NUST ’25
                </div>
              </div>
            </div>

            <motion.div
              className="glass-strong absolute -start-5 top-[18%] rounded-xl px-3 py-2 shadow-xl"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">Engineering</p>
              <p className="mt-0.5 text-xs font-semibold text-neon-red">Systems · Product · Intelligence</p>
            </motion.div>

            <motion.div
              className="glass-strong absolute -end-5 bottom-[22%] rounded-xl px-3 py-2 shadow-xl"
              animate={reduceMotion ? undefined : { y: [0, 9, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">Full spectrum</p>
              <p className="mt-0.5 text-xs font-semibold text-neon-purple">Full Stack · AI · DevOps</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to about section"
        onClick={() => scrollTo("about")}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 0.6 }}
        whileHover={reduceMotion ? undefined : { y: 3 }}
        className="group absolute bottom-5 start-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]/75 py-2 pe-2 ps-4 shadow-lg backdrop-blur-md transition-colors hover:border-neon-red/35 lg:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text-primary)]">Explore</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-red text-white shadow-[0_0_16px_rgba(255,23,68,0.28)]">
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <DirectionalArrow direction="down" className="h-[18px] w-[18px]" />
          </motion.span>
        </span>
      </motion.button>
    </section>
  );
}
