"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PointerEvent } from "react";
import { useI18n } from "@/components/I18nProvider";
import { projects, type Project } from "@/data/portfolio";
import DirectionalArrow from "@/components/ui/DirectionalArrow";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";

function GithubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

const cardSpans = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-6",
  "md:col-span-6",
];

function ProjectCard({
  project,
  index,
  title,
  description,
  viewCode,
}: {
  project: Project;
  index: number;
  title: string;
  description: string;
  viewCode: string;
}) {
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      variants={itemVariants}
      onPointerMove={handlePointerMove}
      whileHover={reduceMotion ? undefined : { y: -8, transition: { duration: 0.28 } }}
      className={`${cardSpans[index] ?? "md:col-span-6"} spotlight-card glass neon-border group relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl transition-shadow duration-500 hover:shadow-[0_24px_80px_rgba(255,23,68,0.12)]`}
    >
      <div className="relative h-40 overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/70">
        <div className="project-visual-grid absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-br from-neon-red/[0.08] via-transparent to-neon-purple/[0.08]" />
        <motion.div
          aria-hidden="true"
          className="absolute -end-12 -top-16 h-44 w-44 rounded-full border border-neon-red/25"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 22 + index * 2, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute -start-1 top-1/2 h-2 w-2 rounded-full bg-neon-red shadow-[0_0_12px_rgba(255,23,68,0.8)]" />
        </motion.div>
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-20 end-8 h-36 w-36 rounded-full border border-neon-purple/25"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 18 + index, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-red">
              {project.category}
            </p>
            <p className="mt-2 font-mono text-xs text-[var(--text-secondary)]">{project.highlight}</p>
          </div>
          <span className="font-mono text-4xl font-black tracking-tighter text-[var(--text-primary)]/[0.08] transition-colors group-hover:text-neon-red/[0.16]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-5 start-5 flex items-center gap-1.5">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-neon-red/50"
              animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: dot * 0.25 }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-300 group-hover:text-neon-red">
            {title}
          </h3>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-1 hover:border-neon-red/50 hover:bg-neon-red/10 hover:text-neon-red"
              aria-label={`${viewCode} - ${title}`}
            >
              <GithubIcon />
            </a>
          ) : (
            <span className="rounded-full border border-[var(--border-color)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)]">
              {project.status ?? "Private"}
            </span>
          )}
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-neon-red/15 bg-neon-red/[0.035] px-3 py-1 text-[10px] font-medium text-[var(--text-secondary)] transition-all duration-300 group-hover:border-neon-red/25 group-hover:text-neon-red"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-neon-red"
          >
            {viewCode}
            <DirectionalArrow
              direction="up-right"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useI18n();

  return (
    <SectionWrapper id="projects" title={t.projects.title}>
      <motion.div variants={itemVariants} className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          Selected work across product engineering, system design, applied AI, full-stack development, and infrastructure.
        </p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-12">
        {projects.map((project, index) => {
          const localized = t.projects.items[index];
          return (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              title={localized?.title ?? project.title}
              description={localized?.description ?? project.description}
              viewCode={t.projects.viewCode}
            />
          );
        })}
      </div>

      <motion.div variants={itemVariants} className="mt-10 flex justify-center">
        <motion.a
          href="https://github.com/AbdulWasayUl?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all hover:border-neon-red/40 hover:text-neon-red"
        >
          <GithubIcon />
          Explore public repositories
          <DirectionalArrow
            direction="right"
            className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1"
          />
        </motion.a>
      </motion.div>
    </SectionWrapper>
  );
}
