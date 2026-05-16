#!/usr/bin/env node
// CLI entry to run the Corsair Research Engine for a single blueprint or vertical.
// Defers to agents/research/orchestrator.mjs for the actual DAG execution.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { runResearch } from "../../agents/research/orchestrator.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const opts = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--")) opts[args[i].slice(2)] = args[i + 1];
}

if (!opts.id && !opts.vertical) {
  console.error("Usage: npm run research -- --id <blueprint_id> | --vertical <vertical>");
  process.exit(1);
}

await runResearch(opts);
