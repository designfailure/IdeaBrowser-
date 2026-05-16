import { NextResponse } from "next/server";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getBlueprintById } from "@/lib/corpus";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const blueprint = getBlueprintById(params.id);
  if (!blueprint) return NextResponse.json({ error: "not found" }, { status: 404 });
  const orchestratorPath = path.resolve(process.cwd(), "..", "agents/research/orchestrator.mjs");
  const mod = await import(/* webpackIgnore: true */ pathToFileURL(orchestratorPath).href);
  const envelope = await mod.enrichBlueprint(blueprint);
  return NextResponse.json(envelope);
}
