"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { experiences, formatDateRange } from "@/data/portfolio";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";

export default function Experience() {
  const { t } = useI18n();

  return (
    <SectionWrapper id="experience" title={t.experience.title}>
      <div className="relative mx-auto max-w-3xl">
        {/* Timeline line */}
        <motion.div
          className="absolute start-6 top-0 bottom-0 hidden w-px origin-top bg-gradient-to-b from-neon-red/70 via-neon-red/25 to-transparent md:start-1/2 md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {experiences.map((exp, index) => {
          const job = t.experience.jobs[index];
          const locationLabel =
            exp.location === "remote"
              ? t.experience.remote
              : exp.location;

          return (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className={`group/exp relative mb-12 last:mb-0 md:flex ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute start-6 top-6 z-10 hidden md:start-1/2 md:block md:-translate-x-1/2">
                <motion.div
                  className="h-4 w-4 rounded-full border-2 border-neon-red bg-[var(--bg-primary)] transition-all duration-300 group-hover/exp:bg-neon-red group-hover/exp:shadow-[0_0_12px_rgba(255,23,68,0.5)]"
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>

              {/* Card */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:me-auto" : "md:ms-auto"
                }`}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25 } }}
                  className="spotlight-card glass neon-border relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_55px_rgba(255,23,68,0.1)]"
                >
                  <div className="mb-4 flex items-center gap-3" aria-hidden="true">
                    <span className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-neon-red/25 bg-neon-red/[0.07] font-mono text-[10px] font-bold tracking-wider text-neon-red">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-neon-red/30 to-transparent" />
                  </div>
                  {/* Header */}
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] transition-colors duration-300 group-hover/exp:text-neon-red">
                        {job?.role}
                      </h3>
                      <p className="text-sm font-medium text-neon-red">
                        {exp.company}{" "}
                        <span className="text-[var(--text-secondary)]">
                          — {locationLabel}
                        </span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-neon-red/20 bg-neon-red/5 px-3 py-1 text-xs font-medium text-neon-red">
                      {formatDateRange(
                        exp.startDate,
                        exp.endDate,
                        t.experience.present
                      )}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-3 text-sm text-[var(--text-secondary)]">
                    {job?.description}
                  </p>

                  {/* Achievements */}
                  <ul className="mb-4 space-y-2">
                    {job?.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-red/60" />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[var(--border-color)] bg-neon-red/[0.03] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
