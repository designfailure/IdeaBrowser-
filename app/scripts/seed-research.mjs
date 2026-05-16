#!/usr/bin/env node
// Seeds a research envelope per blueprint with deterministic placeholders.
// Real envelopes are emitted by agents/research/run-enrich.mjs (Phase 2.5 live runs).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(ROOT, "phase2/data");
const RESEARCH_DIR = path.join(DATA_DIR, "research");

fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const blueprints = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "blueprints.json"), "utf8")
);

const failures = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "failures.json"), "utf8")
).failures;

const seed = (id) => {
  const h = crypto.createHash("sha256").update(id).digest();
  return h.readUInt32BE(0);
};

const band = (s) =>
  s >= 90 ? "nuclear" : s >= 70 ? "hot" : s >= 40 ? "warm" : "cold";

let created = 0;
let skipped = 0;

for (const b of blueprints) {
  const out = path.join(RESEARCH_DIR, `${b.id}.json`);
  if (fs.existsSync(out)) {
    skipped++;
    continue;
  }
  const s = seed(b.id);
  const score = 30 + (s % 55);
  const matched = (b.failure_avoidance || []).map((fa) => fa.split(":")[0]);
  const dead = failures
    .filter((f) => f.archetypes.some((a) => matched.includes(a)))
    .slice(0, 2)
    .map((f) => ({
      failure_id: f.name.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
      rationale: `Risk profile overlaps ${f.name} (${f.cause}).`,
    }));
  const envelope = {
    blueprint_id: b.id,
    last_crawled_at: "2026-05-16T00:00:00Z",
    signal_score: score,
    signal_band: band(score),
    summary: `Seeded envelope. ${b.hook} Live web research has not run yet; invoke 'npm run research -- --id ${b.id}' to populate citations.`,
    citations: [],
    competitors: [],
    papers: [],
    dead_saas_matches: dead,
    yc_rfs_matches: [],
    a16z_thesis_matches: [],
    regulatory_landscape: { jurisdictions: [], summary: "Pending live enrichment." },
    agent_trace: {
      openclaw_run_id: `seed-${b.id}-${s}`,
      started_at: "2026-05-16T00:00:00Z",
      ended_at: "2026-05-16T00:00:01Z",
      truncated: false,
      nodes: [
        { name: "seed", status: "ok", duration_ms: 1, notes: "deterministic placeholder" },
      ],
      errors: [],
    },
    confidence: 0.2,
    history: [{ crawled_at: "2026-05-16T00:00:00Z", signal_score: score, delta: "initial seed" }],
    version: "0.1.0-seed",
  };
  fs.writeFileSync(out, JSON.stringify(envelope, null, 2));
  created++;
}

console.log(`Seeded research envelopes: ${created} created, ${skipped} skipped (already existed).`);
