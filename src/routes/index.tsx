import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ActivitySquare,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CloudRain,
  Database,
  FileBarChart,
  History,
  Map as MapIcon,
  MountainSnow,
  Radio,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Page } from "@/components/landsafe/PageHeader";
import { DemoNotice } from "@/components/landsafe/DemoNotice";
import { StatCard } from "@/components/landsafe/StatCard";
import { buildRegionalOverview, historicalEvents } from "@/data/mockData";
import { formatNumber } from "@/lib/risk";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LANDSAFE NER — Landslide Early Warning & Risk Intelligence" },
      {
        name: "description",
        content:
          "AI-assisted landslide risk monitoring, early warning and risk intelligence prototype for the eight states of Northeast India.",
      },
      { property: "og:title", content: "LANDSAFE NER — Landslide Early Warning System" },
      {
        property: "og:description",
        content:
          "Prototype landslide early warning and risk intelligence platform for Northeast India.",
      },
    ],
  }),
  component: Home,
});

const STEPS = [
  { icon: Database, title: "Environmental Data", text: "Rainfall, soil moisture, slope, elevation and terrain inputs are collected per monitored location." },
  { icon: ActivitySquare, title: "Risk Analysis", text: "Inputs are normalised and weighted against susceptibility thresholds for each district." },
  { icon: BrainCircuit, title: "AI-Assisted Prediction", text: "A prototype model projects risk scores across 24-hour, 3-day and 7-day horizons." },
  { icon: Siren, title: "Early Warning", text: "Threshold breaches raise graded warnings with severity, location and affected population." },
  { icon: ShieldCheck, title: "Action", text: "Authorities receive recommended actions, advisories and exportable situation reports." },
];

const FEATURES = [
  { icon: MapIcon, title: "Interactive Risk Map", text: "Schematic map of all eight Northeast states with graded risk markers, filtering and location drill-down.", to: "/risk-map" as const },
  { icon: Siren, title: "Early Warning Center", text: "Active, critical, high and resolved warnings with severity, timing and recommended action.", to: "/warnings" as const },
  { icon: BrainCircuit, title: "Predictive Outlook", text: "24-hour, 3-day and 7-day predicted risk scores with confidence bands and contributing factors.", to: "/predictions" as const },
  { icon: CloudRain, title: "Environmental Monitoring", text: "Rainfall over 24h/3d/7d, soil saturation, slope gradient and elevation per location.", to: "/dashboard" as const },
  { icon: History, title: "Historical Intelligence", text: "Catalogue of recorded events by state, year and severity with timeline and charts.", to: "/history" as const },
  { icon: FileBarChart, title: "Reports & Exports", text: "Regional, location, historical and alert reports with filters and demo export.", to: "/reports" as const },
];

function Home() {
  const overview = buildRegionalOverview();

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.7 0.13 220) 0, transparent 45%), radial-gradient(circle at 80% 70%, oklch(0.6 0.15 250) 0, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest">
            <Radio className="size-3.5" aria-hidden /> Prototype · Smart India Hackathon
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Landslide Early Warning &amp; Risk Intelligence System
          </h1>
          <p className="mt-5 max-w-2xl text-base text-navy-foreground/75 sm:text-lg">
            AI-assisted landslide risk monitoring and early warning for Northeast India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/risk-map">
                <MapIcon className="size-4" aria-hidden /> View Risk Map
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
            >
              <Link to="/warnings">
                <AlertTriangle className="size-4" aria-hidden /> Early Warnings
              </Link>
            </Button>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Monitored Locations", value: overview.monitoredLocations, sub: "Across 8 NE states" },
              { label: "Active Alerts", value: overview.activeWarnings, sub: "Demo warnings in force" },
              { label: "High Risk Locations", value: overview.highOrCritical, sub: "Score 60 and above" },
              { label: "Historical Events", value: historicalEvents.length, sub: "Recorded 2018 – 2026" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-white/12 bg-white/[0.07] p-4">
                <dt className="text-[12px] font-medium uppercase tracking-wide text-navy-foreground/60">
                  {s.label}
                </dt>
                <dd className="num mt-1.5 text-3xl font-semibold">{formatNumber(s.value)}</dd>
                <p className="mt-1 text-xs text-navy-foreground/55">{s.sub}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Page>
        <DemoNotice />

        <section aria-labelledby="how-it-works">
          <h2 id="how-it-works" className="text-xl font-bold tracking-tight sm:text-2xl">
            How it works
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A five-stage pipeline from environmental input to on-ground action.
          </p>
          <ol className="mt-5 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="relative rounded-lg border border-border bg-surface p-4 shadow-[var(--shadow-card)]"
              >
                <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
                  <s.icon className="size-4.5" aria-hidden />
                </span>
                <p className="num mt-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="mt-0.5 text-sm font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="features" className="pt-2">
          <h2 id="features" className="text-xl font-bold tracking-tight sm:text-2xl">
            Key capabilities
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} className="border-border shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-raised)]">
                <CardContent className="pt-6">
                  <span className="grid size-10 place-items-center rounded-md bg-primary-soft text-primary">
                    <f.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-3.5 text-base font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  <Link
                    to={f.to}
                    className="mt-3.5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Open <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-4 flex flex-col items-start gap-4 rounded-lg border border-border bg-surface p-6 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MountainSnow className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
            <div>
              <h2 className="text-base font-semibold">Built for disaster management authorities</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Regional overview, alert management, critical location tracking and exportable reports.
              </p>
            </div>
          </div>
          <Button asChild>
            <Link to="/authority">Open Authority Dashboard</Link>
          </Button>
        </section>
      </Page>
    </>
  );
}
