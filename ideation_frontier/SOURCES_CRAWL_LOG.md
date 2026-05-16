# Sources crawl log (YC + a16z)

**Crawl date:** 2026-05-16  
**Method:** HTTP fetch to public HTML (via environment fetch tool). No browser login. `robots.txt` not violated for paths used (standard GET).

## Official Y Combinator

| URL | Result | Notes |
|-----|--------|-------|
| https://www.ycombinator.com/rfs | **Full text retrieved** | Summer 2026 RFS section used for synthesis. |
| https://www.ycombinator.com/launches/PVK-jinba-w26-workflow-builder-for-enterprise-ai-automation | **Retrieved** | W26 company: Jinba. |
| https://www.ycombinator.com/launches/PU7-reframe-w26-automate-end-to-end-hardware-procurement | **Retrieved** | W26: Reframe. |
| https://www.ycombinator.com/launches/POq-hex-security-ai-that-hacks-before-attackers-do | **Retrieved** | W26: Hex Security. |
| https://www.ycombinator.com/launches/PPX-mantis-w26-databricks-for-biomedical-and-clinical-data | **Retrieved** | W26: Mantis. |
| https://www.ycombinator.com/launches/PWy-aurorin-cad-w26-the-next-generation-mechanical-cad-software | **Retrieved** | W26: Aurorin CAD. |
| https://www.ycombinator.com/launches/Lnj-weave-making-the-first-personal-robot-built-for-the-home | **Retrieved** | Weave / Isaac (home robot). |
| https://www.ycombinator.com/companies?batch=Winter+2026 | **Minimal HTML** | Directory likely client-rendered; **do not rely** for exhaustive roster via fetch-only. |
| https://www.ycombinator.com/companies?batch=Spring+2026 | **Minimal HTML** | Same limitation. |
| https://www.ycombinator.com/launches | **Minimal HTML** | Listing likely JS-driven. |

## Third-party batch mirror (use with verification)

| URL | Role | Risk |
|-----|------|------|
| https://startground.com/yc-w26-startups/ | Category-organized **W26 name list** and one-line blurbs | Independent editorial; names must be **spot-checked** against YC. |

## Andreessen Horowitz (official)

| URL | Result |
|-----|--------|
| https://a16z.com/newsletter/big-ideas-2026-part-1/ | **Retrieved** (Infrastructure, Growth, Bio+Health, Speedrun sections). |
| https://a16z.com/newsletter/big-ideas-2026-part-2/ | **Retrieved** (American Dynamism, Apps sections; remainder truncated in tool output). |

## Not crawled (policy / scope)

- Crunchbase, LinkedIn, gated PDFs, Bookface (auth).  
- Part 3+ of Big Ideas 2026 (crypto and other installments): add in a follow-up pass if needed.

## Ethics

- Rate-limited sequential fetches; no credential reuse; no HTML cache stored in-repo beyond these markdown digests.
