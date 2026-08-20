"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { socialLinks } from "@/data/portfolio";
import DirectionalArrow from "@/components/ui/DirectionalArrow";
import SocialIcons from "@/components/ui/SocialIcons";

export default function Footer() {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border-color)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
        {/* Copyright */}
        <p className="text-sm text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} {t.footer.copyright}
        </p>

        {/* Social icons */}
        <SocialIcons links={socialLinks} size="sm" />

        {/* Back to top */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition-all hover:border-neon-red/40 hover:text-neon-red hover:shadow-[0_0_10px_rgba(255,23,68,0.15)]"
          aria-label={t.footer.backToTop}
        >
          <DirectionalArrow direction="up" className="h-[18px] w-[18px]" />
          {t.footer.backToTop}
        </motion.button>
      </div>
    </footer>
  );
}
