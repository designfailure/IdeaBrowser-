import { NextResponse } from "next/server";
import { getBlueprints } from "@/lib/corpus";

export const runtime = "nodejs";

type Msg = { role: "user" | "agent" | "tool"; content: string };

// Stub conversational layer. The production Corsair agent is wired through the
// agents/openclaw + agents/hermes layer, with HITL gates for irreversible
// actions. This route returns deterministic responses keyed off intent prefixes
// so the surface is testable without an LLM provider configured.

export async function POST(req: Request) {
  const body = (await req.json()) as { messages: Msg[] };
  const last = body.messages[body.messages.length - 1]?.content?.toLowerCase() ?? "";
  const all = getBlueprints();

  if (/^rank/.test(last)) {
    const m = last.match(/rank\s+(\w+)/);
    const v = m?.[1];
    const subset = v ? all.filter((b) => b.vertical.includes(v)) : all;
    const top = [...subset]
      .sort((a, b) => b.scalability_score - a.scalability_score)
      .slice(0, 5);
    return NextResponse.json({
      reply: `Top 5${v ? ` ${v}` : ""} blueprints by scalability:\n` +
        top.map((b, i) => `${i + 1}. ${b.id} (${b.scalability_score}/10) — ${b.hook}`).join("\n"),
    });
  }
  if (/research/.test(last)) {
    return NextResponse.json({
      reply:
        "Routing to /research surface. The browser-equipped agent will dispatch query expansion -> multi-source search -> browser crawl -> extract -> dedupe -> score. HITL gate fires before envelope overwrite if Δsignal > 25.",
    });
  }
  if (/^prd|^generate prd/.test(last)) {
    return NextResponse.json({
      reply:
        "PRD generation is HITL-gated. Specify a blueprint id (e.g. `prd finance_neobank_for_truckers`) and I'll draft a PRD.md from the 15 fields + research envelope; you sign before write.",
    });
  }
  return NextResponse.json({
    reply:
      "Try: `rank robotics by moat`, `research finance_invoice_negotiator_agent`, `prd robotics_warehouse_picking_humanoid`, or `stress-test failure for travel_disruption_rebooking_agent`.",
  });
}
