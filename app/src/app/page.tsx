import { getBlueprints, getResearchFor, getVerticals } from "@/lib/corpus";
import { ArmadaGrid } from "@/components/armada-grid";

export default function HomePage() {
  const blueprints = getBlueprints();
  const verticals = getVerticals();
  const envelopesById: Record<string, ReturnType<typeof getResearchFor>> = {};
  for (const b of blueprints) envelopesById[b.id] = getResearchFor(b.id);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">The Armada</h1>
        <p className="text-sm text-mute">
          {blueprints.length} venture blueprints across {verticals.length} verticals.
          Each blueprint commits to one validation principle, maps to ≥1 of the 8
          failure archetypes from the Phase 1 post-mortem, and carries a versioned
          research envelope. Filter, sort, then deep-dive.
        </p>
      </header>
      <ArmadaGrid blueprints={blueprints} verticals={verticals} envelopesById={envelopesById} />
    </div>
  );
}
