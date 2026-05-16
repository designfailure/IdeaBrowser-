# Blueprint Schema — Frozen Contract (15 Fields)

**Status:** Phase 0 — canonical human specification. JSON Schema in `schemas/blueprint.schema.json` must mirror this document after countersignature.

**Record identity:** Each blueprint has stable `blueprint_id` (slug): `{vertical_slug}__{ordinal_two_digits}` e.g. `finance__03`. IDs are immutable after Phase 2b publish.

---

## 1. Field definitions

### 1.1 `blueprint_id` (record key, not counted in the 15 content fields)

- **Type:** string  
- **Pattern:** `^[a-z0-9_]+__[0-9]{2}$`  
- **Purpose:** Stable join key for research envelopes and UI routes.

---

### 1.2 `hook`

- **Type:** string, single sentence  
- **Max length:** 200 characters (recommended)  
- **Content:** One-line compelling vision; no hype adjectives from Section 5 banned list (Phase 2a lint).

### 1.3 `core_problem`

- **Type:** string, 1–3 sentences  
- **Content:** Unresolved market or emotional pain; concrete actor and situation.

### 1.4 `emotional_driver`

- **Type:** enum (single)  
- **Allowed values:** `fear` | `status` | `autonomy` | `belonging` | `mastery` | `relief` | `identity`  
- **Rule:** Exactly one primary driver.

### 1.5 `ai_leverage`

- **Type:** string, 2–4 sentences  
- **Content:** Named AI capability (e.g., retrieval, structured extraction, forecasting, policy simulation, vision-in-the-loop) and **what human process or legacy system it replaces**.

### 1.6 `business_model`

- **Type:** enum (single)  
- **Allowed values:** `subscription` | `marketplace` | `raas` | `embedded` | `outcome_based` | `usage_metered` | `hybrid` | `data_licensing` | `enterprise_license` | `community_paid`  
- **Notes:** `raas` = Robotics / anything “as a service” with recurring robot or fleet economics.

### 1.7 `monetization_logic`

- **Type:** string  
- **Content:** Pricing shape (seat, ARR tiers, take rate %, outcome fee), minimum contract, and **unit economics hint** (not fiction—assumption labeled if estimated).

### 1.8 `distribution_strategy`

- **Type:** string  
- **Content:** Primary GTM wedge (PLG, sales-led, community, partnership, regulatory channel, OEM, etc.) and **why it fits** this buyer.

### 1.9 `retention_loop`

- **Type:** string  
- **Content:** Explicit flywheel: data, network, habit, workflow embedding, compliance record, or switching cost—pick mechanisms, not slogans.

### 1.10 `moat_potential`

- **Type:** object with two keys  
- **Shape:** `{ "moat_class": <enum>, "rationale": <string> }`  
- **moat_class enum:** `data_network` | `workflow_lock_in` | `regulatory_licensing` | `brand_trust` | `supply_exclusive` | `cost_scale` | `tech_stack` | `multi_stakeholder`  
- **rationale:** 1–2 sentences tying moat_class to the blueprint.

### 1.11 `scalability_score`

- **Type:** integer  
- **Range:** 1–10 inclusive  
- **Companion field (JSON only, optional in markdown):** `scalability_justification` one line in markdown as second line under score heading.  
- **Rule:** Score without one-line justification is invalid in JSON mirror.

### 1.12 `billion_dollar_path`

- **Type:** string, 3–5 sentences  
- **Content:** Concrete expansion arc: adjacent SKU, geography, stack layer, or platform move—not “we become the X of everything.”

### 1.13 `failure_avoidance`

- **Type:** array of objects (JSON) / structured bullets (markdown)  
- **Rule:** **Minimum 1, maximum 3** archetype references.  
- **Each item:** `{ "archetype_id": "<id>", "mapping": "<1–2 sentences>" }`  
- **archetype_id:** Must exist in `phase2/data/failures.json` (Phase 1 delivery) — IDs listed in Phase 1 post-mortem (eight archetypes). Placeholder until import: use symbolic IDs from post-mortem only after file lands.

### 1.14 `validation_principle`

- **Type:** enum (exactly one)  
- **Allowed values:** `Medici` | `Rothschild` | `Buffett`  
- **Rule:** No compound values; pick the **single** dominant lens.

