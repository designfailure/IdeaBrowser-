# Idea Browser — Product Requirements Document (Letter of Marque)

**Document role:** Sovereign product PRD for the Corsair Idea Browser. This file is the countersign gate: no JSON corpus, no application code, and no Phase 2 blueprint generation proceeds until this PRD and `RESEARCH_ENGINE_SPEC.md` are explicitly approved.

**Version:** 0.1 (Phase 0 freeze)  
**Status:** Awaiting countersignature  
**Canonical repo path:** `Idea_Browser/PRD.md`

---

## 1. Executive summary

Idea Browser is a **read-first research cockpit with optional action surfaces**, bounded by human-in-the-loop (HITL) checkpoints. It ingests a frozen **130-blueprint venture corpus** (13 verticals × 10 blueprints), each record conforming to a **15-field schema**, and surfaces **versioned, cited research envelopes** per blueprint produced by the **Corsair Research Engine** (Phase 2.5). The default product stance is **cockpit**: users browse, filter, inspect evidence, and trigger agent workflows; irreversible actions (corpus overwrite, external POST, deployment) require explicit approval.

---

## 2. Mission and scope

**Mission.** Give operators a single place to navigate category hypotheses, failure-avoidance logic, strategic validation (Medici | Rothschild | Buffett), and **live, provenance-disciplined evidence**—without conflating opinion with citation.

**In scope (Phase 0–3 as sequenced).**

- Frozen **BLUEPRINT_SCHEMA** contract (15 fields + controlled vocabularies).
- Phase 1 **post-mortem** table and eight **failure archetypes** as immutable analytical lens (verbatim import; machine-readable mirror in Phase 1 delivery, not Phase 0).
- Phase 2 **130 blueprints** (markdown per vertical + validated JSON mirror + indexes).
- Phase 2.5 **research envelopes** per blueprint: competitors, citations, papers, regulatory summaries, dead-SaaS matches, optional YC RFS / a16z anchors, signal score, agent trace, confidence, append-only history.
- Phase 3 **Next.js 14** (App Router) + TypeScript strict + Tailwind + shadcn/ui application: dashboard, vertical view, blueprint detail (tabs), failures explorer, global research surface, Corsair chat surface, faceted search, accessibility baseline WCAG 2.1 AA.

**Out of scope until explicitly re-scoped.**

- Bypassing paywalls or robots.txt; credential stuffing; bulk exfiltration behind auth without user entitlement.
- Autonomous deployment or spend without budget caps and HITL.
- Replacing legal, investment, or compliance review with automated “approval.”

**Non-goals.**

- Vanity metrics dashboards disconnected from evidence quality.
- Ungoverned agent write-back to `blueprints.json` without review queue.

---

## 3. Doctrine alignment (Letter of Marque)

- **PRD.md / SpecKit = Letter of Marque:** scope authority for scaffolding, agents, and corpus evolution is bounded by countersigned PRD + frozen schemas.
- **Evidence over opinion:** every synthesized claim in a research envelope carries `citation_id` → `citations[]`; uncited claims are invalid per `RESEARCH_ENGINE_SPEC.md`.
- **HITL:** research envelope overwrite, PRD generation from blueprint, MVP scaffold, deployment—each is a checkpointed action.

---

## 4. Stakeholders and governance

| Role | Responsibility |
|------|------------------|
| Issuer (product owner) | Countersigns PRD + research spec; sets budget caps and paywall policy. |
| Operator | Runs research DAGs, reviews `needs_review` queue, approves writes. |
| Engineering | Implements app and agents per frozen contracts. |

**Countersignature gate.** Phase 2a (blueprints), Phase 2b (JSON), Phase 2.5 (live research), and Phase 3 (app) are **blocked** until PRD + `RESEARCH_ENGINE_SPEC.md` are approved in writing (issue comment, PR approval, or documented ack).

---

## 5. Vertical coverage

Thirteen vertical files under `phase2/blueprints/`, ten blueprints each (130 total):

1. Finance  
2. Insurance  
3. Mobility  
4. Leisure  
5. Home Appliances  
6. Wearables  
7. Travel  
8. Pets  
9. Family  
10. Teenagers  
11. Millennials  
12. Gen-Z  
13. Robotics and Physical AI (per-blueprint: perception stack, planning/control, simulation environment, hardware abstraction, safety layer—specified inside `technical_mvp_sketch` and `BLUEPRINT_SCHEMA.md`)

---

## 6. Data and schema contracts (reference)

- **Human-readable contract:** `BLUEPRINT_SCHEMA.md` (15 fields, examples, validation rules).  
- **Machine validation (post-approval):** `schemas/blueprint.schema.json` and `schemas/research.schema.json`—emitted in Phase 2 / 2.5, not Phase 0.  
- **Failure archetypes:** Phase 1 artifact + `phase2/data/failures.json` (Phase 1 delivery); every blueprint’s `failure_avoidance` MUST reference **1–3 archetype IDs** from the frozen set of eight.

