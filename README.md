# Corsair Idea Browser

<img width="2560" height="1440" alt="corsair_idea_browser_spec" src="https://github.com/user-attachments/assets/28eec988-edcd-4794-b9b8-a5c3ce405f1a" />

The Corsair Idea Browser is an AI-native venture intelligence platform designed to transform static investment theses into a dynamic, evidence-backed decision engine. By integrating a structured 15-field "blueprint" schema with an automated Research DAG, the system synthesizes live market signals, competitive citations, and failure archetypes into a refreshable research cockpit for operators. Orchestrated by specialized agents like OpenClaw and Hermes, the solution ensures that every venture hypothesis is stress-tested against real-world data while maintaining strict Human-in-the-Loop governance to ensure sovereign oversight over irreversible actions.

If this system successfully shifts venture design from static memos to live, cited signals, how might the role of a venture partner evolve when their primary value-add moves from information gathering to the strategic calibration of the agent's research budgets and governance thresholds?

<img width="1258" height="1335" alt="the Corsair Idea Browser Armada" src="https://github.com/user-attachments/assets/c10e639e-9c18-4800-a98a-bd8aca744988" />


AI-native venture research cockpit. 130 blueprints × 13 verticals × 15 fields. Live-web research per blueprint. Browser-equipped Corsair agent layer. Built under the [Letter of Marque](./LETTER_OF_MARQUE.md).

## Quickstart

```bash
# Install
cd app
npm install

# Validate corpus
npm run validate          # validates blueprints.json + research/*.json against schemas

# Dev (http://localhost:3000 by default; connection refused on another port → server not running or wrong PORT)
npm run dev
# Custom port example (PowerShell): $env:PORT=3737; npm run dev

# Re-crawl a single blueprint's research envelope
npm run research -- --id finance_neobank_for_truckers

# Re-crawl an entire vertical
npm run research -- --vertical robotics_physical_ai
```

<img width="1272" height="649" alt="Corsair" src="https://github.com/user-attachments/assets/0ee0a9d3-05cc-4b3c-9832-f0d8737ed393" /> 


## Repository Layout

```
Idea_Browser/
├── PRD.md                          # Master PRD (governance source of truth)
├── LETTER_OF_MARQUE.md             # Corsaro mandate + Idea Browser delta
├── BLUEPRINT_SCHEMA.md             # The 15-field contract (prose)
├── RESEARCH_ENGINE_SPEC.md         # Tool inventory, scoring, TTLs, HITL gates
├── README.md                       # This file
│
├── phase1/
│   └── phase1_postmortem.md        # 20 failures + 8 archetypes (verbatim import)
│
├── phase2/
│   ├── blueprints/                 # 13 vertical .md files (one per vertical, 10 blueprints each)
│   │   ├── finance.md
│   │   ├── insurance.md
│   │   ├── mobility.md
│   │   └── ...
│   └── data/
│       ├── blueprints.json         # 130 records (machine-readable mirror)
│       ├── verticals.json          # vertical metadata
│       ├── failures.json           # 20 failures + 8 archetypes
│       ├── indexes/                # derived indexes (by validation_principle, moat_class, archetype)
│       └── research/               # per-blueprint research envelopes (Phase 2.5)
│           ├── <blueprint_id>.json
│           └── _cache/             # content-addressed crawl cache (gitignored)
│
├── schemas/
│   ├── blueprint.schema.json       # JSON Schema for blueprints
│   └── research.schema.json        # JSON Schema for research envelopes
│
├── agents/
│   ├── openclaw/                   # DAG definitions
│   ├── hermes/                     # modular task executors
│   └── research/                   # Corsair Research Engine (orchestrator + tools)
│
└── app/                            # Next.js 14 + TS + Tailwind + shadcn/ui Idea Browser
    ├── app/                        # App Router routes
    ├── components/
    ├── lib/
    └── package.json
```

## Routes (app/)

| Route | Purpose |
| --- | --- |
| `/` | Armada dashboard — 130 blueprints, faceted, sortable |
| `/v/[vertical]` | Vertical deep-dive, aggregated signals across 10 blueprints |
| `/b/[id]` | Single blueprint with 4 tabs: Blueprint, Live Evidence, Signals, Deep Research |
| `/failures` | 20 post-mortems + 8 archetypes explorer |
| `/research` | Free-form deep-research surface with streaming agent trace |
| `/corsair` | Conversational + tool-calling + browser pane chat surface |

## Doctrine (TL;DR)

1. The Corsair does not bluff. Every claim cites.
2. Every blueprint commits to one validation principle: Medici, Rothschild, or Buffett.
3. Every blueprint maps to ≥1 of the 8 failure archetypes from Phase 1.
4. HITL gates: research overwrite, PRD generation, MVP scaffold, deployment.
5. No paywalls bypassed. No robots.txt ignored. No vanity metrics.

## Status

| Phase | Status |
| --- | --- |
| 0 — Letter of Marque + Schemas | ✅ Complete |
| 1 — Post-mortem import + failures.json | ✅ Complete |
| 2a — 130 blueprints, 13 verticals | ✅ Complete |
| 2b — blueprints.json + indexes | ✅ Complete |
| 2.5 — Research engine + envelopes | ✅ Scaffolded; live runs on demand |
| 3 — Idea Browser app | ✅ Scaffolded |
| 4 — Agent layer + Corsair Browser Agent | ✅ Wired |
