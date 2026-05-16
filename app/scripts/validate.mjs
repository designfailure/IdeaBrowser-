#!/usr/bin/env node
// Validates blueprints.json + every research envelope against schemas.
// Also runs the banned-vanity-phrase lint sweep on every blueprint.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
const Ajv = Ajv2020.default ?? Ajv2020;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(ROOT, "phase2/data");
const SCHEMA_DIR = path.join(ROOT, "schemas");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const blueprintSchema = JSON.parse(
  fs.readFileSync(path.join(SCHEMA_DIR, "blueprint.schema.json"), "utf8")
);
const researchSchema = JSON.parse(
  fs.readFileSync(path.join(SCHEMA_DIR, "research.schema.json"), "utf8")
);

const validateBp = ajv.compile(blueprintSchema);
const validateRes = ajv.compile(researchSchema);

const banned = [
  "revolutionary",
  "game-changing",
  "leverage synergies",
  "best-in-class",
  "world-class",
  "disruptive",
];

const blueprints = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, "blueprints.json"), "utf8")
);

let bpErrors = 0;
let lintErrors = 0;
const stringFields = (b) =>
  [
    b.hook,
    b.core_problem,
    b.ai_leverage,
    b.monetization_logic,
    b.distribution_strategy,
    b.retention_loop,
    b.billion_dollar_path,
    b.validation_invocation,
    b.ui_ux_invocation,
    b.scalability_rationale,
    b.moat_potential?.rationale,
  ].filter(Boolean);

for (const b of blueprints) {
  if (!validateBp(b)) {
    bpErrors++;
    console.error(`✗ blueprint ${b.id}:`, validateBp.errors);
  }
  const txt = stringFields(b).join(" ").toLowerCase();
  for (const w of banned) {
    if (txt.includes(w)) {
      lintErrors++;
      console.warn(`! lint ${b.id}: contains banned phrase "${w}"`);
    }
  }
}

let resErrors = 0;
let resCount = 0;
const resDir = path.join(DATA_DIR, "research");
if (fs.existsSync(resDir)) {
  for (const f of fs.readdirSync(resDir)) {
    if (!f.endsWith(".json")) continue;
    if (f.startsWith("_")) continue;
    const env = JSON.parse(fs.readFileSync(path.join(resDir, f), "utf8"));
    resCount++;
    if (!validateRes(env)) {
      resErrors++;
      console.error(`✗ research ${f}:`, validateRes.errors);
    }
  }
}

console.log(
  `\nBlueprints: ${blueprints.length} (${bpErrors} schema errors, ${lintErrors} lint warnings)`
);
console.log(`Research envelopes: ${resCount} (${resErrors} schema errors)`);
if (bpErrors || resErrors) process.exit(1);
console.log("✓ Validation passed.");
