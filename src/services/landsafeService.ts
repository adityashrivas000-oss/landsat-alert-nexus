/**
 * Frontend service layer.
 *
 * Every function here is async and returns mock data from `@/data/mockData`.
 * A real backend can be connected later by replacing the bodies with fetch
 * calls — the signatures and return types are the contract.
 */
import {
  alerts,
  buildRegionalOverview,
  historicalEvents,
  locations,
  predictions,
  reports,
} from "@/data/mockData";
import type {
  Alert,
  HistoricalEvent,
  Location,
  NEState,
  Prediction,
  PredictionHorizon,
  RegionalOverview,
  Report,
  RiskLevel,
} from "@/types/landsafe";

const LATENCY = 420;

function respond<T>(data: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export interface LocationFilters {
  query?: string;
  state?: NEState | "ALL";
  level?: RiskLevel | "ALL";
}

export const landsafeService = {
  getRegionalOverview(): Promise<RegionalOverview> {
    return respond(buildRegionalOverview());
  },

  getLocations(filters: LocationFilters = {}): Promise<Location[]> {
    const { query = "", state = "ALL", level = "ALL" } = filters;
    const q = query.trim().toLowerCase();
    return respond(
      locations.filter(
        (l) =>
          (state === "ALL" || l.state === state) &&
          (level === "ALL" || l.risk.level === level) &&
          (!q ||
            l.name.toLowerCase().includes(q) ||
            l.district.toLowerCase().includes(q) ||
            l.state.toLowerCase().includes(q)),
      ),
    );
  },

  getLocation(id: string): Promise<Location | null> {
    return respond(locations.find((l) => l.id === id) ?? null);
  },

  getAlerts(status?: "ACTIVE" | "RESOLVED"): Promise<Alert[]> {
    const list = status ? alerts.filter((a) => a.status === status) : alerts;
    return respond(
      [...list].sort((a, b) => Date.parse(b.issuedAt) - Date.parse(a.issuedAt)),
    );
  },

  getAlert(id: string): Promise<Alert | null> {
    return respond(alerts.find((a) => a.id === id) ?? null);
  },

  getPredictions(horizon: PredictionHorizon): Promise<Prediction[]> {
    return respond(
      predictions
        .filter((p) => p.horizon === horizon)
        .sort((a, b) => b.predictedScore - a.predictedScore),
    );
  },

  getHistoricalEvents(filters: {
    query?: string;
    state?: NEState | "ALL";
    year?: number | "ALL";
    severity?: RiskLevel | "ALL";
  } = {}): Promise<HistoricalEvent[]> {
    const { query = "", state = "ALL", year = "ALL", severity = "ALL" } = filters;
    const q = query.trim().toLowerCase();
    return respond(
      historicalEvents
        .filter(
          (e) =>
            (state === "ALL" || e.state === state) &&
            (year === "ALL" || e.year === year) &&
            (severity === "ALL" || e.severity === severity) &&
            (!q ||
              e.title.toLowerCase().includes(q) ||
              e.district.toLowerCase().includes(q) ||
              e.state.toLowerCase().includes(q)),
        )
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    );
  },

  getReports(): Promise<Report[]> {
    return respond(reports);
  },

  generateReport(id: string): Promise<{ ok: true; id: string; generatedAt: string }> {
    return respond({ ok: true as const, id, generatedAt: new Date().toISOString() }, 900);
  },
};