---

## 7. Corsair Research Engine (first-class capability)

**Objective.** Each blueprint is a **live research target**: versioned envelopes, staleness signals, deduplicated citations, competitor tables, regulatory landscape, paper harvest, and optional matches to YC RFS, a16z theses, and dead-SaaS corpus overlap.

**Operational constraints.** Documented in `RESEARCH_ENGINE_SPEC.md`: tool inventory, query expansion, source-class taxonomy and trust hierarchy, scoring, TTL/freshness, per-blueprint budgets, politeness, HITL, paywall policy.

**Default budget cap (configurable).** Per blueprint per enrichment run: **20** search calls, **30** fetches, **5** browser-automated navigations—unless issuer overrides in countersignature.

---

## 8. Application stack (Phase 3 proposal — lock unless overridden)

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 App Router | Matches operator WEB template; SSR for SEO-less internal tool optional. |
| Language | TypeScript strict | Type-safe joins between blueprint and research envelope. |
| Styling | Tailwind + shadcn/ui | Rapid, accessible primitives; consistent design system. |
| List data | Static import of `blueprints.json` | Predictable deploy; corpus versioned with git. |
| Research detail | Lazy fetch `phase2/data/research/<blueprint_id>.json` | Large payload isolation. |
| Search/filter | Fuse.js (client) + facets | Low ops burden for v1. |

**Override process:** Issuer states preferred stack in countersignature comment; PRD amended before Phase 3 scaffold.

---

## 9. Information architecture (routes)

- `/` — Armada: 130 blueprints, sort/filter (signal, crawled-at, scalability, vertical, principle, moat, archetype).  
- `/v/[vertical]` — Vertical aggregate signals.  
- `/b/[id]` — Blueprint: 15 fields; tabs **Blueprint | Live Evidence | Signals | Deep Research**.  
- `/failures` — Phase 1 failures + archetypes; backlinks to blueprints.  
- `/research` — Free-form deep research (cited); optional save-to-envelope (HITL).  
- `/corsair` — Conversational agent + tool cards + HITL for irreversible actions.

---

## 10. Success metrics (product)

| Metric | Target direction |
|--------|------------------|
| Citation coverage | ↑ Share of envelope fields backed by ≥1 citation. |
| Envelope validation pass rate | ↑ ≥80% auto-publish; rest in `needs_review`. |
| Staleness SLA | % envelopes within TTL by `source_class`. |
| Task completion (operator) | Time to locate blueprint + answer “why not dead” < baseline ad-hoc search. |
| Accessibility | WCAG 2.1 AA on shipped routes; automated axe in CI. |
| Test coverage (Phase 3) | ≥80% on UI components (per operator rule). |

---

## 11. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Source files absent from clone (post-mortem, dead-SaaS PDF) | Import checklist in `phase1/`; block Phase 2 until present. |
| Research cost/latency | Hard per-blueprint budgets; batch scheduling; stale badges + manual re-run. |
| Legal/research ethics | robots.txt, rate limits, skip paywalled unless user supplies entitled session. |
| Schema drift | Single `BLUEPRINT_SCHEMA.md` + JSON Schema CI gate post-Phase 0. |

---

## 12. Open questions (resolve at countersignature)

1. Confirm **Next.js 14 + shadcn** stack or specify alternative.  
2. Confirm **default cockpit** stance (read + gated write) vs stricter read-only mode.  
3. Confirm **trust hierarchy** ordering in `RESEARCH_ENGINE_SPEC.md` or amend.  
4. Confirm **OpenClaw / Hermes / GStack / gbarin** are **reference-only** in this repo until runtimes are wired, vs required local paths.

---

## 13. Phase map (execution order)

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 0 | PRD, LOI, blueprint schema doc, research engine spec, Phase 1 import placeholder or verbatim | Countersignature |
| 1 | Verbatim post-mortem + `failures.json` | Completeness review |
| 2a | 13 × markdown verticals | Lint + archetype refs |
| 2b | `blueprints.json` + schema CI | Validation |
| 2.5 | Research envelopes + cache (gitignored) | HITL + validation rate |
| 3 | Next.js app | A11y + tests |
| 4 | Agent DAGs + Hermes modules + browser subagent integration | HITL on writes |

---

## 14. Approval block

**Countersignature required on:** this `PRD.md` and `RESEARCH_ENGINE_SPEC.md` **together**.

Until approved: **no** `schemas/*.json`, **no** `blueprints.json`, **no** application code under `app/`.

Signed (draft): **Corsair / Idea Browser — Phase 0**
