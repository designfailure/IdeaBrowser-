"use client";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { BlueprintCard } from "@/components/blueprint-card";
import type { Blueprint, ResearchEnvelope, Vertical } from "@/lib/corpus";
import { cn } from "@/lib/cn";

const PRINCIPLES = ["all", "medici", "rothschild", "buffett"] as const;
const BANDS = ["all", "cold", "warm", "hot", "nuclear"] as const;
const SORTS = ["signal", "scale", "vertical", "alpha"] as const;

export function ArmadaGrid({
  blueprints,
  verticals,
  envelopesById,
}: {
  blueprints: Blueprint[];
  verticals: Vertical[];
  envelopesById: Record<string, ResearchEnvelope | null>;
}) {
  const [q, setQ] = useState("");
  const [vertical, setVertical] = useState<string>("all");
  const [principle, setPrinciple] = useState<(typeof PRINCIPLES)[number]>("all");
  const [band, setBand] = useState<(typeof BANDS)[number]>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("signal");

  const fuse = useMemo(
    () =>
      new Fuse(blueprints, {
        keys: ["hook", "core_problem", "ai_leverage", "id", "vertical"],
        threshold: 0.34,
      }),
    [blueprints]
  );

  const verticalColor = useMemo(() => {
    const m: Record<string, string> = {};
    for (const v of verticals) m[v.id] = v.color;
    return m;
  }, [verticals]);

  const filtered = useMemo(() => {
    let arr = q ? fuse.search(q).map((r) => r.item) : blueprints.slice();
    if (vertical !== "all") arr = arr.filter((b) => b.vertical === vertical);
    if (principle !== "all") arr = arr.filter((b) => b.validation_principle === principle);
    if (band !== "all") arr = arr.filter((b) => (envelopesById[b.id]?.signal_band ?? "cold") === band);
    arr.sort((a, b) => {
      if (sort === "signal") return (envelopesById[b.id]?.signal_score ?? 0) - (envelopesById[a.id]?.signal_score ?? 0);
      if (sort === "scale") return b.scalability_score - a.scalability_score;
      if (sort === "vertical") return a.vertical.localeCompare(b.vertical);
      return a.hook.localeCompare(b.hook);
    });
    return arr;
  }, [q, vertical, principle, band, sort, blueprints, fuse, envelopesById]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
        <input
          type="text"
          placeholder="Fuzzy search hook, problem, AI leverage..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm text-ink placeholder:text-mute focus:outline-none focus:border-accent"
        />
        <div className="flex flex-wrap gap-2 text-xs">
          <Pill
            active={vertical === "all"}
            onClick={() => setVertical("all")}
            label={`all verticals (${blueprints.length})`}
          />
          {verticals.map((v) => (
            <Pill
              key={v.id}
              active={vertical === v.id}
              onClick={() => setVertical(v.id)}
              label={`${v.name}`}
              color={v.color}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-xs items-center">
          <span className="text-mute">principle:</span>
          {PRINCIPLES.map((p) => (
            <Pill key={p} active={principle === p} onClick={() => setPrinciple(p)} label={p} />
          ))}
          <span className="text-mute ml-2">signal:</span>
          {BANDS.map((b) => (
            <Pill key={b} active={band === b} onClick={() => setBand(b)} label={b} />
          ))}
          <span className="text-mute ml-auto">sort:</span>
          {SORTS.map((s) => (
            <Pill key={s} active={sort === s} onClick={() => setSort(s)} label={s} />
          ))}
        </div>
      </div>
      <div className="text-xs text-mute font-mono">{filtered.length} of {blueprints.length} blueprints</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((b) => (
          <BlueprintCard
            key={b.id}
            blueprint={b}
            envelope={envelopesById[b.id]}
            verticalColor={verticalColor[b.vertical]}
          />
        ))}
      </div>
    </div>
  );
}

function Pill({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 rounded-md border font-mono uppercase tracking-wide transition-colors",
        active ? "bg-accent text-bg border-accent" : "bg-bg text-ink border-border hover:border-accent/50"
      )}
      style={!active && color ? { color } : undefined}
    >
      {label}
    </button>
  );
}
