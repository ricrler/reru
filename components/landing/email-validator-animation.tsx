"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Check, Clock, HardDrive, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HoloTimelineConnector } from "@/components/landing/holo-timeline-connector";

type LogVariant = "valid" | "invalid" | "bounce" | "storage_full";

type LogTemplate = {
  variant: LogVariant;
  status: string;
  email: string;
  detail: { label: string; value: string };
};

const LOG_POOL: LogTemplate[] = [
  {
    variant: "valid",
    status: "Valid Email",
    email: "mia@acme.co",
    detail: { label: "check", value: "MX verified" },
  },
  {
    variant: "invalid",
    status: "Invalid Email",
    email: "invalid@@mail.com",
    detail: { label: "reason", value: "Syntax error" },
  },
  {
    variant: "bounce",
    status: "Bounce",
    email: "olivia@dead-domain.dev",
    detail: { label: "type", value: "Hard bounce" },
  },
  {
    variant: "storage_full",
    status: "Storage Full",
    email: "liam@company.io",
    detail: { label: "mailbox", value: "Quota exceeded" },
  },
  {
    variant: "valid",
    status: "Valid Email",
    email: "jackson@startup.com",
    detail: { label: "check", value: "Syntax OK" },
  },
  {
    variant: "invalid",
    status: "Invalid Email",
    email: "not-an-email",
    detail: { label: "reason", value: "Missing @" },
  },
];

type LogEntry = LogTemplate & { id: number; at: string };

function formatLogTime(date: Date) {
  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "");
}

function variantTone(variant: LogVariant): "green" | "red" | "yellow" {
  if (variant === "valid") return "green";
  if (variant === "storage_full") return "yellow";
  return "red";
}

const HOLO_PILL: Record<LogVariant, string> = {
  valid:
    "bg-[linear-gradient(125deg,#f0fdfa_0%,#99f6e4_45%,#5eead4_70%,#67e8f9_100%)] text-transparent [background-clip:text] [-webkit-background-clip:text] [filter:drop-shadow(0_0_10px_rgba(94,234,212,0.75))]",
  invalid:
    "bg-[linear-gradient(125deg,#fff1f2_0%,#fecdd3_45%,#fb7185_75%,#fdba74_100%)] text-transparent [background-clip:text] [-webkit-background-clip:text] [filter:drop-shadow(0_0_10px_rgba(251,113,133,0.75))]",
  bounce:
    "bg-[linear-gradient(125deg,#fff1f2_0%,#fecdd3_45%,#fb7185_75%,#fdba74_100%)] text-transparent [background-clip:text] [-webkit-background-clip:text] [filter:drop-shadow(0_0_10px_rgba(251,113,133,0.75))]",
  storage_full:
    "bg-[linear-gradient(125deg,#fefce8_0%,#fef08a_40%,#fde047_75%,#fbbf24_100%)] text-transparent [background-clip:text] [-webkit-background-clip:text] [filter:drop-shadow(0_0_12px_rgba(253,224,71,0.85))]",
};

const HOLO_GLOW: Record<LogVariant, string> = {
  valid: "shadow-[0_0_28px_rgba(94,234,212,0.25)]",
  invalid: "shadow-[0_0_28px_rgba(251,113,133,0.28)]",
  bounce: "shadow-[0_0_28px_rgba(251,113,133,0.28)]",
  storage_full: "shadow-[0_0_30px_rgba(253,224,71,0.32)]",
};

const HOLO_ICON_BG: Record<LogVariant, string> = {
  valid:
    "bg-[linear-gradient(145deg,rgba(94,234,212,0.35),rgba(16,185,129,0.12),rgba(34,211,238,0.28))]",
  invalid:
    "bg-[linear-gradient(145deg,rgba(251,113,133,0.38),rgba(244,63,94,0.14),rgba(249,115,22,0.22))]",
  bounce:
    "bg-[linear-gradient(145deg,rgba(251,113,133,0.38),rgba(244,63,94,0.14),rgba(249,115,22,0.22))]",
  storage_full:
    "bg-[linear-gradient(145deg,rgba(253,224,71,0.42),rgba(250,204,21,0.16),rgba(251,191,36,0.3))]",
};

const HOLO_ICON_FG: Record<LogVariant, string> = {
  valid: "text-white drop-shadow-[0_0_10px_rgba(167,243,208,1)]",
  invalid: "text-white drop-shadow-[0_0_10px_rgba(253,164,175,1)]",
  bounce: "text-white drop-shadow-[0_0_10px_rgba(253,164,175,1)]",
  storage_full: "text-white drop-shadow-[0_0_10px_rgba(253,224,71,1)]",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-center rounded-md bg-white/[0.14] px-2 py-0.5 font-mono text-[12px] text-white shadow-[0_0_20px_rgba(255,255,255,0.12)] backdrop-blur-sm">
      {children}
    </span>
  );
}

