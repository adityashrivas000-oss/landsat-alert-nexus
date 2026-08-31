import { Link } from "@tanstack/react-router";
import { Mountain } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md bg-primary-foreground/15">
              <Mountain className="size-4" aria-hidden />
            </span>
            <span className="font-bold tracking-tight">LANDSAFE NER</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-navy-foreground/65">
            Landslide Early Warning &amp; Risk Intelligence System for Northeast India. Built as a
            Smart India Hackathon prototype.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Platform</h3>
          <ul className="mt-3 space-y-2 text-sm text-navy-foreground/65">
            <li><Link to="/dashboard" className="hover:text-navy-foreground">Dashboard</Link></li>
            <li><Link to="/risk-map" className="hover:text-navy-foreground">Risk Map</Link></li>
            <li><Link to="/warnings" className="hover:text-navy-foreground">Early Warnings</Link></li>
            <li><Link to="/predictions" className="hover:text-navy-foreground">Predictions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm text-navy-foreground/65">
            <li><Link to="/history" className="hover:text-navy-foreground">Historical Events</Link></li>
            <li><Link to="/safety" className="hover:text-navy-foreground">Safety Guidance</Link></li>
            <li><Link to="/reports" className="hover:text-navy-foreground">Reports</Link></li>
            <li><Link to="/authority" className="hover:text-navy-foreground">Authority Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Disclaimer</h3>
          <p className="mt-3 text-sm text-navy-foreground/65">
            This is a frontend prototype. All risk scores, alerts, predictions and environmental
            readings are DEMO DATA. Do not use for operational decision making. For emergencies dial
            112 or contact your State Disaster Management Authority.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-navy-foreground/50 sm:px-6">
        © 2026 LANDSAFE NER Prototype · Demonstration build
      </div>
    </footer>
  );
}
