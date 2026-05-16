# Blueprint Schema (Frozen Contract)

This document is the **frozen contract** for every venture blueprint in the corpus. The JSON Schema mirror is `schemas/blueprint.schema.json`. No blueprint ships without passing both this prose contract and the schema validator.

---

## The 15 Required Fields

| # | Field | Type | Constraint |
| --- | --- | --- | --- |
| 1 | `hook` | string | One-line vision, ≤ 140 chars, no vanity words |
| 2 | `core_problem` | string | Unresolved emotional/market pain; cite WHO and WHY |
| 3 | `emotional_driver` | enum | one of `fear`, `status`, `autonomy`, `belonging`, `mastery`, `convenience`, `identity` |
| 4 | `ai_leverage` | string | Concrete AI capability + what human/legacy work it replaces |
| 5 | `business_model` | enum | one of `subscription`, `marketplace`, `RaaS`, `embedded_finance`, `outcome_based`, `transaction_fee`, `consumption`, `licensing`, `data_network`, `hardware_plus_software`, `agency_as_software`, `co_op` |
| 6 | `monetization_logic` | string | Pricing structure, take rate, contract shape |
| 7 | `distribution_strategy` | string | GTM channel + wedge (PLG \| sales-led \| community \| OEM \| regulated) |
| 8 | `retention_loop` | string | Flywheel mechanics (data, network, habit, switching cost) |
| 9 | `moat_potential` | object | `{ class: enum, rationale: string }` where class ∈ `data`, `network`, `regulatory`, `switching_cost`, `brand`, `economy_of_scale`, `process`, `embedded_workflow` |
| 10 | `scalability_score` | integer | 1-10 inclusive + one-line `scalability_rationale` |
| 11 | `billion_dollar_path` | string | Concrete expansion arc beyond the wedge (3 stages) |
| 12 | `failure_avoidance` | array | ≥1 archetype IDs from `phase2/data/failures.json` (e.g., `["thin_wrapper_syndrome"]`) + inversion sentence |
| 13 | `validation_principle` | enum | exactly one of `medici`, `rothschild`, `buffett` + invocation |
| 14 | `technical_mvp_sketch` | object | `{ stack: string, agents: string[], data: string, infra: string, hitl: string }`; for Robotics adds `{ perception, control, sim, hardware_abstraction, safety }` |
| 15 | `ui_ux_operating_model` | enum | one of `conversational`, `agent_mediated`, `invisible`, `dashboard_plus_chat`, `voice_first`, `ar_overlay` + one-line interaction model |

---

## Identity & Provenance Fields (auto-populated)

| Field | Source |
| --- | --- |
| `id` | `{vertical}_{slug}` (e.g., `finance_vertical_neobank_for_gigworkers`) |
| `vertical` | one of the 13 verticals |
| `created_at` | ISO timestamp |
| `version` | semver; bumped on edit |
| `research_envelope` | reference to `phase2/data/research/<id>.json` (Phase 2.5) |

---

## The 13 Verticals

`finance`, `insurance`, `mobility`, `leisure`, `home_appliances`, `wearables`, `travel`, `pets`, `family`, `teenagers`, `millennials`, `gen_z`, `robotics_physical_ai`.

Each vertical contains exactly 10 blueprints. Total corpus: 130 records.

---

## Controlled Vocabularies (full)

### `emotional_driver`
`fear` | `status` | `autonomy` | `belonging` | `mastery` | `convenience` | `identity`

### `business_model`
`subscription` | `marketplace` | `RaaS` | `embedded_finance` | `outcome_based` | `transaction_fee` | `consumption` | `licensing` | `data_network` | `hardware_plus_software` | `agency_as_software` | `co_op`

### `moat_potential.class`
`data` | `network` | `regulatory` | `switching_cost` | `brand` | `economy_of_scale` | `process` | `embedded_workflow`

### `validation_principle`
`medici` (build the indispensable infrastructure) | `rothschild` (own the invisible information network) | `buffett` (impenetrable moat + cash-flow discipline)

