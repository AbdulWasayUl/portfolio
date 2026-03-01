"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { skillCategories, education } from "@/data/portfolio";
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
    tools: t.about.categories.tools,
  };

  return (
    <SectionWrapper id="about" title={t.about.title}>
      {/* Bio */}
      <motion.p
        variants={itemVariants}
        className="mx-auto mb-14 max-w-3xl text-center text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
      >
        {t.about.description}
      </motion.p>

      {/* Education */}
      <motion.div variants={itemVariants} className="mb-14">
        <GlassCard hover={false} className="mx-auto max-w-2xl text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 text-neon-red"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
              />
            </svg>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {t.about.education}
            </h3>
          </div>
          <p className="text-sm font-medium text-neon-red">
            {education.university}
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {t.about.educationDetail}
          </p>
        </GlassCard>
      </motion.div>

      {/* Skills */}
      <motion.h3
        variants={itemVariants}
        className="mb-8 text-center text-xl font-bold text-[var(--text-primary)] sm:text-2xl"
      >
        {t.about.skills}
      </motion.h3>

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
                  className="rounded-md border border-[var(--border-color)] bg-neon-red/[0.03] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-neon-red/30 hover:text-neon-red"
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
