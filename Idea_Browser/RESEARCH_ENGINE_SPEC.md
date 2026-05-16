# Corsair Research Engine — Specification (Phase 2.5 Contract)

**Status:** Phase 0 freeze — countersign with `PRD.md` before implementation.  
**Companion:** `BLUEPRINT_SCHEMA.md`, future `schemas/research.schema.json`.

---

## 1. Purpose

Define how the Idea Browser **harvests, scores, deduplicates, validates, and versions** external evidence for each blueprint, with **auditability**, **budget caps**, and **human-in-the-loop** publication.

---

## 2. Tool inventory (locked)

### 2.1 Native / platform tools

| Tool | Role |
|------|------|
| Web search | Real-time discovery; date-biased queries for “last 90d” news. |
| Web fetch | URL → sanitized markdown/text for extraction. |
| Browser automation MCP | Headed/JS sites, multi-step flows, PDFs in entitled sessions. |
| Apify MCP (when configured) | Targeted scrapers: Crunchbase, LinkedIn, Product Hunt, Reddit, HN, X, YouTube. |

### 2.2 Domain harvesters (Hermes modules)

| Module | Output |
|--------|--------|
| `arxiv_ssrn` | Papers + abstracts + relevance score + PDF link metadata. |
| `scholar_proxy` | Scholar results via allowed API or search-proxy; abstracts only if ToS permits. |
| `yc_rfs` | Anchor-level text + match rationale strings. |
| `a16z_thesis` | Big Ideas + Speedrun snapshots (quarterly version tag). |
| `sec_edgar` / `eu_reg_feed` | Filings snippets with accession metadata. |
| `github_signal` | Stars velocity, contributor count, last commit, license. |
| `dead_saas_index` | Local vector index over dead-SaaS corpus; overlap snippets + IDs. |

### 2.3 Orchestration

| System | Role |
|--------|------|
| OpenClaw | DAG runner: `research-enrich`, `deep-research`, batch replays with seed for determinism. |
| gbarin | Query expansion: 6–10 sub-queries per blueprint across market, competitors, news, papers, regulation, dead-SaaS, YC, a16z. |
| Hermes | Atomic tasks: `search`, `fetch`, `extract`, `dedupe`, `score`, `cite`, `summarize`, `compare`. |

---

## 3. Query expansion strategy (gbarin)

For each `blueprint_id`, generate **6–10** targeted queries covering:

1. **TAM / demand** — named category + year.  
2. **Named competitors** — from hook + `core_problem` entities.  
3. **News (≤90d)** — funding, launches, shutdowns.  
4. **Academic** — arXiv/SSRN keywords from `ai_leverage` + vertical.  
5. **Regulatory** — jurisdiction-agnostic first pass, then vertical tags (finance, insurance, mobility, robotics safety).  
6. **Dead-SaaS analogues** — semantic retrieval against local corpus.  
7. **YC RFS** — phrase overlap + embedding match (if infra available; else keyword).  
8. **a16z thesis** — keyword + section anchor.  
9. **GitHub / OSS** — implementation substitutes.  
10. **Post-mortems** — founder writeups matching `failure_avoidance` archetypes.

**Dedup:** Canonicalize URL (strip tracking params); collapse near-duplicates by **content hash** (sha256 of normalized body).

---

## 4. Source class taxonomy

**Enum `source_class`:**  
`paper` | `post_mortem` | `news` | `regulatory` | `vc_thesis` | `yc_rfs` | `a16z` | `founder_writeup` | `dataset` | `repo` | `podcast` | `social`

### 4.1 Trust hierarchy (conflict resolution)

When claims conflict, prefer evidence in this order (highest first):

1. **Peer-reviewed paper** (`paper`) — empirical or formal results.  
2. **Regulatory filing / official register** (`regulatory`).  
3. **YC RFS** (`yc_rfs`) and **a16z thesis** (`vc_thesis`, `a16z`) — strategic framing, not ground truth for facts.  
4. **Major news** (`news`) — corroboration for events.  
5. **Founder writeup** (`founder_writeup`) and **post-mortem** (`post_mortem`) — causal narrative, bias-aware.  
6. **Dataset / repo** (`dataset`, `repo`) — reproducibility signals.  
7. **Podcast / social** (`podcast`, `social`) — hypothesis only; never sole source for numeric “facts.”

**Rule:** Numeric market claims require **≥1** source from tiers 1–4 or **two independent** tier-5+ sources with distinct domains.

---

## 5. Citation object (minimum)

Each citation:

