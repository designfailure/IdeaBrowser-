import Link from "next/link";
import type { Blueprint, ResearchEnvelope } from "@/lib/corpus";
import { cn } from "@/lib/cn";

const bandStyle: Record<string, string> = {
  cold: "bg-cold/15 text-cold border-cold/30",
  warm: "bg-warm/15 text-warm border-warm/30",
  hot: "bg-hot/15 text-hot border-hot/30",
  nuclear: "bg-nuclear/15 text-nuclear border-nuclear/30",
};

const principleStyle: Record<string, string> = {
  medici: "text-emerald-300",
  rothschild: "text-sky-300",
  buffett: "text-amber-300",
};

export function BlueprintCard({
  blueprint,
  envelope,
  verticalColor,
}: {
  blueprint: Blueprint;
  envelope?: ResearchEnvelope | null;
  verticalColor?: string;
}) {
  const band = envelope?.signal_band ?? "cold";
  return (
    <Link
      href={`/b/${blueprint.id}`}
      className="group block rounded-xl border border-border bg-surface hover:border-accent/40 transition-all"
    >
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] uppercase tracking-wider text-mute font-mono"
            style={{ color: verticalColor }}
          >
            {blueprint.vertical.replace(/_/g, " ")}
          </span>
          <span
            className={cn(
              "text-[10px] uppercase tracking-wider font-mono px-1.5 py-0.5 rounded border",
              bandStyle[band]
            )}
          >
            {band} · {envelope?.signal_score ?? 0}
          </span>
        </div>
        <h3 className="text-sm font-medium leading-snug text-ink group-hover:text-accent transition-colors">
          {blueprint.hook}
        </h3>
        <p className="text-xs text-mute line-clamp-3">{blueprint.core_problem}</p>
        <div className="flex items-center justify-between pt-2 text-[11px] font-mono">
          <span className={cn("uppercase tracking-wide", principleStyle[blueprint.validation_principle])}>
            {blueprint.validation_principle}
          </span>
          <span className="text-mute">scale {blueprint.scalability_score}/10</span>
          <span className="text-mute">{blueprint.moat_potential.class}</span>
        </div>
      </div>
    </Link>
  );
}
