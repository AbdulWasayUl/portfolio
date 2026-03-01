"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import { projects } from "@/data/portfolio";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";

function GithubIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Projects() {
  const { t } = useI18n();

  return (
    <SectionWrapper id="projects" title={t.projects.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const item = t.projects.items[index];
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group glass neon-border rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,23,68,0.15)]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neon-red/10">
                  <svg
                    className="h-6 w-6 text-neon-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] transition-colors hover:text-neon-red"
                  aria-label={`${t.projects.viewCode} - ${item?.title}`}
                >
                  <GithubIcon />
                </a>
              </div>

              <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-neon-red">
                {item?.title}
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item?.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neon-red/20 bg-neon-red/5 px-3 py-1 text-xs font-medium text-neon-red"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-neon-red transition-all hover:gap-3"
              >
                <GithubIcon />
                {t.projects.viewCode}
                <svg
                  className="h-3 w-3 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </a>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
