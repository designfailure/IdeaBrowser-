# Corsair Idea Browser — Product Requirements Document

**Status:** Active (autonomous build, countersignature waived by operator)
**Version:** v1.0
**Owner:** Sovereign Venture Syndicate
**Issuance:** Letter of Marque + Idea Browser Product Spec

---

## 1. Executive Summary

The Corsair Idea Browser is an AI-native, evidence-anchored cockpit that transforms 130 venture blueprints into a living research surface. It fuses three artifacts:

1. A **frozen 15-field blueprint corpus** (130 records, 13 verticals, machine-readable JSON).
2. A **Corsair Research Engine** that browses the open web, scrapes high-signal sources, and attaches a versioned, cited research envelope to every blueprint.
3. A **conversational + browser-equipped Idea Browser app** (Next.js 14 + shadcn/ui) where operators triage, deep-dive, and hoist the flag on individual ideas.

**Primary Goal:** Deliver an operator a single surface where they can (a) read a frozen 15-field venture thesis, (b) see the live evidence backing or contradicting it, (c) issue a deep-research command to a browser-equipped agent, and (d) export a PRD-ready brief for any of the 130 ideas in under 30 seconds.

---

## 2. Mission, Scope, and Non-Goals

### 2.1 Mission

Replace static blueprint PDFs with an AI-native, agent-orchestrated research cockpit that treats every venture idea as a live target with continuous market intelligence.

### 2.2 In Scope

- 130 blueprints, 13 verticals, 15 fields each, machine-readable.
- Live web research per blueprint (citations, competitors, papers, regulatory motion).
- Idea Browser app (Next.js 14 + TS + Tailwind + shadcn/ui).
- Corsair agent layer (OpenClaw DAGs + Hermes modules + browser-equipped subagent).
- Phase 1 post-mortem corpus + 8 archetype taxonomy referenced from every blueprint.

### 2.3 Out of Scope

- Multi-tenant SaaS, billing, auth (single-operator local-first cockpit).
- Real-time collaborative editing of blueprints.
- Auto-deployment of blueprint MVPs (blueprint → MVP scaffold is a separate mandate).
- Bypassing paywalls or robots.txt.

### 2.4 Future (Phase 2+)

- Team mode with role-based access.
- "Hoist the Flag" pipeline — auto-scaffold an MVP repo from a blueprint.
- Continuous overnight re-crawl + drift alerts.

---

## 3. Personas

### 3.1 The Corsair (primary operator)

- AI-native venture architect.
- Reads 130 blueprints; needs to triage to top 5 by moat and signal score.
- Wants: faceted filtering, fuzzy search, one-click deep research, copy-paste-ready PRDs.

### 3.2 The Investor / Counsel

- Reviews a blueprint the Corsair has flagged.
- Wants: cited evidence, competitor table, regulatory landscape, dead-SaaS analogues.
- Audit trail on every claim.

### 3.3 The Engineer

- Picks a blueprint and asks: "scaffold this MVP."
- Wants: technical_mvp_sketch with role assignments + AI-native UI/UX spec.

---

## 4. Requirements

### 4.1 Functional

- F1. Render 130 blueprints in faceted grid (vertical, validation principle, moat class, scalability, failure archetype, signal score band, freshness).
- F2. Per-blueprint detail view with 4 tabs: Blueprint, Live Evidence, Signals, Deep Research.
- F3. Live Evidence pane renders citations grouped by source class with retrieved-at, snippet, sha256, "Open in browser" action.
- F4. Deep Research tab streams agent traces from the Corsair Browser Agent in real time.
- F5. Global `/research` surface: free-form prompt → browser-equipped agent → cited synthesis.
- F6. Global `/corsair` chat: tool-calling + browser pane + HITL gates for irreversible actions.
- F7. `/failures` surface: 20 post-mortems + 8 archetypes, backlinked from blueprints.
- F8. Export blueprint as PRD.md (copy-paste block per field).
- F9. JSON Schema validation for every blueprint and every research envelope.
- F10. Versioned research envelopes (history array; signal drift observable).

### 4.2 Non-Functional

- Performance: blueprint grid renders <200ms; detail view <500ms; research streaming <2s first token.
- Security: no secrets in repo; environment variables only; respect robots.txt; identifying user-agent.
- Accessibility: WCAG 2.1 AA.
- Auditability: every research run logged with OpenClaw run id + node trace.
- Reliability: app degrades gracefully when a research envelope is missing or stale.

