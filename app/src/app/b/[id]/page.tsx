import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlueprintById, getResearchFor, getVerticals } from "@/lib/corpus";
import { BlueprintTabs } from "@/components/blueprint-tabs";

export default function BlueprintDetailPage({ params }: { params: { id: string } }) {
  const blueprint = getBlueprintById(params.id);
  if (!blueprint) notFound();
  const envelope = getResearchFor(blueprint.id);
  const verticals = getVerticals();
  const v = verticals.find((x) => x.id === blueprint.vertical);
  return (
    <div className="space-y-6">
      <div className="text-xs font-mono text-mute">
        <Link href="/" className="hover:text-accent">Armada</Link>
        <span className="px-2">/</span>
        <Link href={`/v/${blueprint.vertical}`} className="hover:text-accent" style={{ color: v?.color }}>
          {v?.name ?? blueprint.vertical}
        </Link>
        <span className="px-2">/</span>
        <span className="text-ink">{blueprint.id}</span>
      </div>
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold leading-tight">{blueprint.hook}</h1>
        <p className="text-sm text-mute">{blueprint.core_problem}</p>
      </header>
      <BlueprintTabs blueprint={blueprint} envelope={envelope} />
    </div>
  );
}
