"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import {
  currentFocus,
  education,
  profileHighlights,
  skillCategories,
} from "@/data/portfolio";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";

export default function About() {
  const { t } = useI18n();

  const categoryLabels: Record<string, string> = {
    languages: t.about.categories.languages,
    backend: t.about.categories.backend,
    frontend: t.about.categories.frontend,
    databases: t.about.categories.databases,
    devops: t.about.categories.devops,
    aiml: t.about.categories.aiml,
    architecture: t.about.categories.architecture,
    tools: t.about.categories.tools,
  };

  return (
    <SectionWrapper id="about" title={t.about.title}>
      <div className="mb-16 grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div variants={itemVariants}>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-neon-red">
            Engineer · Builder · Problem solver
          </p>
          <p className="text-xl font-medium leading-relaxed text-[var(--text-primary)] sm:text-2xl">
            {t.about.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
            <span className="rounded-full border border-[var(--border-color)] px-3 py-1.5">Based in Islamabad</span>
            <span className="rounded-full border border-[var(--border-color)] px-3 py-1.5">Open to collaboration</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {profileHighlights.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5, scale: 1.015 }}
              className="spotlight-card glass neon-border group relative overflow-hidden rounded-xl p-5"
            >
              <span className="absolute end-3 top-2 font-mono text-[10px] text-neon-red/35">
                0{index + 1}
              </span>
              <p className="text-3xl font-black tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-neon-red sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mb-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-red">Now exploring</p>
            <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Where I’m going deeper</h3>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent sm:block" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {currentFocus.map((focus) => (
            <GlassCard key={focus.index} className="group min-h-44 overflow-hidden">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-neon-red">{focus.index}</span>
                <span className="h-7 w-7 rounded-full border border-neon-red/20 transition-all duration-300 group-hover:scale-125 group-hover:border-neon-red/60 group-hover:bg-neon-red/10" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-neon-red">
                {focus.title}
              </h4>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{focus.description}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-16">
        <GlassCard hover={false} className="relative overflow-hidden p-7 sm:p-8">
          <div className="pointer-events-none absolute -end-12 -top-12 h-44 w-44 rounded-full bg-neon-red/[0.08] blur-3xl" />
          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-red/25 bg-neon-red/10 text-neon-red">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon-red">{t.about.education}</p>
                <h3 className="mt-1 text-lg font-bold text-[var(--text-primary)] sm:text-xl">{education.university}</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{t.about.educationDetail}</p>
              </div>
            </div>
            <span className="w-fit rounded-full border border-neon-red/20 bg-neon-red/5 px-4 py-2 font-mono text-xs text-neon-red">
              Graduated {education.graduationYear}
            </span>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neon-red">Toolkit</p>
          <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">{t.about.skills}</h3>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-secondary)] sm:block">Hover to inspect</span>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skillCategories.map((category) => (
          <GlassCard key={category.key}>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neon-red">
              {categoryLabels[category.key]}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-[var(--border-color)] bg-neon-red/[0.03] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-neon-red/40 hover:bg-neon-red/[0.08] hover:text-neon-red"
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
