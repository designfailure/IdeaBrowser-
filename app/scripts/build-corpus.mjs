#!/usr/bin/env node
// Consolidates per-vertical JSON files into phase2/data/blueprints.json
// Generates derived indexes + per-vertical markdown rendition.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(ROOT, "phase2/data");
const BP_DIR = path.join(DATA_DIR, "blueprints");
const MD_DIR = path.join(ROOT, "phase2/blueprints");
const INDEX_DIR = path.join(DATA_DIR, "indexes");

fs.mkdirSync(MD_DIR, { recursive: true });
fs.mkdirSync(INDEX_DIR, { recursive: true });

const verticals = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "verticals.json"), "utf8")
).verticals;

const all = [];
for (const v of verticals) {
  const fp = path.join(BP_DIR, `${v.id}.json`);
  if (!fs.existsSync(fp)) {
    console.warn(`Missing vertical file: ${fp}`);
    continue;
  }
  const items = JSON.parse(fs.readFileSync(fp, "utf8"));
  for (const it of items) {
    if (!it.research_envelope) {
      it.research_envelope = `phase2/data/research/${it.id}.json`;
    }
    if (!it.created_at) it.created_at = "2026-05-16T00:00:00Z";
    all.push(it);
  }
  console.log(`  + ${v.id}: ${items.length} blueprints`);
}

console.log(`\nTotal blueprints: ${all.length}`);

fs.writeFileSync(
  path.join(DATA_DIR, "blueprints.json"),
  JSON.stringify(all, null, 2)
);

// Derived indexes
const groupBy = (arr, fn) =>
  arr.reduce((acc, x) => {
    const k = fn(x);
    (acc[k] = acc[k] || []).push(x.id);
    return acc;
  }, {});

const indexes = {
  by_vertical: groupBy(all, (b) => b.vertical),
  by_validation_principle: groupBy(all, (b) => b.validation_principle),
  by_business_model: groupBy(all, (b) => b.business_model),
  by_moat_class: groupBy(all, (b) => b.moat_potential.class),
  by_emotional_driver: groupBy(all, (b) => b.emotional_driver),
  by_ui_ux_operating_model: groupBy(all, (b) => b.ui_ux_operating_model),
  by_archetype: all.reduce((acc, b) => {
    for (const fa of b.failure_avoidance || []) {
      const arch = fa.split(":")[0];
      (acc[arch] = acc[arch] || []).push(b.id);
    }
    return acc;
  }, {}),
};

fs.writeFileSync(
  path.join(INDEX_DIR, "by_vertical.json"),
  JSON.stringify(indexes.by_vertical, null, 2)
);
fs.writeFileSync(
  path.join(INDEX_DIR, "by_validation_principle.json"),
  JSON.stringify(indexes.by_validation_principle, null, 2)
);
fs.writeFileSync(
  path.join(INDEX_DIR, "by_business_model.json"),
  JSON.stringify(indexes.by_business_model, null, 2)
);
fs.writeFileSync(
  path.join(INDEX_DIR, "by_moat_class.json"),
  JSON.stringify(indexes.by_moat_class, null, 2)
);
fs.writeFileSync(
  path.join(INDEX_DIR, "by_archetype.json"),
  JSON.stringify(indexes.by_archetype, null, 2)
);

// Per-vertical markdown rendition
const renderField = (label, value) => {
  if (value == null) return "";
  if (Array.isArray(value)) return `- **${label}:** ${value.join("; ")}`;
  if (typeof value === "object") {
    return `- **${label}:** ${JSON.stringify(value)}`;
  }
  return `- **${label}:** ${value}`;
};

const renderBlueprint = (b) => `### ${b.hook}

\`id: ${b.id}\` · \`v${b.version}\` · \`${b.vertical}\`

${renderField("Core problem", b.core_problem)}
${renderField("Emotional driver", b.emotional_driver)}
${renderField("AI leverage", b.ai_leverage)}
${renderField("Business model", b.business_model)}
${renderField("Monetization", b.monetization_logic)}
${renderField("Distribution", b.distribution_strategy)}
${renderField("Retention loop", b.retention_loop)}
${renderField("Moat", `${b.moat_potential.class} — ${b.moat_potential.rationale}`)}
${renderField("Scalability", `${b.scalability_score}/10 — ${b.scalability_rationale}`)}
${renderField("Billion-dollar path", b.billion_dollar_path)}
${renderField("Failure avoidance", b.failure_avoidance)}
${renderField("Validation principle", `${b.validation_principle} — ${b.validation_invocation}`)}
${renderField("UI/UX model", `${b.ui_ux_operating_model} — ${b.ui_ux_invocation}`)}

**MVP sketch**

\`\`\`json
${JSON.stringify(b.technical_mvp_sketch, null, 2)}
\`\`\`
`;

for (const v of verticals) {
  const items = all.filter((b) => b.vertical === v.id);
  const md = `# ${v.name} — 10 Blueprints

> ${v.tagline}

${items.map(renderBlueprint).join("\n---\n\n")}
`;
  fs.writeFileSync(path.join(MD_DIR, `${v.id}.md`), md);
}

console.log(`Wrote: blueprints.json (${all.length}), 5 indexes, 13 vertical .md files`);
