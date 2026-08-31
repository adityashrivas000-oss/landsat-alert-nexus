import { useState } from "react";
import { RISK_STYLES } from "@/lib/risk";
import { RISK_LEVELS } from "@/data/mockData";
import type { Location, NEState } from "@/types/landsafe";
import { cn } from "@/lib/utils";

const STATE_SHAPES: { state: NEState; d: string; labelX: number; labelY: number }[] = [
  { state: "Sikkim", d: "M1,17 L9,14 L11,24 L7,31 L1,27 Z", labelX: 5.5, labelY: 23 },
  {
    state: "Arunachal Pradesh",
    d: "M36,25 L44,9 L60,5 L78,7 L93,13 L90,24 L76,25 L62,29 L48,29 Z",
    labelX: 66,
    labelY: 17,
  },
  {
    state: "Assam",
    d: "M23,44 L34,36 L48,31 L62,30 L76,26 L88,27 L86,37 L74,41 L66,43 L64,57 L56,58 L52,50 L38,50 L27,51 Z",
    labelX: 44,
    labelY: 39,
  },
  { state: "Meghalaya", d: "M24,52 L50,50 L53,62 L38,66 L26,64 Z", labelX: 37, labelY: 58 },
  { state: "Nagaland", d: "M76,35 L87,33 L89,49 L79,52 Z", labelX: 82.5, labelY: 42 },
  { state: "Manipur", d: "M76,54 L89,52 L90,68 L78,70 Z", labelX: 83, labelY: 61 },
  { state: "Mizoram", d: "M66,70 L79,69 L77,93 L69,93 Z", labelX: 72.5, labelY: 81 },
  { state: "Tripura", d: "M53,66 L66,64 L67,79 L57,83 Z", labelX: 60, labelY: 73 },
];

export function NEIndiaMap({
  locations,
  selectedId,
  onSelect,
  highlightState = "ALL",
  className,
  height = 520,
}: {
  locations: Location[];
  selectedId?: string | null;
  onSelect?: (location: Location) => void;
  highlightState?: NEState | "ALL";
  className?: string;
  height?: number;
}) {
  const [hovered, setHovered] = useState<Location | null>(null);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full rounded-lg border border-border bg-[oklch(0.975_0.008_240)]"
        style={{ height }}
        role="img"
        aria-label="Schematic risk map of Northeast India with demo monitoring locations"
      >
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0 L0 0 0 5" fill="none" stroke="var(--border)" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {STATE_SHAPES.map((s) => {
          const dim = highlightState !== "ALL" && highlightState !== s.state;
          return (
            <g key={s.state} opacity={dim ? 0.28 : 1} style={{ transition: "opacity 250ms" }}>
              <path
                d={s.d}
                fill="oklch(0.93 0.015 250)"
                stroke="var(--navy-muted)"
                strokeWidth="0.35"
                strokeLinejoin="round"
              />
              <text
                x={s.labelX}
                y={s.labelY}
                textAnchor="middle"
                fontSize="1.9"
                fill="var(--navy-muted)"
                style={{ pointerEvents: "none", fontWeight: 600 }}
              >
                {s.state}
              </text>
            </g>
          );
        })}

        {locations.map((l) => {
          const s = RISK_STYLES[l.risk.level];
          const active = selectedId === l.id || hovered?.id === l.id;
          const r = l.risk.score >= 80 ? 1.9 : l.risk.score >= 60 ? 1.6 : 1.3;
          return (
            <g
              key={l.id}
              transform={`translate(${l.x} ${l.y})`}
              className="cursor-pointer"
              onMouseEnter={() => setHovered(l)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect?.(l)}
              tabIndex={0}
              role="button"
              aria-label={`${l.name}, ${l.state}. Risk ${l.risk.level}, score ${l.risk.score}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect?.(l);
              }}
            >
              {l.risk.score >= 80 && (
                <circle r={r * 2.4} fill={s.hex} opacity={0.18}>
                  <animate attributeName="r" values={`${r};${r * 3};${r}`} dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                r={active ? r * 1.5 : r}
                fill={s.hex}
                stroke="white"
                strokeWidth="0.4"
                style={{ transition: "r 180ms ease-out" }}
              />
            </g>
          );
        })}
      </svg>

      {hovered && (
        <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-border bg-surface/95 px-3 py-2 text-xs shadow-[var(--shadow-raised)] backdrop-blur">
          <p className="font-semibold">{hovered.name}</p>
          <p className="text-muted-foreground">{hovered.state}</p>
          <p className={cn("num mt-1 font-semibold", RISK_STYLES[hovered.risk.level].text)}>
            {hovered.risk.level} · {hovered.risk.score}/100
          </p>
        </div>
      )}

      <MapLegend className="absolute bottom-3 right-3" />
    </div>
  );
}

export function MapLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-surface/95 px-3 py-2 shadow-[var(--shadow-card)] backdrop-blur",
        className,
      )}
    >
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Risk legend
      </p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {RISK_LEVELS.map((lvl) => (
          <li key={lvl} className="flex items-center gap-1.5 text-[11px] font-medium">
            <span className={cn("size-2 rounded-full", RISK_STYLES[lvl].dot)} aria-hidden />
            {lvl}
          </li>
        ))}
      </ul>
    </div>
  );
}
