"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const TIME_ZONE = "Asia/Karachi";

type Presence = {
  label: string;
  detail: string;
  icon: "moon" | "sunrise" | "work" | "evening" | "night";
};

function getIslamabadHour(date: Date) {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(date)
  );
}

function getPresence(date: Date): Presence {
  const hour = getIslamabadHour(date);

  if (hour < 7) {
    return { label: "Recharging", detail: "Likely sleeping", icon: "moon" };
  }
  if (hour < 9) {
    return { label: "Starting up", detail: "Morning reset", icon: "sunrise" };
  }
  if (hour < 19) {
    return { label: "In build mode", detail: "Working & shipping", icon: "work" };
  }
  if (hour < 22) {
    return { label: "Winding down", detail: "Ideas still running", icon: "evening" };
  }
  return { label: "Night owl mode", detail: "Late-session energy", icon: "night" };
}

function PresenceIcon({ icon }: { icon: Presence["icon"] }) {
  if (icon === "work") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5.5 6V4.8A1.8 1.8 0 0 1 7.3 3h5.4a1.8 1.8 0 0 1 1.8 1.8V6M3 8.2h14v7.3A1.5 1.5 0 0 1 15.5 17h-11A1.5 1.5 0 0 1 3 15.5V8.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 10.5c4.6 2.1 9.4 2.1 14 0M8 12.4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "sunrise") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 14a6 6 0 0 1 12 0M2.5 17.2h15M10 2.5v2M3.5 6.2l1.4 1.4M16.5 6.2l-1.4 1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "evening") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 14.5h14M5.2 12a4.8 4.8 0 0 1 9.6 0M10 4V2.5M3.8 6.2 5 7.4M16.2 6.2 15 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15.8 12.5A6.7 6.7 0 0 1 7.5 4.2 6.8 6.8 0 1 0 15.8 12.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      {icon === "night" && <path d="m14.8 3 .4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1Z" fill="currentColor" />}
    </svg>
  );
}

export default function LocalTimeWidget({
  variant = "inline",
  className,
}: {
  variant?: "inline" | "time" | "status";
  className?: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const time = useMemo(
    () =>
      now
        ? new Intl.DateTimeFormat("en-US", {
            timeZone: TIME_ZONE,
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(now)
        : "--:--",
    [now]
  );
  const presence = now
    ? getPresence(now)
    : { label: "Syncing", detail: "Islamabad time", icon: "work" as const };

  if (variant === "time") {
    return (
      <div className={cn("text-center", className)}>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neon-red">Islamabad time</p>
        <p className="mt-1 text-sm font-semibold tabular-nums text-[var(--text-primary)]">{time}</p>
      </div>
    );
  }

  if (variant === "status") {
    return (
      <div className={cn("text-center", className)}>
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-500">Current mode</p>
        <div className="mt-1 flex items-center justify-center gap-1.5 text-sm text-[var(--text-secondary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          {presence.label}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]/65 px-3 py-2 backdrop-blur-md",
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-neon-red/20 bg-neon-red/[0.07] text-neon-red [&>svg]:h-4 [&>svg]:w-4">
        <PresenceIcon icon={presence.icon} />
      </span>
      <span className="text-start">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--text-secondary)]">
          Islamabad <span className="h-1 w-1 rounded-full bg-neon-red" /> {time}
        </span>
        <span className="mt-0.5 block text-xs font-semibold text-[var(--text-primary)]">
          {presence.label} <span className="font-normal text-[var(--text-secondary)]">/ {presence.detail}</span>
        </span>
      </span>
    </div>
  );
}
