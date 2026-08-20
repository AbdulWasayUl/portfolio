"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import TechMarquee from "@/components/ui/TechMarquee";
import AmbientGlow from "@/components/ui/AmbientGlow";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        className="scan-line relative min-h-screen"
      >
        <ScrollProgress />
        <AmbientGlow />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <TechMarquee />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
