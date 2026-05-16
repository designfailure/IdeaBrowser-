import { NextResponse } from "next/server";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json()) as { query: string };
  const synthetic = {
    id: `freeform_${Date.now()}`,
    vertical: "freeform",
    version: "0.0.0",
    hook: body.query,
    core_problem: body.query,
    emotional_driver: "mastery",
    ai_leverage: "free-form research",
    business_model: "subscription",
    monetization_logic: "n/a",
    distribution_strategy: "n/a",
    retention_loop: "n/a",
    moat_potential: { class: "data" as const, rationale: "n/a" },
    scalability_score: 5,
    scalability_rationale: "n/a",
    billion_dollar_path: "n/a",
    failure_avoidance: ["thin_wrapper_syndrome: n/a"],
    validation_principle: "rothschild" as const,
    validation_invocation: "n/a",
    technical_mvp_sketch: { stack: "", agents: [], data: "", infra: "", hitl: "" },
    ui_ux_operating_model: "conversational" as const,
    ui_ux_invocation: "n/a",
  };
  const orchestratorPath = path.resolve(process.cwd(), "..", "agents/research/orchestrator.mjs");
  const mod = await import(/* webpackIgnore: true */ pathToFileURL(orchestratorPath).href);
  const envelope = await mod.enrichBlueprint(synthetic);
  return NextResponse.json({ envelope, trace: envelope.agent_trace, reply: envelope.summary });
}
