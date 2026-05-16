// Schema validation gate. Throws to abort persist on schema violation.
// We import Ajv lazily to keep the orchestrator runtime-light.

import fs from "node:fs";
import path from "node:path";

let _validator = null;
async function getValidator(ctx) {
  if (_validator) return _validator;
  const Ajv2020Mod = await import("ajv/dist/2020.js");
  const addFormats = (await import("ajv-formats")).default;
  const Ajv = Ajv2020Mod.default ?? Ajv2020Mod;
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const schema = JSON.parse(
    fs.readFileSync(path.join(ctx.root, "schemas/research.schema.json"), "utf8")
  );
  _validator = ajv.compile(schema);
  return _validator;
}

export async function validate(ctx, state) {
  // We don't have the final envelope yet (orchestrator builds it after this node);
  // we attach a closure validation_callback the orchestrator will invoke before persist.
  const _validate = await getValidator(ctx);
  return {
    state: { ...state, _validate },
    note: "validator ready",
  };
}
