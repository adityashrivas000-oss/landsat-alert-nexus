export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type NEState =
  | "Assam"
  | "Arunachal Pradesh"
  | "Meghalaya"
  | "Manipur"
  | "Mizoram"
  | "Nagaland"
  | "Tripura"
  | "Sikkim";

export interface EnvironmentalData {
  rainfall24h: number; // mm
  rainfall3d: number; // mm
  rainfall7d: number; // mm
  soilMoisture: number; // %
  slope: number; // degrees
  elevation: number; // metres
  temperature: number; // °C
  seismicActivity: number; // richter-ish index
}

export interface RiskData {
  score: number; // 0-100
  level: RiskLevel;
  updatedAt: string;
  factors: { label: string; weight: number; detail: string }[];
  explanation: string;
  recommendedActions: string[];
  trend: { date: string; score: number }[];
}

export interface Location {
  id: string;
  name: string;
  district: string;
  state: NEState;
  /** normalised 0-100 coordinates on the schematic NE India map */
  x: number;
  y: number;
  population: number;
  environmental: EnvironmentalData;
  risk: RiskData;
}

export type AlertStatus = "ACTIVE" | "RESOLVED";

export interface Alert {
  id: string;
  locationId: string;
  locationName: string;
  state: NEState;
  severity: RiskLevel;
  status: AlertStatus;
  riskScore: number;
  issuedAt: string;
  resolvedAt?: string;
  headline: string;
  message: string;
  recommendedAction: string;
  affectedPopulation: number;
}

export type PredictionHorizon = "24H" | "3D" | "7D";

export interface Prediction {
  locationId: string;
  locationName: string;
  state: NEState;
  horizon: PredictionHorizon;
  predictedScore: number;
  level: RiskLevel;
  confidence: number; // %
  factors: string[];
  series: { label: string; score: number }[];
}

export interface HistoricalEvent {
  id: string;
  title: string;
  state: NEState;
  district: string;
  date: string;
  year: number;
  severity: RiskLevel;
  casualties: number;
  displaced: number;
  rainfallTrigger: number;
  summary: string;
}

export type ReportType = "REGIONAL" | "LOCATION" | "HISTORICAL" | "ALERT";

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  period: string;
  generatedAt: string;
  sections: string[];
}

export interface RegionalOverview {
  overallScore: number;
  overallLevel: RiskLevel;
  monitoredLocations: number;
  activeWarnings: number;
  highOrCritical: number;
  distribution: Record<RiskLevel, number>;
  trend: { date: string; score: number }[];
  historicalEvents: number;
}