- `citation_id` (stable within envelope)  
- `url`, `title`, `source_class`, `retrieved_at` (ISO-8601)  
- `snippet` (bounded length, e.g., ≤500 chars)  
- `sha256` (content hash)  
- `confidence` (0–1; scoring pipeline output)

**Validation:** Any envelope field that states a **factual claim** must include `citation_id` array; schema rejects uncited factual blocks (implementation detail: separate `claims[]` with pointers, or embed ids in prose JSON—final JSON Schema defines exact shape).

---

## 6. Scoring: `signal_score` (0–100)

**Composite (weighted):**

| Factor | Weight (default) | Notes |
|--------|------------------|-------|
| Source diversity | 25 | Distinct `source_class` + distinct registrable domains. |
| Recency | 20 | Half-life decay; news 7d peak; papers 365d floor non-zero. |
| Competitor density signal | 15 | Count of active competitors + funding freshness. |
| Regulatory motion | 15 | Count of material filings/changes in window. |
| Capital flow (adjacent) | 15 | Funding news keywords + investor quality heuristic (optional). |
| Contradiction penalty | −10 max | Conflicts unresolved after trust merge. |

**Outputs:** `signal_score` integer; optional subscores for debugging.

---

## 7. Freshness and TTL

| source_class | TTL (default) |
|--------------|----------------|
| news | 24h |
| regulatory | 7d |
| vc_thesis, yc_rfs, a16z | 7d |
| paper | 30d |
| post_mortem | 365d |
| founder_writeup | 180d |
| dataset, repo | 14d |
| podcast, social | 3d |

**UI:** Badge `fresh` | `aging` | `stale` based on `last_crawled_at` + worst offending citation class.

---

## 8. Cache and addressing

- **Path:** `phase2/data/research/_cache/` (gitignored).  
- **Key:** `sha256(canonical_url + "\n" + canonicalized_body)`  
- **TTL:** Enforced per source_class; re-fetch if expired on next enrich.

---

## 9. Politeness and compliance

- Honor **robots.txt**; if disallowed, mark source `blocked_robots` and skip.  
- **Rate limit:** default **1 req/s per host** (configurable).  
- **User-Agent:** identifies as Corsair Idea Browser research bot + contact URL from `README.md`.  
- **Paywall policy:** **skip-by-default**; never bypass technical controls. **User-supplied credentials** (cookies/tokens) permitted only in private operator sessions for sources they are entitled to; never store secrets in git.

---

## 10. Budget caps (per blueprint per DAG run)

| Action | Default cap |
|--------|-------------|
| Search calls | 20 |
| HTTP fetches | 30 |
| Browser navigations | 5 |
| Apify actor invocations | 10 (if MCP enabled) |

**Exceeding cap:** Graceful stop; partial envelope with `status: partial` and explicit missing sections.

---

## 11. Determinism and replay

- OpenClaw runs carry `run_id` + **integer seed** logged in `agent_trace`.  
- Same seed + frozen harvester versions → **bitwise-stable ordering** of operations (non-guaranteed across remote HTML changes).  
- **Non-determinism sources:** remote content drift, A/B site variants—accepted; `sha256` captures observed state.

---

## 12. HITL gates

| Gate | Condition |
|------|-----------|
| Publish | Auto-publish only if ≤20% citation validation failures AND no unresolved trust-tier conflicts on hard claims. |
| Review queue | >20% invalid citations OR missing required sections OR paywall-blocked critical sources. |
| Overwrite | Any append to envelope `history[]` that replaces `published` snapshot requires approver id. |

---

## 13. Research envelope sections (logical)

- `last_crawled_at`, `signal_score`, `confidence`  
- `competitors[]`  
- `citations[]`  
- `papers[]`  
- `dead_saas_matches[]`  
- `yc_rfs_matches[]`, `a16z_thesis_matches[]`  
- `regulatory_landscape` (jurisdiction-tagged text + citation_ids)  
- `agent_trace` (OpenClaw run id, node logs)  
- `history[]` (prior versions summary)

Full JSON shape: `schemas/research.schema.json` (post-approval).

---

## 14. Failure budgets

- If **>20%** citations fail validation → `needs_review`, no auto-publish.  
- If **robots.txt** blocks >50% of planned hosts → abort run with actionable report.

---

## 15. Security

- No secret keys in DAG YAML; use environment injection at runtime.  
- Log redaction for cookies/auth headers.  
- Operator session isolation for entitled fetches.

---

## 16. Countersignature checklist

Issuer confirms:

- [ ] Trust hierarchy  
- [ ] Default budget caps  
- [ ] Paywall / entitlement policy  
- [ ] Rate limits and UA string  
- [ ] TTL table  
- [ ] Auto-publish vs review thresholds

**End of specification.**
