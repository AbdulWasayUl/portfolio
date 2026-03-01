"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import GitHubStats from "@/components/sections/GitHubStats";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import CustomCursor from "@/components/ui/CustomCursor";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="scan-line relative min-h-screen"
      >
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          {/* <GitHubStats /> */}
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