### 1.15 `technical_mvp_sketch`

- **Type:** string, structured prose (headings allowed)  
- **Required mentions:** Role assignment across **Claude Code**, **Cursor agents**, **OpenClaw DAG**, **Hermes modules**, **GStack**, **gbarin** (logical roles acceptable if runtimes absent).  
- **Robotics vertical only (mandatory extra sentences):** perception stack, planning/control loop, simulation environment, hardware abstraction layer, safety layer (monitoring, geofence, E-stop, sim-to-real gates).

### 1.16 `ui_ux_operating_model`

- **Type:** string  
- **Content:** AI-native interaction: conversational surfaces, agent-mediated steps, invisible UX patterns, memory/context expectations, and **what the human still verifies**.

---

## 2. Research envelope attachment (Phase 2.5)

Not one of the 15 content fields; stored as `research_envelope` on JSON records per `schemas/research.schema.json`.

- **Staleness:** UI reads `last_crawled_at` and TTL by `source_class`.  
- **History:** Append-only `history[]` for signal drift.  
- **Quality gate:** If >20% of citations fail validation, envelope status `needs_review` (not `published`).

---

## 3. Controlled vocabulary summary

| Field | Control type |
|-------|----------------|
| emotional_driver | Enum (7) |
| business_model | Enum (10) |
| moat_potential.moat_class | Enum (8) |
| validation_principle | Enum (3) |
| scalability_score | int 1–10 |
| failure_avoidance | 1–3 archetype refs |

---

## 4. Markdown file format (per vertical)

Each of 10 blueprints:

```markdown
## {ordinal}. {short_title}

- **blueprint_id:** `{vertical}__{nn}`
- **hook:** ...
- **core_problem:** ...
...
- **ui_ux_operating_model:** ...
```

Robotics: `technical_mvp_sketch` must include labeled sublines: `Perception:`, `Planning/control:`, `Simulation:`, `Hardware abstraction:`, `Safety:`.

---

## 5. Banned phrase lint (Phase 2a CI or manual regex)

Reject blueprints containing (case-insensitive): `revolutionary`, `game-changing`, `synergy`, `leverage synergies`, `paradigm shift`, `disruptive` (as empty intensifier), `world-class`, `bleeding edge`.

---

## 6. Example minimal blueprint (illustrative only — not corpus)

```json
{
  "blueprint_id": "finance__01",
  "hook": "Autonomous covenant monitoring for mid-market credit facilities with cited clause risk.",
  "core_problem": "Borrowers miss silent covenant trips until expensive cure or default.",
  "emotional_driver": "fear",
  "ai_leverage": "Long-context retrieval + clause graph extraction replaces manual paralegal sweeps weekly.",
  "business_model": "subscription",
  "monetization_logic": "$2k–$15k MRR by facility count; annual contracts; setup fee for legacy doc ingestion.",
  "distribution_strategy": "CFO + fractional GC communities; outbound to regional banks’ portfolio managers.",
  "retention_loop": "Historical covenant graph improves with each quarter’s filings; switching loses explainability trail.",
  "moat_potential": { "moat_class": "data_network", "rationale": "Proprietary clause graph per lender vertical compounds detection precision." },
  "scalability_score": 7,
  "scalability_justification": "Doc-heavy but pipeline parallelizable; some lender IT friction.",
  "billion_dollar_path": "Expand to syndicated loan ops + insurer reinsurance covenants + API to loan servicing cores.",
  "failure_avoidance": [
    { "archetype_id": "ARCH_WEDGE_TOO_NARROW", "mapping": "Starts with narrow covenant class lenders already track; avoids orphan feature." }
  ],
  "validation_principle": "Buffett",
  "technical_mvp_sketch": "Claude Code: parsers. Cursor: UI review. OpenClaw: ingest DAG. Hermes: fetch EDGAR, dedupe, cite. GStack: deploy Next service. gbarin: competitive clause map compression.",
  "ui_ux_operating_model": "Chat-first triage; evidence drawer pinned to each risk flag; human approves lender-facing memo export."
}
```

**Note:** `ARCH_WEDGE_TOO_NARROW` is illustrative; real IDs must match `failures.json` post Phase 1.
