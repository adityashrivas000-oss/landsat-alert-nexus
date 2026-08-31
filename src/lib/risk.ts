import type { RiskLevel } from "@/types/landsafe";

export const RISK_STYLES: Record<
  RiskLevel,
  { badge: string; text: string; bar: string; hex: string; dot: string; ring: string; label: string }
> = {
  LOW: {
    badge: "bg-risk-low-soft text-risk-low border-risk-low/30",
    text: "text-risk-low",
    bar: "bg-risk-low",
    hex: "var(--risk-low)",
    dot: "bg-risk-low",
    ring: "ring-risk-low/30",
    label: "Low",
  },
  MEDIUM: {
    badge: "bg-risk-medium-soft text-risk-high border-risk-medium/40",
    text: "text-risk-high",
    bar: "bg-risk-medium",
    hex: "var(--risk-medium)",
    dot: "bg-risk-medium",
    ring: "ring-risk-medium/30",
    label: "Medium",
  },
  HIGH: {
    badge: "bg-risk-high-soft text-risk-high border-risk-high/30",
    text: "text-risk-high",
    bar: "bg-risk-high",
    hex: "var(--risk-high)",
    dot: "bg-risk-high",
    ring: "ring-risk-high/30",
    label: "High",
  },
  CRITICAL: {
    badge: "bg-risk-critical-soft text-risk-critical border-risk-critical/30",
    text: "text-risk-critical",
    bar: "bg-risk-critical",
    hex: "var(--risk-critical)",
    dot: "bg-risk-critical",
    ring: "ring-risk-critical/30",
    label: "Critical",
  },
};

export function relativeTime(iso: string): string {
  const diff = Date.parse("2026-08-31T06:00:00.000Z") - Date.parse(iso);
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${Math.max(1, mins)} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.round(hours / 24)} d ago`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}
