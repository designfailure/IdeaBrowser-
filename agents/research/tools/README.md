# Research Engine Tools

This folder is the **wiring point** between the runtime-agnostic orchestrator
(`agents/research/orchestrator.mjs`) and live web/MCP tools.

The orchestrator accepts a `tools` object on `ctx`:

```js
import { enrichBlueprint } from "../orchestrator.mjs";

const tools = {
  webSearch: async ({ query, daysBack }) => [...],     // wire to native WebSearch
  webFetch: async ({ url }) => ({ body, sha256 }),     // wire to native WebFetch
  browser: async ({ url }) => ({ body, screenshot }),  // wire to cursor-ide-browser MCP
  apify:    async (actor, input) => [...],             // wire to user-apify MCP
  arxiv:    async (blueprint) => [...],                // wire to arXiv API
  scholar:  async (blueprint) => [...],                // wire to SerpAPI
  ycRfs:    async (blueprint) => [...],                // wire to YC RFS scraper
  a16zThesis: async (blueprint) => [...],              // wire to a16z scraper
  secEdgar: async (blueprint) => [...],                // wire to EDGAR
  githubTrending: async (blueprint) => [...],          // wire to GitHub
  deadSaasIndex:  async (blueprint) => [...],          // wire to local vector index
};

const envelope = await enrichBlueprint(blueprint, { tools });
```

## Cache & politeness

- Content-addressed cache key: `sha256(url + canonical_body)`.
- Cache root: `phase2/data/research/_cache/<sha256>.{md,html,pdf}`.
- Honors `robots.txt`; refuses to fetch `Disallow`'d paths.
- 1 req/sec per host; identifying `User-Agent: CorsairResearchBot/1.0`.
- Paywalled sources: skip by default; operator-supplied cookies allowed via
  `agents/research/cookies/<host>.json`.

## Determinism

- Each enrichment is seeded by `(blueprint_id, crawl_date_utc)`.
- Re-runs produce identical envelopes given identical source state.
- History array tracks signal drift across runs.

See `RESEARCH_ENGINE_SPEC.md` at the repo root for the full contract.
