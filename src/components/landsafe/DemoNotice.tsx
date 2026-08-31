import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoNotice({
  className,
  text = "All figures, alerts, predictions and environmental readings shown are DEMO / PROTOTYPE DATA generated for demonstration. This is not real-time government data, an official alert, a real sensor feed, or validated AI accuracy.",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-md border border-risk-medium/40 bg-risk-medium-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground/80",
        className,
      )}
      role="note"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-risk-high" aria-hidden />
      <p>{text}</p>
    </div>
  );
}

export function DemoTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
        className,
      )}
    >
      Demo data
    </span>
  );
}