function StatusIcon({ variant }: { variant: LogVariant }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl backdrop-blur-md",
        HOLO_ICON_BG[variant],
        HOLO_GLOW[variant]
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(120deg,rgba(255,255,255,0.35)_0%,transparent_45%,rgba(255,255,255,0.08)_100%)] opacity-60"
        aria-hidden
      />
      {variant === "valid" ? (
        <Check className={cn("relative h-4 w-4", HOLO_ICON_FG[variant])} strokeWidth={2.5} />
      ) : variant === "invalid" ? (
        <X className={cn("relative h-4 w-4", HOLO_ICON_FG[variant])} strokeWidth={2.5} />
      ) : variant === "bounce" ? (
        <AlertTriangle className={cn("relative h-4 w-4", HOLO_ICON_FG[variant])} strokeWidth={2} />
      ) : (
        <HardDrive className={cn("relative h-4 w-4", HOLO_ICON_FG[variant])} strokeWidth={2} />
      )}
    </div>
  );
}

function ActivityRow({
  entry,
  showLine,
}: {
  entry: LogEntry;
  showLine: boolean;
}) {
  return (
    <article className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <StatusIcon variant={entry.variant} />
        {showLine ? (
          <div className="mt-2">
            <HoloTimelineConnector tone={variantTone(entry.variant)} pulse />
          </div>
        ) : null}
      </div>

      <div className="min-w-0 flex-1 pb-6 pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="rounded-full bg-white/[0.1] px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm">
            <span className={cn("inline-block", HOLO_PILL[entry.variant])}>
              {entry.status}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-white/70">
            <Clock className="h-3 w-3 text-white/75" strokeWidth={2} />
            {entry.at}
          </span>
        </div>

        <p className="mt-2.5 text-[13px] leading-relaxed text-white/88">
          <Chip>{entry.email}</Chip>
          {" · "}
          {entry.detail.label}{" "}
          <Chip>{entry.detail.value}</Chip>
        </p>
      </div>
    </article>
  );
}

function seedEntries(atBaseMs: number): LogEntry[] {
  return LOG_POOL.slice(0, 3).map((item, i) => ({
    ...item,
    id: i,
    at: formatLogTime(new Date(atBaseMs - (2 - i) * 48_000)),
  }));
}

const FALLBACK_ENTRIES: LogEntry[] = LOG_POOL.slice(0, 3).map((item, i) => ({
  ...item,
  id: i,
  at: "Nov 22 07:38:00",
}));

export function EmailValidatorAnimation() {
  const [entries, setEntries] = useState<LogEntry[]>(FALLBACK_ENTRIES);
  const cursorRef = useRef(3);
  useEffect(() => {
    const now = Date.now();
    setEntries(seedEntries(now));
    cursorRef.current = 3;
  }, []);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const interval = setInterval(() => {
      const poolIndex = cursorRef.current % LOG_POOL.length;
      const id = cursorRef.current + 1;
      cursorRef.current += 1;
      const next: LogEntry = {
        ...LOG_POOL[poolIndex]!,
        id,
        at: formatLogTime(new Date(Date.now())),
      };

      setEntries((prev) => [...prev.slice(1), next].slice(-3));
    }, 3400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-[min(380px,56vh)] w-full max-w-lg justify-self-end lg:max-w-xl"
      style={{ perspective: "1400px" }}
    >
      <div
        className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(94,234,212,0.06),transparent_55%),radial-gradient(ellipse_50%_40%_at_30%_70%,rgba(251,113,133,0.05),transparent_50%)]"
        aria-hidden
      />

      <div
        className="relative h-full overflow-hidden [transform-style:preserve-3d]"
        style={{ transform: "rotateX(14deg) rotateY(-16deg) rotateZ(0.5deg)" }}
      >
        <div className="flex h-full flex-col justify-end pl-1 pr-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {entries.map((entry, index) => {
              const lift = index;
              const isLast = index === entries.length - 1;
              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 72,
                    x: -28,
                    z: -48,
                    rotateX: 18,
                  }}
                  animate={{
                    opacity: 1 - lift * 0.03,
                    y: 0,
                    x: lift * 14,
                    z: lift * 12,
                    rotateX: 6 - lift * 1.5,
                  }}
                  exit={{
                    opacity: 0,
                    y: -64,
                    x: 32,
                    z: 24,
                    rotateX: -8,
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full [transform-style:preserve-3d]"
                >
                  <ActivityRow entry={entry} showLine={!isLast} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}