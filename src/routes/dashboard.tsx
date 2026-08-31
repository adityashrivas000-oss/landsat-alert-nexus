import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ActivitySquare,
  AlertTriangle,
  ArrowUpRight,
  CloudRain,
  Droplets,
  Layers,
  MapPin,
  Mountain,
  TriangleAlert,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Page, PageHeader } from "@/components/landsafe/PageHeader";
import { DemoNotice, DemoTag } from "@/components/landsafe/DemoNotice";
import { StatCard } from "@/components/landsafe/StatCard";
import { RiskBadge } from "@/components/landsafe/RiskBadge";
import { NEIndiaMap } from "@/components/landsafe/NEIndiaMap";
import { RiskTrendChart, DistributionChart } from "@/components/landsafe/TrendChart";
import { ChartSkeleton, ErrorState, GridSkeleton } from "@/components/landsafe/States";
import { landsafeService } from "@/services/landsafeService";
import { RISK_LEVELS } from "@/data/mockData";
import { RISK_STYLES, formatNumber, relativeTime } from "@/lib/risk";
import type { RiskLevel } from "@/types/landsafe";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Regional Dashboard — LANDSAFE NER" },
      {
        name: "description",
        content:
          "Regional landslide risk overview for Northeast India: risk score, monitored locations, active warnings, environmental metrics and trend.",
      },
      { property: "og:title", content: "Regional Dashboard — LANDSAFE NER" },
      {
        property: "og:description",
        content: "Prototype regional landslide risk overview for Northeast India.",
      },
    ],
  }),
  component: Dashboard,
});

const METRIC_ICONS = {
  rainfall24h: CloudRain,
  rainfall3d: CloudRain,
  rainfall7d: CloudRain,
  soilMoisture: Droplets,
  slope: Layers,
  elevation: Mountain,
};

