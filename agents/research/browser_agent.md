# Corsair Browser Agent

The Corsair Browser Agent is the long-running, browser-equipped subagent that
the Idea Browser app dispatches for: (a) live competitor walkthroughs,
(b) regulatory portal navigation, (c) gated-content fetch the operator is
entitled to read, and (d) screenshot evidence capture for the Live Evidence
pane.

## Runtime composition

```
Idea Browser App  ─[server action]─▶  agents/research/orchestrator.mjs
                                          │
                                          ├─ ctx.tools.webSearch    ◀─ native WebSearch
                                          ├─ ctx.tools.webFetch     ◀─ native WebFetch
                                          ├─ ctx.tools.browser      ◀─ cursor-ide-browser MCP
                                          │                              (driven by browser-use subagent)
                                          ├─ ctx.tools.apify        ◀─ user-apify MCP
                                          ├─ ctx.tools.arxiv        ◀─ Hermes arxiv harvester
                                          ├─ ctx.tools.ycRfs        ◀─ Hermes YC RFS scraper
                                          ├─ ctx.tools.a16zThesis   ◀─ Hermes a16z scraper
                                          └─ ctx.tools.secEdgar     ◀─ Hermes EDGAR harvester
```

## Wiring at call site (Next.js server action)

```ts
import { enrichBlueprint } from "@/../../agents/research/orchestrator.mjs";

const tools = {
  webSearch: async ({ query, daysBack }) => {
    // call native WebSearch tool here
  },
  browser: async ({ url }) => {
    // dispatch the browser-use subagent against cursor-ide-browser MCP:
    //   1. browser_lock { action: "lock" }
    //   2. browser_navigate { url }
    //   3. browser_snapshot
    //   4. extract refs / body
    //   5. browser_lock { action: "unlock" }
    return { body, screenshot };
  },
  // ...
};

const envelope = await enrichBlueprint(blueprint, { tools });
```

## HITL gates

The Browser Agent halts and routes to the operator at:

- Overwriting an existing envelope when |Δsignal_score| > 25
- Citing a paywalled source (heuristic detection)
- Citing any source flagged `low_trust`
- Crawl budget exceeded (`truncated: true`)
- More than 20% of citations fail validation (envelope held in `needs_review`)

## Observability

Every node emits a trace entry into `envelope.agent_trace.nodes[]`. The Idea
Browser app streams these entries into the chat for human-readable audit.
