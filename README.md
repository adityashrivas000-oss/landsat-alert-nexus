# LandSafe Alert

Build a complete frontend-only website called LANDSAFE NER — Landslide Early Warning & Risk Intelligence System for Northeast India.

Create the entire website in ONE implementation. Do not build backend, database, authentication, ML training, or real APIs. Use realistic mock data.

Goal

Make it look like a professional government/disaster-management platform suitable for a Smart India Hackathon presentation.

Tech

Use the existing Lovable-supported React/TypeScript setup. Use Tailwind CSS and a suitable chart/map library if already available. Avoid unnecessary dependencies.

Design

Professional, modern, clean and trustworthy

Deep navy/blue primary UI

White/light dashboard background

Inter-style typography

Green = LOW

Yellow = MEDIUM

Orange = HIGH

Red = CRITICAL

Responsive desktop + mobile

Subtle animations only

No excessive gradients or flashy effects

Main navigation

LANDSAFE NER logo with:
Dashboard | Risk Map | Early Warnings | Predictions | History | Safety | Reports

Also include Search, Notifications and Authority Dashboard.

Pages

1. Landing/Home

Hero: "Landslide Early Warning & Risk Intelligence System"

Subtitle: "AI-assisted landslide risk monitoring and early warning for Northeast India."

Buttons: View Risk Map / Early Warnings

Statistics: Monitored Locations, Active Alerts, High Risk Locations, Historical Events

How it works:
Environmental Data → Risk Analysis → AI-Assisted Prediction → Early Warning → Action

Key feature cards

2. Dashboard

Regional Risk Overview

Overall Risk Score

Monitored Locations

Active Warnings

High/Critical Locations

LOW/MEDIUM/HIGH/CRITICAL cards

Northeast India interactive risk map

Environmental metrics:
Rainfall 24h, Rainfall 3d, Rainfall 7d, Soil Moisture, Slope, Elevation

Risk trend chart

3. Risk Map

Interactive Northeast India map

States: Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Sikkim

Demo risk markers

Map legend

Search/filter by state and risk level

Clicking marker opens location information

4. Location Details

Location + State

Risk Score / 100

Risk Level

Risk gauge

Rainfall, soil moisture, slope, elevation

Risk trend chart

"Why is this location at risk?" AI explanation card

Contributing factors

Recommended actions

5. Early Warning Center

Active, Critical, High and Resolved alerts

Professional alert cards

Alert severity, location, risk score, time and recommended action

Alert details view

6. Predictions

Next 24 Hours / 3 Days / 7 Days

Predicted risk score

Risk level

Confidence

Contributing factors

Prediction chart

Clearly label predictions as DEMO data

7. History

Historical landslide events

Events by state/year/severity

Timeline

Charts

Search and filters

Historical event cards

8. Safety

Before Landslide

During Landslide

After Landslide

Quick Safety Guide

Clear, accessible emergency-style design

9. Reports

Regional Risk Report

Location Risk Report

Historical Event Report

Alert Report

Filters

Generate/Export buttons using demo functionality

10. Authority Dashboard

Regional overview

Active alerts

Critical locations

Risk distribution

Location table

Alert management UI

Reports

This is only a frontend demo; no real authentication.

Important data

Use centralized mock data, not hardcoded values inside components.

Create reusable TypeScript structures for:
Location, RiskData, EnvironmentalData, Alert, Prediction, HistoricalEvent and Report.

Create a simple frontend service layer so a backend can be connected later.

UX

Include:

Loading skeletons

Empty states

Error states

Responsive cards

Responsive charts

Mobile navigation

Accessible buttons

Clear risk badges

Consistent spacing and typography

Important

Use the LANDSAFE NER document provided by the user as the source for the project's terminology and core functionality.

All numbers, alerts, predictions and environmental readings must be clearly treated as DEMO/PROTOTYPE DATA. Do not claim real-time government data, official alerts, real sensor readings, or validated AI accuracy.

Final requirement

Prioritize the Dashboard, Risk Map, Early Warning Center and Location Details pages because these are the most important for the SIH demonstration.

Build the complete working frontend now. Do not ask for clarification. Do not build backend features.           build within cridet





- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