function Dashboard() {
  const navigate = useNavigate();
  const overview = useQuery({
    queryKey: ["overview"],
    queryFn: () => landsafeService.getRegionalOverview(),
  });
  const locs = useQuery({
    queryKey: ["locations", "all"],
    queryFn: () => landsafeService.getLocations(),
  });

  const locations = locs.data ?? [];
  const avg = (fn: (n: (typeof locations)[number]) => number) =>
    locations.length ? Math.round(locations.reduce((s, l) => s + fn(l), 0) / locations.length) : 0;

  const metrics = [
    { key: "rainfall24h" as const, label: "Rainfall 24h", value: avg((l) => l.environmental.rainfall24h), unit: "mm", max: 250 },
    { key: "rainfall3d" as const, label: "Rainfall 3d", value: avg((l) => l.environmental.rainfall3d), unit: "mm", max: 600 },
    { key: "rainfall7d" as const, label: "Rainfall 7d", value: avg((l) => l.environmental.rainfall7d), unit: "mm", max: 1200 },
    { key: "soilMoisture" as const, label: "Soil Moisture", value: avg((l) => l.environmental.soilMoisture), unit: "%", max: 100 },
    { key: "slope" as const, label: "Avg Slope", value: avg((l) => l.environmental.slope), unit: "°", max: 60 },
    { key: "elevation" as const, label: "Avg Elevation", value: avg((l) => l.environmental.elevation), unit: "m", max: 3500 },
  ];

  const dist = overview.data
    ? RISK_LEVELS.map((level) => ({ level, count: overview.data.distribution[level] }))
    : [];

  return (
    <Page>
      <PageHeader
        eyebrow="Regional Risk Overview"
        title="Northeast India Dashboard"
        description="Consolidated prototype risk posture across all monitored locations, updated every monitoring cycle."
        actions={
          <>
            <DemoTag />
            <Button asChild variant="outline" size="sm">
              <Link to="/risk-map">Open full map</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/warnings">Early warnings</Link>
            </Button>
          </>
        }
      />

      <DemoNotice />

      {overview.isError ? (
        <ErrorState onRetry={() => overview.refetch()} />
      ) : overview.isLoading || !overview.data ? (
        <GridSkeleton />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Overall Risk Score"
              value={
                <span className={RISK_STYLES[overview.data.overallLevel].text}>
                  {overview.data.overallScore}
                  <span className="text-lg text-muted-foreground">/100</span>
                </span>
              }
              sub={`${overview.data.overallLevel} regional posture`}
              icon={<ActivitySquare className="size-4" aria-hidden />}
              accent={overview.data.overallLevel.toLowerCase() as "low"}
            />
            <StatCard
              label="Monitored Locations"
              value={overview.data.monitoredLocations}
              sub="Across 8 Northeast states"
              icon={<MapPin className="size-4" aria-hidden />}
            />
            <StatCard
              label="Active Warnings"
              value={overview.data.activeWarnings}
              sub="Currently in force (demo)"
              icon={<AlertTriangle className="size-4" aria-hidden />}
              accent="high"
            />
            <StatCard
              label="High / Critical Locations"
              value={overview.data.highOrCritical}
              sub="Risk score 60 and above"
              icon={<TriangleAlert className="size-4" aria-hidden />}
              accent="critical"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RISK_LEVELS.map((level) => (
              <RiskLevelCard
                key={level}
                level={level}
                count={overview.data.distribution[level]}
                total={overview.data.monitoredLocations}
              />
            ))}
          </div>
        </>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Northeast India Risk Map</CardTitle>
              <CardDescription>Click a marker to open the location profile.</CardDescription>
            </div>
            <DemoTag />
          </CardHeader>
          <CardContent>
            {locs.isLoading ? (
              <ChartSkeleton height={420} />
            ) : locs.isError ? (
              <ErrorState onRetry={() => locs.refetch()} />
            ) : (
              <NEIndiaMap
                locations={locations}
                height={430}
                onSelect={(l) =>
                  navigate({ to: "/location/$locationId", params: { locationId: l.id } })
                }
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Highest risk locations</CardTitle>
            <CardDescription>Top demo scores in the current cycle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {locs.isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ChartSkeleton key={i} height={52} />)
              : locations.slice(0, 7).map((l) => (
                  <Link
                    key={l.id}
                    to="/location/$locationId"
                    params={{ locationId: l.id }}
                    className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{l.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {l.district}, {l.state}
                      </span>
                    </span>
                    <RiskBadge level={l.risk.level} score={l.risk.score} />
                  </Link>
                ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-base">Environmental metrics (regional average)</CardTitle>
            <CardDescription>Averaged across all monitored demo locations.</CardDescription>
          </div>
          <DemoTag />
        </CardHeader>
        <CardContent>
          {locs.isLoading ? (
            <GridSkeleton count={6} className="lg:grid-cols-3" />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((m) => {
                const Icon = METRIC_ICONS[m.key];
                return (
                  <div key={m.key} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {m.label}
                      </p>
                      <Icon className="size-4 text-muted-foreground" aria-hidden />
                    </div>
                    <p className="num mt-2 text-2xl font-semibold">
                      {formatNumber(m.value)}
                      <span className="ml-1 text-sm font-normal text-muted-foreground">{m.unit}</span>
                    </p>
                    <Progress value={Math.min(100, (m.value / m.max) * 100)} className="mt-3 h-1.5" />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Regional risk trend — last 14 days</CardTitle>
            <CardDescription>Average risk score across all monitored locations.</CardDescription>
          </CardHeader>
          <CardContent>
            {overview.isLoading || !overview.data ? (
              <ChartSkeleton />
            ) : (
              <RiskTrendChart data={overview.data.trend} />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk distribution</CardTitle>
            <CardDescription>Locations per risk band.</CardDescription>
          </CardHeader>
          <CardContent>
            {overview.isLoading ? <ChartSkeleton height={240} /> : <DistributionChart data={dist} />}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}

function RiskLevelCard({ level, count, total }: { level: RiskLevel; count: number; total: number }) {
  const s = RISK_STYLES[level];
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-card)]">
      <div className={`h-1 ${s.bar}`} />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <RiskBadge level={level} />
          <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden />
        </div>
        <p className="num mt-3 text-3xl font-semibold">{count}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{pct}% of monitored locations</p>
      </div>
    </div>
  );
}
