import type {
  Alert,
  HistoricalEvent,
  Location,
  NEState,
  Prediction,
  RegionalOverview,
  Report,
  RiskLevel,
} from "@/types/landsafe";

export const NE_STATES: NEState[] = [
  "Assam",
  "Arunachal Pradesh",
  "Meghalaya",
  "Manipur",
  "Mizoram",
  "Nagaland",
  "Tripura",
  "Sikkim",
];

export const RISK_LEVELS: RiskLevel[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export function levelFromScore(score: number): RiskLevel {
  if (score >= 80) return "CRITICAL";
  if (score >= 60) return "HIGH";
  if (score >= 35) return "MEDIUM";
  return "LOW";
}

/** Deterministic pseudo-random so the demo never flickers between renders. */
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const DAY = 86_400_000;
const NOW = Date.parse("2026-08-31T06:00:00.000Z");

function isoDaysAgo(days: number) {
  return new Date(NOW - days * DAY).toISOString();
}
function isoHoursAgo(hours: number) {
  return new Date(NOW - hours * 3_600_000).toISOString();
}

interface Seed {
  id: string;
  name: string;
  district: string;
  state: NEState;
  x: number;
  y: number;
  population: number;
  score: number;
  slope: number;
  elevation: number;
}

const SEEDS: Seed[] = [
  { id: "gangtok", name: "Gangtok", district: "East Sikkim", state: "Sikkim", x: 5, y: 21, population: 100286, score: 84, slope: 38, elevation: 1650 },
  { id: "namchi", name: "Namchi", district: "South Sikkim", state: "Sikkim", x: 3.5, y: 27, population: 12190, score: 61, slope: 33, elevation: 1315 },
  { id: "tawang", name: "Tawang", district: "Tawang", state: "Arunachal Pradesh", x: 44, y: 14, population: 11202, score: 72, slope: 41, elevation: 3048 },
  { id: "itanagar", name: "Itanagar", district: "Papum Pare", state: "Arunachal Pradesh", x: 57, y: 24, population: 59490, score: 66, slope: 27, elevation: 750 },
  { id: "pasighat", name: "Pasighat", district: "East Siang", state: "Arunachal Pradesh", x: 71, y: 21, population: 24656, score: 47, slope: 18, elevation: 155 },
  { id: "roing", name: "Roing", district: "Lower Dibang Valley", state: "Arunachal Pradesh", x: 80, y: 17, population: 11150, score: 58, slope: 24, elevation: 390 },
  { id: "guwahati", name: "Guwahati", district: "Kamrup Metro", state: "Assam", x: 39, y: 44, population: 963429, score: 55, slope: 16, elevation: 55 },
  { id: "haflong", name: "Haflong", district: "Dima Hasao", state: "Assam", x: 58, y: 55, population: 44513, score: 88, slope: 34, elevation: 680 },
  { id: "diphu", name: "Diphu", district: "Karbi Anglong", state: "Assam", x: 55, y: 47, population: 61300, score: 63, slope: 22, elevation: 186 },
  { id: "silchar", name: "Silchar", district: "Cachar", state: "Assam", x: 63, y: 60, population: 172830, score: 41, slope: 9, elevation: 25 },
  { id: "jorhat", name: "Jorhat", district: "Jorhat", state: "Assam", x: 66, y: 36, population: 153889, score: 28, slope: 6, elevation: 116 },
  { id: "dibrugarh", name: "Dibrugarh", district: "Dibrugarh", state: "Assam", x: 75, y: 30, population: 154019, score: 31, slope: 7, elevation: 108 },
  { id: "shillong", name: "Shillong", district: "East Khasi Hills", state: "Meghalaya", x: 41, y: 56, population: 143229, score: 69, slope: 29, elevation: 1496 },
  { id: "cherrapunji", name: "Sohra (Cherrapunji)", district: "East Khasi Hills", state: "Meghalaya", x: 39, y: 61, population: 14816, score: 91, slope: 36, elevation: 1430 },
  { id: "tura", name: "Tura", district: "West Garo Hills", state: "Meghalaya", x: 29, y: 55, population: 74858, score: 52, slope: 21, elevation: 657 },
  { id: "jowai", name: "Jowai", district: "West Jaintia Hills", state: "Meghalaya", x: 47, y: 57, population: 28430, score: 57, slope: 25, elevation: 1380 },
  { id: "kohima", name: "Kohima", district: "Kohima", state: "Nagaland", x: 79, y: 47, population: 99039, score: 76, slope: 35, elevation: 1444 },
  { id: "mokokchung", name: "Mokokchung", district: "Mokokchung", state: "Nagaland", x: 80, y: 40, population: 35913, score: 60, slope: 31, elevation: 1325 },
  { id: "imphal", name: "Imphal", district: "Imphal West", state: "Manipur", x: 82, y: 58, population: 264986, score: 44, slope: 12, elevation: 786 },
  { id: "churachandpur", name: "Churachandpur", district: "Churachandpur", state: "Manipur", x: 79, y: 64, population: 40745, score: 64, slope: 28, elevation: 914 },
  { id: "aizawl", name: "Aizawl", district: "Aizawl", state: "Mizoram", x: 73, y: 74, population: 293416, score: 81, slope: 37, elevation: 1132 },
  { id: "lunglei", name: "Lunglei", district: "Lunglei", state: "Mizoram", x: 71, y: 82, population: 57011, score: 67, slope: 32, elevation: 1013 },
  { id: "agartala", name: "Agartala", district: "West Tripura", state: "Tripura", x: 58, y: 72, population: 400004, score: 26, slope: 5, elevation: 12 },
  { id: "dharmanagar", name: "Dharmanagar", district: "North Tripura", state: "Tripura", x: 63, y: 66, population: 40613, score: 38, slope: 11, elevation: 30 },
];

const FACTOR_LIBRARY = [
  { label: "Cumulative rainfall (72h)", detail: "Sustained precipitation saturating the slope profile." },
  { label: "Soil saturation index", detail: "Pore-water pressure reducing shear strength of the regolith." },
  { label: "Terrain slope gradient", detail: "Steep gradient increasing gravitational driving force." },
  { label: "Slope-cut & road widening", detail: "Anthropogenic cuts destabilising the toe of the slope." },
  { label: "Vegetation cover loss", detail: "Reduced root cohesion after clearing on upper slopes." },
  { label: "Historical failure density", detail: "Repeated past failures recorded within a 5 km radius." },
];

function buildLocation(seed: Seed): Location {
  const rnd = seeded(seed.name.length * 977 + seed.score * 31 + seed.x);
  const level = levelFromScore(seed.score);
  const intensity = seed.score / 100;

  const rainfall24h = Math.round(20 + intensity * 180 + rnd() * 30);
  const rainfall3d = Math.round(rainfall24h * (2.1 + rnd() * 0.6));
  const rainfall7d = Math.round(rainfall3d * (1.8 + rnd() * 0.5));
  const soilMoisture = Math.min(98, Math.round(35 + intensity * 55 + rnd() * 5));

  const weights = [
    Math.round(18 + intensity * 20),
    Math.round(14 + intensity * 18),
    Math.round(10 + (seed.slope / 45) * 22),
    Math.round(6 + rnd() * 12),
    Math.round(4 + rnd() * 10),
    Math.round(4 + rnd() * 9),
  ];
  const total = weights.reduce((a, b) => a + b, 0);
  const factors = FACTOR_LIBRARY.map((f, i) => ({
    ...f,
    weight: Math.round((weights[i] / total) * 100),
  })).sort((a, b) => b.weight - a.weight);

  const trend = Array.from({ length: 14 }, (_, i) => {
    const drift = (i - 13) * 1.4;
    const noise = (rnd() - 0.5) * 9;
    return {
      date: isoDaysAgo(13 - i).slice(0, 10),
      score: Math.max(5, Math.min(99, Math.round(seed.score + drift + noise))),
    };
  });
  trend[trend.length - 1].score = seed.score;

  const actionsByLevel: Record<RiskLevel, string[]> = {
    LOW: [
      "Continue routine slope monitoring at weekly intervals.",
      "Keep drainage channels clear ahead of the next rainfall spell.",
      "Maintain community awareness material at the ward level.",
    ],
    MEDIUM: [
      "Increase monitoring frequency to twice daily during rainfall.",
      "Inspect retaining structures and roadside cut slopes.",
      "Brief local disaster management volunteers on the watch status.",
    ],
    HIGH: [
      "Issue a public advisory for slope-adjacent settlements.",
      "Restrict night-time movement on hill roads in the sector.",
      "Pre-position relief material and identify relocation shelters.",
      "Deploy field teams for visual crack and seepage inspection.",
    ],
    CRITICAL: [
      "Initiate precautionary evacuation of households below the failure zone.",
      "Close vulnerable road stretches to all traffic immediately.",
      "Activate the district emergency operations centre.",
      "Coordinate NDRF/SDRF standby deployment for the sector.",
    ],
  };

  return {
    id: seed.id,
    name: seed.name,
    district: seed.district,
    state: seed.state,
    x: seed.x,
    y: seed.y,
    population: seed.population,
    environmental: {
      rainfall24h,
      rainfall3d,
      rainfall7d,
      soilMoisture,
      slope: seed.slope,
      elevation: seed.elevation,
      temperature: Math.round(18 + rnd() * 12),
      seismicActivity: Number((1.2 + rnd() * 2.4).toFixed(1)),
    },
    risk: {
      score: seed.score,
      level,
      updatedAt: isoHoursAgo(1 + Math.round(rnd() * 4)),
      factors,
      explanation: `${seed.name} is currently modelled at ${seed.score}/100 (${level}). The prototype model attributes this mainly to ${factors[0].label.toLowerCase()} (${factors[0].weight}% contribution) combined with a ${seed.slope}° average terrain gradient and a soil saturation index of ${soilMoisture}%. Rainfall over the last 72 hours (${rainfall3d} mm) exceeds the demo threshold band used for this district, while the surrounding terrain at ${seed.elevation} m elevation has a recorded history of shallow translational failures. This explanation is generated from prototype data for demonstration purposes only.`,
      recommendedActions: actionsByLevel[level],
      trend,
    },
  };
}

export const locations: Location[] = SEEDS.map(buildLocation).sort(
  (a, b) => b.risk.score - a.risk.score,
);

const ALERT_TEMPLATES: Record<RiskLevel, { headline: string; action: string }> = {
  CRITICAL: {
    headline: "Critical landslide warning — immediate action advised",
    action: "Evacuate slope-adjacent households and close affected road stretches.",
  },
  HIGH: {
    headline: "High landslide risk — public advisory in force",
    action: "Restrict hill road movement and pre-position response teams.",
  },
  MEDIUM: {
    headline: "Elevated landslide watch",
    action: "Increase monitoring frequency and inspect drainage systems.",
  },
  LOW: {
    headline: "Routine slope monitoring advisory",
    action: "Continue scheduled monitoring; no restrictions required.",
  },
};

export const alerts: Alert[] = [
  ...locations
    .filter((l) => l.risk.score >= 55)
    .map((l, i): Alert => {
      const t = ALERT_TEMPLATES[l.risk.level];
      return {
        id: `ALT-2026-${(100 + i).toString()}`,
        locationId: l.id,
        locationName: l.name,
        state: l.state,
        severity: l.risk.level,
        status: "ACTIVE",
        riskScore: l.risk.score,
        issuedAt: isoHoursAgo(1 + i * 2),
        headline: t.headline,
        message: `Prototype model output indicates a ${l.risk.level.toLowerCase()} landslide risk for ${l.name}, ${l.district} (${l.state}). Recorded demo rainfall of ${l.environmental.rainfall24h} mm in 24 hours with a soil saturation index of ${l.environmental.soilMoisture}% on ${l.environmental.slope}° slopes.`,
        recommendedAction: t.action,
        affectedPopulation: Math.round(l.population * 0.18),
      };
    }),
  ...[
    { loc: "jorhat", sev: "MEDIUM" as RiskLevel, days: 6 },
    { loc: "agartala", sev: "MEDIUM" as RiskLevel, days: 9 },
    { loc: "pasighat", sev: "HIGH" as RiskLevel, days: 12 },
    { loc: "silchar", sev: "HIGH" as RiskLevel, days: 17 },
    { loc: "tura", sev: "CRITICAL" as RiskLevel, days: 23 },
  ].map(({ loc, sev, days }, i): Alert => {
    const l = locations.find((x) => x.id === loc)!;
    const t = ALERT_TEMPLATES[sev];
    return {
      id: `ALT-2026-${(200 + i).toString()}`,
      locationId: l.id,
      locationName: l.name,
      state: l.state,
      severity: sev,
      status: "RESOLVED",
      riskScore: sev === "CRITICAL" ? 83 : sev === "HIGH" ? 68 : 46,
      issuedAt: isoDaysAgo(days),
      resolvedAt: isoDaysAgo(days - 1),
      headline: t.headline,
      message: `Archived prototype alert for ${l.name}, ${l.state}. Conditions returned below the warning threshold after rainfall subsided.`,
      recommendedAction: t.action,
      affectedPopulation: Math.round(l.population * 0.12),
    };
  }),
];

const HORIZON_STEPS: Record<Prediction["horizon"], { labels: string[]; drift: number }> = {
  "24H": { labels: ["+4h", "+8h", "+12h", "+16h", "+20h", "+24h"], drift: 5 },
  "3D": { labels: ["Day 1", "Day 2", "Day 3"], drift: 9 },
  "7D": { labels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"], drift: 13 },
};

export const predictions: Prediction[] = locations.flatMap((l) =>
  (["24H", "3D", "7D"] as const).map((horizon): Prediction => {
    const rnd = seeded(l.name.length * 53 + horizon.length * 991 + l.risk.score);
    const cfg = HORIZON_STEPS[horizon];
    const target = Math.max(
      5,
      Math.min(99, Math.round(l.risk.score + (rnd() - 0.35) * cfg.drift * 2)),
    );
    const series = cfg.labels.map((label, i) => ({
      label,
      score: Math.max(
        5,
        Math.min(
          99,
          Math.round(
            l.risk.score + ((target - l.risk.score) * (i + 1)) / cfg.labels.length + (rnd() - 0.5) * 6,
          ),
        ),
      ),
    }));
    return {
      locationId: l.id,
      locationName: l.name,
      state: l.state,
      horizon,
      predictedScore: target,
      level: levelFromScore(target),
      confidence: Math.round((horizon === "24H" ? 86 : horizon === "3D" ? 74 : 62) + rnd() * 8),
      factors: l.risk.factors.slice(0, 3).map((f) => `${f.label} (${f.weight}%)`),
      series,
    };
  }),
);

export const historicalEvents: HistoricalEvent[] = [
  { id: "HE-001", title: "Dima Hasao rail corridor slope failures", state: "Assam", district: "Dima Hasao", date: "2022-05-14", severity: "CRITICAL", casualties: 6, displaced: 31000, rainfallTrigger: 412, summary: "Prolonged pre-monsoon rainfall triggered multiple slope failures along the hill section, severing rail and road connectivity for several weeks." },
  { id: "HE-002", title: "Aizawl hillside collapse", state: "Mizoram", district: "Aizawl", date: "2024-05-28", severity: "CRITICAL", casualties: 27, displaced: 1800, rainfallTrigger: 356, summary: "A cyclone-driven rainfall spell caused a quarry-adjacent slope collapse in a dense hillside settlement." },
  { id: "HE-003", title: "Sohra plateau escarpment slides", state: "Meghalaya", district: "East Khasi Hills", date: "2023-06-17", severity: "HIGH", casualties: 3, displaced: 640, rainfallTrigger: 498, summary: "Record monsoon rainfall on the escarpment produced multiple shallow debris slides across the plateau edge." },
  { id: "HE-004", title: "Sikkim glacial outburst debris flows", state: "Sikkim", district: "Mangan", date: "2023-10-04", severity: "CRITICAL", casualties: 40, displaced: 25000, rainfallTrigger: 289, summary: "A glacial lake outburst produced downstream debris flows and extensive valley-slope destabilisation." },
  { id: "HE-005", title: "Kohima ring road slope failure", state: "Nagaland", district: "Kohima", date: "2021-08-09", severity: "HIGH", casualties: 2, displaced: 210, rainfallTrigger: 244, summary: "Slope cutting for road widening combined with monsoon saturation caused a retrogressive failure." },
  { id: "HE-006", title: "Tawang highway blockages", state: "Arunachal Pradesh", district: "Tawang", date: "2022-07-22", severity: "MEDIUM", casualties: 0, displaced: 90, rainfallTrigger: 198, summary: "Multiple small rockfalls blocked the strategic highway for four days during the peak monsoon." },
  { id: "HE-007", title: "Churachandpur hill settlement slide", state: "Manipur", district: "Churachandpur", date: "2020-08-02", severity: "HIGH", casualties: 5, displaced: 430, rainfallTrigger: 231, summary: "Saturated colluvium above a hill settlement failed during a night-time downpour." },
  { id: "HE-008", title: "Tura foothill debris slides", state: "Meghalaya", district: "West Garo Hills", date: "2021-06-30", severity: "MEDIUM", casualties: 1, displaced: 320, rainfallTrigger: 187, summary: "Foothill debris slides affected approach roads following an extended wet spell." },
  { id: "HE-009", title: "Gangtok NH-10 corridor failures", state: "Sikkim", district: "East Sikkim", date: "2024-07-11", severity: "HIGH", casualties: 4, displaced: 1450, rainfallTrigger: 305, summary: "Repeated failures along the lifeline highway corridor isolated the capital for 48 hours." },
  { id: "HE-010", title: "Lunglei road embankment collapse", state: "Mizoram", district: "Lunglei", date: "2019-09-15", severity: "MEDIUM", casualties: 0, displaced: 75, rainfallTrigger: 162, summary: "Embankment saturation caused a road-side collapse with no casualties reported." },
  { id: "HE-011", title: "Papum Pare landslip cluster", state: "Arunachal Pradesh", district: "Papum Pare", date: "2025-06-08", severity: "HIGH", casualties: 3, displaced: 510, rainfallTrigger: 268, summary: "A cluster of landslips affected peri-urban settlements around the state capital." },
  { id: "HE-012", title: "Haflong township slope movement", state: "Assam", district: "Dima Hasao", date: "2025-07-19", severity: "CRITICAL", casualties: 8, displaced: 2600, rainfallTrigger: 377, summary: "Slow-moving slope deformation accelerated into failure across three township wards." },
  { id: "HE-013", title: "North Tripura hillock slide", state: "Tripura", district: "North Tripura", date: "2018-08-21", severity: "LOW", casualties: 0, displaced: 40, rainfallTrigger: 121, summary: "A minor hillock slide affected agricultural land with limited structural damage." },
  { id: "HE-014", title: "Mokokchung ridge failures", state: "Nagaland", district: "Mokokchung", date: "2023-09-02", severity: "MEDIUM", casualties: 1, displaced: 180, rainfallTrigger: 176, summary: "Ridge-line failures affected village link roads across the district." },
  { id: "HE-015", title: "Jaintia Hills mining-belt slides", state: "Meghalaya", district: "West Jaintia Hills", date: "2020-07-05", severity: "HIGH", casualties: 7, displaced: 890, rainfallTrigger: 341, summary: "Spoil-heap instability in the mining belt produced fast-moving debris flows." },
].map((e) => ({ ...e, year: Number(e.date.slice(0, 4)) })) as HistoricalEvent[];

export const reports: Report[] = [
  { id: "RPT-REG-01", type: "REGIONAL", title: "Northeast India Regional Risk Report", description: "Consolidated risk posture across all eight monitored states with distribution, trend and top-risk locations.", period: "Last 30 days", generatedAt: isoDaysAgo(1), sections: ["Executive summary", "Risk distribution", "State-wise breakdown", "Trend analysis", "Recommendations"] },
  { id: "RPT-LOC-01", type: "LOCATION", title: "Location Risk Report", description: "Per-location deep dive covering environmental readings, contributing factors and recommended actions.", period: "Current cycle", generatedAt: isoDaysAgo(2), sections: ["Location profile", "Environmental readings", "Risk factors", "Model explanation", "Action plan"] },
  { id: "RPT-HIS-01", type: "HISTORICAL", title: "Historical Event Report", description: "Archive of recorded landslide events with severity, impact and rainfall trigger analysis.", period: "2018 – 2026", generatedAt: isoDaysAgo(4), sections: ["Event catalogue", "Severity analysis", "Seasonality", "State comparison"] },
  { id: "RPT-ALT-01", type: "ALERT", title: "Alert Activity Report", description: "Issued, escalated and resolved warnings with response timelines and affected population estimates.", period: "Last 30 days", generatedAt: isoHoursAgo(9), sections: ["Alert log", "Severity mix", "Response times", "Population impact"] },
];

export function buildRegionalOverview(): RegionalOverview {
  const distribution = RISK_LEVELS.reduce(
    (acc, lvl) => ({ ...acc, [lvl]: locations.filter((l) => l.risk.level === lvl).length }),
    {} as Record<RiskLevel, number>,
  );
  const overallScore = Math.round(
    locations.reduce((s, l) => s + l.risk.score, 0) / locations.length,
  );
  const trend = Array.from({ length: 14 }, (_, i) => ({
    date: locations[0].risk.trend[i].date,
    score: Math.round(
      locations.reduce((s, l) => s + l.risk.trend[i].score, 0) / locations.length,
    ),
  }));
  return {
    overallScore,
    overallLevel: levelFromScore(overallScore),
    monitoredLocations: locations.length,
    activeWarnings: alerts.filter((a) => a.status === "ACTIVE").length,
    highOrCritical: locations.filter((l) => l.risk.score >= 60).length,
    distribution,
    trend,
    historicalEvents: historicalEvents.length,
  };
}
