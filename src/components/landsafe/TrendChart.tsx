import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RISK_STYLES } from "@/lib/risk";
import type { RiskLevel } from "@/types/landsafe";

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 8,
    border: "1px solid var(--border)",
    background: "var(--surface)",
    fontSize: 12,
    color: "var(--foreground)",
  },
};

export function RiskTrendChart({
  data,
  height = 260,
  xKey = "date",
}: {
  data: { score: number; [k: string]: string | number }[];
  height?: number;
  xKey?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey={xKey}
          {...axis}
          tickFormatter={(v: string) => (xKey === "date" ? v.slice(5) : v)}
        />
        <YAxis domain={[0, 100]} {...axis} width={38} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="score"
          name="Risk score"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#riskFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PredictionChart({
  data,
  height = 260,
}: {
  data: { label: string; score: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="label" {...axis} />
        <YAxis domain={[0, 100]} {...axis} width={38} />
        <Tooltip {...tooltipStyle} />
        <Line
          type="monotone"
          dataKey="score"
          name="Predicted score"
          stroke="var(--chart-2)"
          strokeWidth={2}
          strokeDasharray="6 4"
          dot={{ r: 3, fill: "var(--chart-2)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DistributionChart({
  data,
  height = 240,
  levelKey = "level",
}: {
  data: { [k: string]: string | number; count: number }[];
  height?: number;
  levelKey?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={levelKey} {...axis} />
        <YAxis {...axis} width={34} allowDecimals={false} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey="count" name="Locations" radius={[4, 4, 0, 0]}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={RISK_STYLES[(d[levelKey] as RiskLevel) in RISK_STYLES ? (d[levelKey] as RiskLevel) : "LOW"].hex}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CountBarChart({
  data,
  xKey,
  height = 260,
  color = "var(--chart-1)",
}: {
  data: { [k: string]: string | number }[];
  xKey: string;
  height?: number;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} {...axis} interval={0} angle={data.length > 6 ? -25 : 0} height={data.length > 6 ? 52 : 30} textAnchor={data.length > 6 ? "end" : "middle"} />
        <YAxis {...axis} width={34} allowDecimals={false} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey="count" name="Events" radius={[4, 4, 0, 0]} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
}
