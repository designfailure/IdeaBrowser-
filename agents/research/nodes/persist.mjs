// Hermes module: persist + history.
// Validates final envelope; appends to history if a previous envelope exists;
// writes phase2/data/research/<blueprint_id>.json atomically.

import fs from "node:fs";
import path from "node:path";

export async function persist(ctx, state) {
  const env = state.envelope;
  if (state._validate && !state._validate(env)) {
    ctx.errors.push(`schema invalid: ${JSON.stringify(state._validate.errors)}`);
    env.agent_trace.errors.push(...ctx.errors);
  }
  const out = path.join(ctx.root, "phase2/data/research", `${env.blueprint_id}.json`);
  if (fs.existsSync(out)) {
    try {
      const prev = JSON.parse(fs.readFileSync(out, "utf8"));
      const history = Array.isArray(prev.history) ? prev.history : [];
      history.push({
        crawled_at: prev.last_crawled_at,
        signal_score: prev.signal_score,
        delta: `${prev.signal_score} -> ${env.signal_score}`,
      });
      env.history = history;
    } catch {
      // ignore corrupt previous
    }
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(env, null, 2));
  return { state: { ...state, envelope: env } };
}
