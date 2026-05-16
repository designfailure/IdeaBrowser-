import { notFound } from "next/navigation";
import { getBlueprints, getResearchFor, getVerticals } from "@/lib/corpus";
import { BlueprintCard } from "@/components/blueprint-card";

export default function VerticalPage({ params }: { params: { vertical: string } }) {
  const verticals = getVerticals();
  const v = verticals.find((x) => x.id === params.vertical);
  if (!v) notFound();
  const blueprints = getBlueprints().filter((b) => b.vertical === v.id);
  const envelopes = blueprints.map((b) => getResearchFor(b.id));
  const avgSignal = Math.round(
    envelopes.reduce((s, e) => s + (e?.signal_score ?? 0), 0) / Math.max(1, envelopes.length)
  );
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="text-xs font-mono uppercase tracking-wider" style={{ color: v.color }}>
          {v.name}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{v.tagline}</h1>
        <p className="text-sm text-mute">
          {blueprints.length} blueprints · average signal score{" "}
          <span className="text-ink font-mono">{avgSignal}</span>
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {blueprints.map((b, i) => (
          <BlueprintCard key={b.id} blueprint={b} envelope={envelopes[i]} verticalColor={v.color} />
        ))}
      </div>
    </div>
  );
}
