import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  sub,
  icon,
  accent = "navy",
  className,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  icon?: ReactNode;
  accent?: "navy" | "low" | "medium" | "high" | "critical";
  className?: string;
}) {
  const accents: Record<string, string> = {
    navy: "bg-primary-soft text-primary",
    low: "bg-risk-low-soft text-risk-low",
    medium: "bg-risk-medium-soft text-risk-high",
    high: "bg-risk-high-soft text-risk-high",
    critical: "bg-risk-critical-soft text-risk-critical",
  };
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {icon && (
          <span className={cn("grid size-8 shrink-0 place-items-center rounded-md", accents[accent])}>
            {icon}
          </span>
        )}
      </div>
      <p className="num mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
