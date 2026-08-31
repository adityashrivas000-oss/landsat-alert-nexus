import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Mountain, Search, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { alerts, locations } from "@/data/mockData";
import { RISK_STYLES, relativeTime } from "@/lib/risk";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/risk-map", label: "Risk Map" },
  { to: "/warnings", label: "Early Warnings" },
  { to: "/predictions", label: "Predictions" },
  { to: "/history", label: "History" },
  { to: "/safety", label: "Safety" },
  { to: "/reports", label: "Reports" },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="LANDSAFE NER home">
      <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
        <Mountain className="size-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight text-navy-foreground">
          LANDSAFE <span className="text-[oklch(0.78_0.12_220)]">NER</span>
        </span>
        <span className="block text-[10px] uppercase tracking-widest text-navy-foreground/60">
          Landslide Early Warning
        </span>
      </span>
    </Link>
  );
}

function GlobalSearch({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = q.trim()
    ? locations
        .filter(
          (l) =>
            l.name.toLowerCase().includes(q.toLowerCase()) ||
            l.state.toLowerCase().includes(q.toLowerCase()) ||
            l.district.toLowerCase().includes(q.toLowerCase()),
        )
        .slice(0, 6)
    : [];

  return (
    <div className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-navy-foreground/50" aria-hidden />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search locations…"
        aria-label="Search monitored locations"
        className="h-9 border-white/15 bg-white/10 pl-8 text-sm text-navy-foreground placeholder:text-navy-foreground/50 focus-visible:ring-white/40"
      />
      {results.length > 0 && (
        <ul className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-md border border-border bg-popover shadow-[var(--shadow-raised)]">
          {results.map((l) => (
            <li key={l.id}>
              <button
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                onClick={() => {
                  setQ("");
                  onDone?.();
                  navigate({ to: "/location/$locationId", params: { locationId: l.id } });
                }}
              >
                <span>
                  <span className="font-medium">{l.name}</span>
                  <span className="block text-xs text-muted-foreground">{l.state}</span>
                </span>
                <span className={cn("num text-xs font-semibold", RISK_STYLES[l.risk.level].text)}>
                  {l.risk.score}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Notifications() {
  const active = alerts
    .filter((a) => a.status === "ACTIVE")
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
          aria-label={`Notifications, ${active.length} active demo alerts`}
        >
          <Bell className="size-5" aria-hidden />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-risk-critical" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Active warnings
          <span className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground">
            Demo
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {active.map((a) => (
          <DropdownMenuItem key={a.id} asChild>
            <Link to="/warnings" className="flex flex-col items-start gap-0.5">
              <span className="flex w-full items-center justify-between gap-2">
                <span className="text-sm font-medium">{a.locationName}</span>
                <span className={cn("text-[10px] font-bold", RISK_STYLES[a.severity].text)}>
                  {a.severity}
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {a.state} · {relativeTime(a.issuedAt)}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/warnings" className="justify-center text-sm font-medium">
            View Early Warning Center
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const linkClass =
    "rounded-md px-2.5 py-1.5 text-[13px] font-medium text-navy-foreground/75 transition-colors hover:bg-white/10 hover:text-navy-foreground";

  return (
    <header className="sticky top-0 z-40 bg-navy shadow-[0_1px_0_oklch(1_0_0_/_0.08)]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="ml-4 hidden flex-1 items-center gap-0.5 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={linkClass}
              activeProps={{ className: "bg-white/12 text-navy-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <GlobalSearch />
          </div>
          <Notifications />
          <Button asChild size="sm" className="hidden bg-white/12 text-navy-foreground hover:bg-white/20 sm:inline-flex">
            <Link to="/authority">
              <ShieldCheck className="size-4" aria-hidden />
              Authority
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-navy-foreground hover:bg-white/10 hover:text-navy-foreground xl:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm bg-navy p-0 text-navy-foreground">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-navy-foreground hover:bg-white/10"
                >
                  <X className="size-5" aria-hidden />
                </Button>
              </div>
              <div className="px-4 py-4">
                <GlobalSearch onDone={() => setOpen(false)} />
              </div>
              <nav className="flex flex-col gap-1 px-3 pb-6" aria-label="Mobile">
                {[...NAV, { to: "/authority", label: "Authority Dashboard" } as const].map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-navy-foreground/80 hover:bg-white/10 hover:text-navy-foreground"
                    activeProps={{ className: "bg-white/12 text-navy-foreground" }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="bg-[oklch(0.3_0.07_258)] px-4 py-1 text-center text-[11px] font-medium tracking-wide text-navy-foreground/70 sm:px-6">
        PROTOTYPE DEMONSTRATION · All data shown is simulated demo data, not official government or real-time sensor data.
      </div>
    </header>
  );
}
