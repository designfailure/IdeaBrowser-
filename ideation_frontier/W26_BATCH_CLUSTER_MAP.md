# W26 batch cluster map (signal only)

## Official Launch YC pages used (spot sample)

These **first-party** pages were retrieved in this crawl and anchor specific claims:

- Jinba — enterprise workflow automation via chat; MCP deploy; regulated industries.  
- Reframe — BOM-driven hardware procurement agents; Slack-native.  
- Hex Security — continuous AI-driven offensive security / pentest agents.  
- Mantis — clinical/biomedical canonical datasets; trial delay cost narrative.  
- Aurorin CAD — new kernel + agent; speed vs legacy CAD.  
- Weave — home robot Isaac; autonomy + remote op; privacy stow posture.

URLs in `SOURCES_CRAWL_LOG.md`.

## Aggregated directory (high coverage, third-party)

**Source:** https://startground.com/yc-w26-startups/

**Interpretation:** StartGround groups a large W26 set into B2B General, Engineering, Infrastructure, Finance, Marketing, Supply Chain, Security, Sales, Retail, Legal, Productivity, Operations, Healthcare, Defense, Consumer, etc. The page asserts **~200** companies and **high AI density**—useful for **thematic clustering**, not as legal fact until each company is confirmed on YC.

## Cluster summary (operator-facing)

| Cluster ID | Label | Representative names (mixed official + StartGround; verify) | Why it matters |
|------------|-------|------------------------------------------------------------------|----------------|
| C1 | Enterprise agent fabric | Jinba, Carson, RamAIn, Tensol, Terminal Use, IncidentFox, Corelayer | Competing “control planes” for agents and incidents. |
| C2 | Data quality / observability | Velum Labs, Sentrial, Moda, Oximy, Captain | a16z “multimodal data” + agent observability overlap. |
| C3 | Security / trust / offensive | Hex Security, Clam, Salus, Cascade, Crosslayer Labs | Offensive automation + guardrails + AI identity (Didit, Agentic Fabriq). |
| C4 | Voice + monetization | Samora AI, Maven, Caretta, Fern | Voice workflow depth + payments for agents. |
| C5 | Physical AI + hardware velocity | Reframe, REV1, Aurorin CAD, Valgo, Asimov, Librar Labs | RFS: supply chain iteration; a16z: industrial stack. |
| C6 | Regulated data + compliance | Mantis, Rhizome AI, Veriad, Oxus, Fed10, LegalOS | Multiplayer compliance and vertical data moats. |
| C7 | Finance / mortgage / accounting | Copperlane, Balance, FullSeam, End Close, Payna | a16z banking core rebuild thesis. |
| C8 | Legal OS | Stilta, General Legal, Vector Legal, Wayco, Arcline | Vertical legal + policy agents. |
| C9 | Inference / silicon / edge | Piris Labs, Visibl Semiconductors, RunAnywhere, Cumulus Labs, Chamber | RFS “inference chips for agents”; edge + GPU serverless. |
| C10 | Consumer / hardware | Weave (Isaac), Button Computer | Home robotics + wearable AI. |

## Crowding heatmap (qualitative)

- **Very dense:** C1, C2, C3 (agent + security + observability).  
- **Dense but technically hard (moat-friendly):** C5, C9.  
- **Regulatory-heavy, slower sales cycles:** C6, C7, C8 (high reward if data flywheel locks).

## Next crawl step (recommended)

Render `ycombinator.com/companies` with browser automation and export **official** JSON for W26/S26 into `phase2/data/research/` per blueprint—outside scope of this markdown-only synthesis branch.
