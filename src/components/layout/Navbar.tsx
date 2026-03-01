"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useI18n } from "@/components/I18nProvider";
import { LOCALE_NAMES, SUPPORTED_LOCALES, type Locale } from "@/i18n";

const navItems = ["home", "about", "experience", "projects", "contact"] as const;

function SunIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    experience: t.nav.experience,
    projects: t.nav.projects,
    contact: t.nav.contact,
  };

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id === "home" ? "hero" : id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("home")}
            className="text-lg font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="neon-text">AW</span>
            <span className="text-[var(--text-secondary)]">.</span>
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-all duration-300 hover:bg-neon-red/5 hover:text-neon-red"
              >
                {navLabels[item]}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language picker */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-neon-red/40 hover:text-neon-red"
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <GlobeIcon />
                <span className="hidden sm:inline">{LOCALE_NAMES[locale]}</span>
              </motion.button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="glass-strong absolute end-0 top-full z-50 mt-2 w-44 rounded-xl p-2 shadow-xl"
                    >
                      {SUPPORTED_LOCALES.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setLocale(loc as Locale);
                            setLangOpen(false);
                          }}
                          className={`w-full rounded-lg px-3 py-2 text-start text-sm transition-all ${
                            loc === locale
                              ? "bg-neon-red/10 font-medium text-neon-red"
                              : "text-[var(--text-secondary)] hover:bg-neon-red/5 hover:text-neon-red"
                          }`}
                        >
                          {LOCALE_NAMES[loc as Locale]}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-all hover:border-neon-red/40 hover:text-neon-red"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] transition-all hover:border-neon-red/40 hover:text-neon-red md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-lg md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-6"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  onClick={() => scrollToSection(item)}
                  className="text-2xl font-semibold text-[var(--text-primary)] transition-colors hover:text-neon-red"
                >
                  {navLabels[item]}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
