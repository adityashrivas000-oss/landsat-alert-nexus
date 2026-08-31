import { cn } from "@/lib/utils";
import { RISK_STYLES } from "@/lib/risk";
import type { RiskLevel } from "@/types/landsafe";

export function RiskBadge({
  level,
  score,
  size = "sm",
  className,
}: {
  level: RiskLevel;
  score?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const s = RISK_STYLES[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wide",
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        s.badge,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden />
      {level}
      {score !== undefined && <span className="num opacity-80">· {score}</span>}
    </span>
  );
}
