// Corsair Research Engine — orchestrator.
// OpenClaw-style DAG: query_expansion -> multi_source_search -> dedupe ->
// fetch -> extract -> score -> validate -> persist.
//
// This module is deliberately runtime-agnostic: each node is a pure function
// over { ctx, blueprint, state }. Tools are injected via `ctx.tools` so the
// caller can wire native LLM tools (WebSearch, WebFetch), MCP servers
// (cursor-ide-browser, user-apify), and Hermes modules without coupling.
//
// To execute live runs, wire ctx.tools at the call site to the live
// providers. The default ctx.tools is a no-op stub that produces a deterministic
// envelope marked `version: "0.1.0-stub"`.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import { queryExpansion } from "./nodes/query_expansion.mjs";
import { multiSourceSearch } from "./nodes/multi_source_search.mjs";
import { browserCrawl } from "./nodes/browser_crawl.mjs";
import { extract } from "./nodes/extract.mjs";
import { dedupe } from "./nodes/dedupe.mjs";
import { score } from "./nodes/score.mjs";
import { validate } from "./nodes/validate.mjs";
import { persist } from "./nodes/persist.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");

const BUDGETS = {
  search: 20,
  fetch: 30,
  browser: 5,
  apify: 5,
  wallTimeMs: 5 * 60 * 1000,
  maxCostUsd: 0.5,
};

const newCtx = (overrides = {}) => ({
  root: ROOT,
  budgets: BUDGETS,
  spent: { search: 0, fetch: 0, browser: 0, apify: 0, costUsd: 0 },
  startedAt: Date.now(),
  trace: [],
  errors: [],
  tools: defaultStubTools(),
  ...overrides,
});

function defaultStubTools() {
  return {
    webSearch: async () => [],
    webFetch: async () => null,
    browser: async () => null,
    apify: async () => [],
    arxiv: async () => [],
    scholar: async () => [],
    ycRfs: async () => [],
    a16zThesis: async () => [],
    secEdgar: async () => [],
    githubTrending: async () => [],
    deadSaasIndex: async () => [],
  };
}

const recordNode = (ctx, name, fn) => async (state) => {
  const t0 = Date.now();
  try {
    const out = await fn(ctx, state);
    ctx.trace.push({
      name,
      status: "ok",
      duration_ms: Date.now() - t0,
      notes: out?.note,
    });
    return out?.state ?? state;
  } catch (err) {
    ctx.trace.push({
      name,
      status: "error",
      duration_ms: Date.now() - t0,
      notes: String(err.message || err),
    });
    ctx.errors.push(`${name}: ${String(err.message || err)}`);
    return state;
  }
};

export async function enrichBlueprint(blueprint, ctxOverrides = {}) {
  const ctx = newCtx(ctxOverrides);
  const runId = `run-${blueprint.id}-${Date.now().toString(36)}-${crypto
    .randomBytes(3)
    .toString("hex")}`;

  let state = {
    blueprint,
    queries: [],
    rawResults: [],
    pages: [],
    citations: [],
    competitors: [],
    papers: [],
    deadSaasMatches: [],
    ycRfsMatches: [],
    a16zThesisMatches: [],
    regulatoryLandscape: { jurisdictions: [], summary: "" },
    signal: { score: 0, band: "cold" },
  };

  const dag = [
    ["query_expansion", queryExpansion],
    ["multi_source_search", multiSourceSearch],
    ["browser_crawl", browserCrawl],
    ["extract", extract],
    ["dedupe", dedupe],
    ["score", score],
    ["validate", validate],
  ];

  for (const [name, fn] of dag) {
    state = await recordNode(ctx, name, fn)(state);
    if (Date.now() - ctx.startedAt > BUDGETS.wallTimeMs) {
      ctx.trace.push({
        name: "budget_guard",
        status: "partial",
        notes: "wall time budget exceeded; persisting partial envelope",
      });
      break;
    }
  }

  const envelope = {
    blueprint_id: blueprint.id,
    last_crawled_at: new Date(ctx.startedAt).toISOString(),
    signal_score: state.signal.score,
    signal_band: state.signal.band,
    summary:
      state.summary ||
      `Live envelope for ${blueprint.id} (${state.citations.length} citations).`,
    citations: state.citations,
    competitors: state.competitors,
    papers: state.papers,
    dead_saas_matches: state.deadSaasMatches,
    yc_rfs_matches: state.ycRfsMatches,
    a16z_thesis_matches: state.a16zThesisMatches,
    regulatory_landscape: state.regulatoryLandscape,
    agent_trace: {
      openclaw_run_id: runId,
      started_at: new Date(ctx.startedAt).toISOString(),
      ended_at: new Date().toISOString(),
      truncated: ctx.errors.length > 0,
      nodes: ctx.trace,
      errors: ctx.errors,
    },
    confidence: state.confidence ?? 0.4,
    history: [],
    version: "1.0.0",
  };

  const persisted = await persist(ctx, { ...state, envelope });
  return persisted.state.envelope;
}

export async function runResearch(opts) {
  const blueprints = JSON.parse(
    fs.readFileSync(path.join(ROOT, "phase2/data/blueprints.json"), "utf8")
  );
  const targets = opts.id
    ? blueprints.filter((b) => b.id === opts.id)
    : opts.vertical
      ? blueprints.filter((b) => b.vertical === opts.vertical)
      : blueprints;
  if (!targets.length) {
    console.error("No blueprints matched.");
    process.exit(1);
  }
  console.log(`Running research enrichment on ${targets.length} blueprint(s).`);
  for (const b of targets) {
    process.stdout.write(`  - ${b.id} ... `);
    const env = await enrichBlueprint(b);
    process.stdout.write(`signal=${env.signal_score} (${env.signal_band})\n`);
  }
  console.log("Done.");
}
