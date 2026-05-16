import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");
const DATA = path.join(ROOT, "phase2/data");

export type MoatClass =
  | "data" | "network" | "regulatory" | "switching_cost" | "brand"
  | "economy_of_scale" | "process" | "embedded_workflow";

export interface Blueprint {
  id: string;
  vertical: string;
  version: string;
  hook: string;
  core_problem: string;
  emotional_driver: string;
  ai_leverage: string;
  business_model: string;
  monetization_logic: string;
  distribution_strategy: string;
  retention_loop: string;
  moat_potential: { class: MoatClass; rationale: string };
  scalability_score: number;
  scalability_rationale: string;
  billion_dollar_path: string;
  failure_avoidance: string[];
  validation_principle: "medici" | "rothschild" | "buffett";
  validation_invocation: string;
  technical_mvp_sketch: Record<string, unknown>;
  ui_ux_operating_model: string;
  ui_ux_invocation: string;
  research_envelope?: string;
  created_at?: string;
}

export interface Vertical {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
}

export interface ResearchEnvelope {
  blueprint_id: string;
  last_crawled_at: string;
  signal_score: number;
  signal_band: "cold" | "warm" | "hot" | "nuclear";
  summary: string;
  citations: Array<{
    citation_id: string;
    url: string;
    title: string;
    source_class: string;
    retrieved_at: string;
    snippet?: string;
    sha256?: string;
    confidence?: number;
    paywalled?: boolean;
  }>;
  competitors: Array<{
    name: string;
    url?: string;
    status: "active" | "dead" | "acquired" | "stealth";
    funding_usd?: number | null;
    founded?: number | null;
    one_liner?: string;
    threat_level: "low" | "medium" | "high" | "critical";
    citation_id?: string;
  }>;
  papers: Array<{ title: string; url: string; abstract?: string; venue?: string; year?: number; relevance: number; citation_id?: string }>;
  dead_saas_matches: Array<{ failure_id: string; rationale: string }>;
  yc_rfs_matches: Array<{ anchor: string; url: string; rationale: string }>;
  a16z_thesis_matches: Array<{ title: string; url: string; rationale: string }>;
  regulatory_landscape: { jurisdictions: string[]; summary: string; citation_ids?: string[] };
  agent_trace: { openclaw_run_id: string; nodes: Array<{ name: string; status: string; duration_ms?: number; notes?: string }>; errors?: string[]; truncated?: boolean };
  confidence: number;
  history: Array<{ crawled_at: string; signal_score: number; delta?: string }>;
  version: string;
}

export interface Failure {
  rank: number;
  name: string;
  vertical: string;
  funding_lost_usd: number | null;
  cause: string;
  lesson: string;
  opportunity: string;
  archetypes: string[];
}

export interface Archetype {
  id: string;
  name: string;
  pattern: string;
  inversion: string;
}

export const getBlueprints = (): Blueprint[] =>
  JSON.parse(fs.readFileSync(path.join(DATA, "blueprints.json"), "utf8"));

export const getVerticals = (): Vertical[] =>
  JSON.parse(fs.readFileSync(path.join(DATA, "verticals.json"), "utf8")).verticals;

export const getBlueprintById = (id: string): Blueprint | null => {
  const all = getBlueprints();
  return all.find((b) => b.id === id) ?? null;
};

export const getResearchFor = (id: string): ResearchEnvelope | null => {
  const p = path.join(DATA, "research", `${id}.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
};

export const getFailures = () => JSON.parse(fs.readFileSync(path.join(DATA, "failures.json"), "utf8")) as { failures: Failure[]; archetypes: Archetype[] };