### 4.3 Quality Gates

- 100% of blueprints pass `schemas/blueprint.schema.json`.
- 100% of research envelopes pass `schemas/research.schema.json`.
- Lint sweep against banned vanity phrases (revolutionary, game-changing, leverage synergies, etc.).
- Every blueprint cites ≥1 of the 8 failure archetypes.
- Every blueprint picks exactly one validation principle (Medici | Rothschild | Buffett).

---

## 5. Architecture

### 5.1 Layers

1. **Corpus layer** — `phase2/data/blueprints.json` + `phase2/data/research/<id>.json` + `phase2/data/failures.json`.
2. **Schema layer** — `schemas/blueprint.schema.json` + `schemas/research.schema.json`.
3. **Agent layer** — `agents/openclaw/` (DAGs) + `agents/hermes/` (executors) + `agents/research/` (Corsair Research Engine).
4. **App layer** — `app/` Next.js 14 App Router.

### 5.2 Stack

- Next.js 14 + TypeScript strict + Tailwind + shadcn/ui.
- Static import of `blueprints.json` at build time; lazy fetch of research envelopes per detail page.
- Fuse.js for fuzzy search; client-side facets.
- Server actions invoke the agent layer; SSE streams agent traces.

### 5.3 Tool Inventory (Research Engine)

- Native: `WebSearch`, `WebFetch`.
- Browser MCP: `cursor-ide-browser` (snapshot, navigate, extract).
- Apify scrapers: Crunchbase, LinkedIn, ProductHunt, Reddit, HN, X, YouTube.
- Domain harvesters: arXiv/SSRN, Google Scholar (SerpAPI), YC RFS, a16z theses, SEC EDGAR, GitHub trending.
- Cache: content-addressed (`sha256(url+canonical_body)`), TTL per source class.

---

## 6. Success Metrics

| KPI | Target |
| --- | --- |
| Blueprints with a research envelope | 130 / 130 |
| Average citations per envelope | ≥ 6 |
| Average source-class diversity per envelope | ≥ 4 |
| Schema validation pass rate | 100% |
| Time-to-PRD-export per blueprint | ≤ 30s |
| Research drift detected per week (re-crawl) | observable, not 0 |
| Deep-research session round-trip | ≤ 90s |

---

## 7. Governance & HITL

- HITL gates: research envelope overwrite, PRD generation, MVP scaffold, deployment.
- Provenance discipline: every claim in a research envelope carries a `citation_id`; uncited claims rejected by schema.
- Audit log: OpenClaw run id + per-node trace persisted with each envelope version.
- Crawl politeness: robots.txt respected, 1 req/sec per host, identifying user-agent, paywall bypass forbidden.

---

## 8. Roadmap

| Phase | Output | Stop condition |
| --- | --- | --- |
| Phase 0 | PRD + Letter of Marque + Schemas (markdown) | Frozen contract (this doc) |
| Phase 1 | Verbatim post-mortem import + failures.json | Schema-valid failures index |
| Phase 2a | 130 blueprints (vertical-by-vertical) | All 13 verticals committed |
| Phase 2b | blueprints.json + verticals.json + indexes | 100% schema pass |
| Phase 2.5 | Research envelopes (130) + cache | All envelopes validate |
| Phase 3 | Next.js app + 6 routes + Live Evidence pane | App runs locally |
| Phase 4 | Agent layer + Corsair Browser Agent | HITL gates wired |
| Hoist | Deploy + analytics + report | Dashboard live |

---

## 9. Open Questions (resolved by operator decree, autonomous mode)

| Question | Resolution |
| --- | --- |
| App stack | Next.js 14 + shadcn (default) — confirmed by autonomous mandate. |
| Idea Browser scope | Action-capable cockpit (HITL-gated). |
| Phase 2.5 budget | 20 searches / 30 fetches / 5 browser navs per blueprint. |
| Source trust order | peer paper > regulatory > YC RFS / a16z > major news > founder writeup > social. |
| Paywalls | Skip by default; operator-supplied cookies allowed. |
| Countersignature | Waived by operator for autonomous build. |

---

## 10. Change Log

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-16 | v1.0 | Initial autonomous issuance. |