### `ui_ux_operating_model`
`conversational` | `agent_mediated` | `invisible` | `dashboard_plus_chat` | `voice_first` | `ar_overlay`

### Failure archetype IDs (canonical list)
`fake_ai_trap` | `thin_wrapper_syndrome` | `hardware_scaling_chasm` | `unsustainable_unit_economics` | `regulatory_blind_spot` | `commoditization_collapse` | `market_timing_failure` | `governance_failure`

---

## Banned Vanity Phrases (lint sweep)

Reject blueprints containing any of:

- "revolutionary"
- "game-changing"
- "leverage synergies"
- "best-in-class"
- "world-class"
- "next-generation" (unless naming a literal product line, e.g., "next-generation EV battery chemistries")
- "disruptive" (unless quoting an external source)

---

## Worked Example (finance vertical)

```json
{
  "id": "finance_neobank_for_truckers",
  "vertical": "finance",
  "version": "1.0.0",
  "hook": "The neobank that closes a trucker's books while they sleep.",
  "core_problem": "1.9M US owner-operators run their books in shoeboxes; existing neobanks (Dave, Chime) treat them as 1099-W2 hybrids and miss IFTA, per-diem, and load-factoring economics.",
  "emotional_driver": "autonomy",
  "ai_leverage": "Vision agent ingests bills of lading + fuel receipts; ledger agent files IFTA quarterly; replaces a $4-6k/yr human bookkeeper.",
  "business_model": "embedded_finance",
  "monetization_logic": "$29/mo SaaS + 0.8% interchange + 1.5% factoring spread; net ARPU ~$110/mo at month 6.",
  "distribution_strategy": "Truck-stop wedge + DAT/Truckstop.com partnerships; community channel via owner-operator subreddits and CDL TikTok.",
  "retention_loop": "Books, IFTA, and factoring are quarter-locked; switching mid-quarter forfeits filings — high switching cost compounds with cash velocity.",
  "moat_potential": { "class": "switching_cost", "rationale": "Quarterly filings + factored receivables create a 90-day lock; data flywheel improves load-pricing recommendations." },
  "scalability_score": 8,
  "scalability_rationale": "TAM ~$2B SaaS + $10B factoring; constrained by trucker onboarding velocity, not technology.",
  "billion_dollar_path": "Stage 1: solo owner-operators. Stage 2: small fleets (2-20). Stage 3: factoring marketplace + load-pricing data network monetized to brokers.",
  "failure_avoidance": [
    "commoditization_collapse: avoid Dave's mass-market neobank trap by going vertical-deep with IFTA + factoring.",
    "regulatory_blind_spot: SOC 2 + state money-transmitter licenses scoped before launch."
  ],
  "validation_principle": "buffett",
  "validation_invocation": "Defensible quarterly switching cost + cash-flow positive at unit economics by month 9; reject growth at the cost of margin.",
  "technical_mvp_sketch": {
    "stack": "Next.js + tRPC + Postgres + Plaid + Unit.co",
    "agents": ["openclaw:bookkeeping_dag", "hermes:receipt_extract", "hermes:ifta_filer"],
    "data": "Receipts, BOLs, fuel cards, factoring ledger; per-trucker vector store for tax q&a.",
    "infra": "Vercel + Supabase + Inngest for scheduled IFTA jobs; Sentry; LaunchDarkly.",
    "hitl": "Operator approves any filed return >$5k or any factoring advance >$25k."
  },
  "ui_ux_operating_model": "agent_mediated",
  "ui_ux_invocation": "Trucker texts a photo of a receipt; agent files it; weekly digest in app; chat for any q&a."
}
```

---

## Validation Rules (enforced by `schemas/blueprint.schema.json`)

1. All 15 fields present and non-empty.
2. Enums respected (no free-text where enum required).
3. `scalability_score` is an integer 1-10.
4. `failure_avoidance` references at least one valid archetype ID.
5. `validation_principle` is exactly one (no hedging).
6. `id` matches `^[a-z0-9_]+$`.
7. `vertical` is one of the 13 canonical verticals.
8. `research_envelope` is a relative path string or null pre-Phase-2.5.
