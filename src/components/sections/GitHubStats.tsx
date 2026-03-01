"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";

interface GitHubData {
  totalRepos: number;
  totalCommits: number;
  totalPRs: number;
  totalReviews: number;
}

const GITHUB_USERNAME = "AbdulWasayUl";

function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count}</>;
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="glass neon-border flex flex-col items-center gap-2 rounded-xl px-4 py-5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,23,68,0.12)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-red/10 text-neon-red">
        {icon}
      </div>
      <span className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
        <CountUp target={value} />
      </span>
      <span className="text-center text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </span>
    </motion.div>
  );
}

function RepoIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  );
}

function CommitIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function PRIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  );
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="glass neon-border flex h-28 animate-pulse items-center justify-center rounded-xl"
              >
                <div className="h-8 w-16 rounded bg-neon-red/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <SectionWrapper id="github-stats" className="py-12 md:py-16">
      <motion.div variants={itemVariants} className="mb-6 flex items-center justify-center gap-2">
        <svg className="h-5 w-5 text-neon-red" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-neon-red"
        >
          @{GITHUB_USERNAME}
        </a>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Repositories" value={data.totalRepos} icon={<RepoIcon />} />
        <StatCard label="Commits" value={data.totalCommits} icon={<CommitIcon />} />
        <StatCard label="Pull Requests" value={data.totalPRs} icon={<PRIcon />} />
        <StatCard label="Code Reviews" value={data.totalReviews} icon={<ReviewIcon />} />
      </div>
    </SectionWrapper>
  );
}
