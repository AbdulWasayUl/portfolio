"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { useTheme } from "@/components/ThemeProvider";
import { socialLinks } from "@/data/portfolio";
import Button from "@/components/ui/Button";
import SocialIcons from "@/components/ui/SocialIcons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const profileImage =
    theme === "dark"
      ? "/images/abdul-wasay-dark.png"
      : "/images/abdul-wasay-light.png";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-20 sm:px-6 lg:px-8"
    >
      {/* Background effects */}
      <div className="cyber-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neon-red/[0.02] via-transparent to-transparent" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute start-1/4 top-1/4 h-72 w-72 animate-float rounded-full bg-neon-red/[0.03] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 end-1/4 h-96 w-96 rounded-full bg-neon-purple/[0.03] blur-[120px]" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
        {/* Text content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-start"
        >
          <motion.p
            variants={itemVariants}
            className="mb-2 font-mono text-sm tracking-wider text-neon-red"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="neon-text">{t.hero.name}</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="mb-6 text-xl font-semibold text-[var(--text-secondary)] sm:text-2xl md:text-3xl"
          >
            {t.hero.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] lg:mx-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollTo("projects")}
            >
              {t.hero.viewProjects}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollTo("contact")}
            >
              {t.hero.contactMe}
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-start"
          >
            <SocialIcons links={socialLinks} />
          </motion.div>
        </motion.div>

        {/* Profile image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="relative flex-shrink-0"
        >
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            {/* Glow ring */}
            <div className="absolute inset-0 animate-glow-pulse rounded-full border-2 border-neon-red/30" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-neon-red/20 via-transparent to-neon-purple/20 blur-sm" />

            {/* Image with crossfade on theme change */}
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-neon-red/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={profileImage}
                    alt="Abdul Wasay — Software Engineer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/30 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 start-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-neon-red/30 p-1.5"
        >
          <motion.div className="h-2 w-1 rounded-full bg-neon-red/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
