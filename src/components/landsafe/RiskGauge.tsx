import { RISK_STYLES } from "@/lib/risk";
import type { RiskLevel } from "@/types/landsafe";

export function RiskGauge({
  score,
  level,
  size = 180,
  caption,
}: {
  score: number;
  level: RiskLevel;
  size?: number;
  caption?: string;
}) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const circumference = Math.PI * r; // semicircle
  const offset = circumference * (1 - Math.min(100, Math.max(0, score)) / 100);
  const s = RISK_STYLES[level];

  return (
    <div className="flex flex-col items-center" role="img" aria-label={`Risk score ${score} of 100, ${level}`}>
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        <path
          d={`M ${stroke / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${stroke / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2}`}
          fill="none"
          stroke={s.hex}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms ease-out" }}
        />
      </svg>
      <div className="-mt-8 text-center">
        <p className="num text-4xl font-semibold tracking-tight">{score}</p>
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">/ 100</p>
        <p className={`mt-1 text-sm font-semibold ${s.text}`}>{level} RISK</p>
        {caption && <p className="mt-1 text-xs text-muted-foreground">{caption}</p>}
      </div>
    </div>
  );
}
