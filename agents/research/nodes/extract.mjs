// Hermes module: extract.
// Converts raw search results + browser-fetched pages into structured records:
// citations[], competitors[], papers[], deadSaasMatches[], yc_rfs[], a16z[],
// regulatoryLandscape{}.
//
// The extractors here are intentionally schema-shaped; live LLM-driven
// extraction is wired by overriding ctx.tools.extractCompetitor /
// extractPaper / extractRegulatory, when available.

import crypto from "node:crypto";

const sha256 = (s) =>
  crypto.createHash("sha256").update(s || "").digest("hex");

const cite = (r, i) => ({
  citation_id: `c${i + 1}`,
  url: r.url,
  title: r.title || r.url,
  source_class: r.source_class || "news",
  retrieved_at: new Date().toISOString(),
  snippet: r.snippet || "",
  sha256: sha256(`${r.url}|${r.title}|${r.snippet || ""}`),
  confidence: r.source_class === "paper" ? 0.85 : r.source_class === "regulatory" ? 0.9 : 0.6,
  paywalled: false,
});

export async function extract(ctx, state) {
  const all = [...(state.rawResults || []), ...(state.pages || [])];
  const citations = all.filter((r) => r.url).map(cite);

  const competitors = state.rawResults
    .filter((r) => r.tag === "competitors")
    .slice(0, 8)
    .map((r) => ({
      name: r.title?.split(" ")[0] || "Unknown",
      url: r.url,
      status: "active",
      funding_usd: null,
      founded: null,
      one_liner: r.snippet?.slice(0, 160) || "",
      threat_level: "medium",
      citation_id: citations.find((c) => c.url === r.url)?.citation_id,
    }));

  const papers = state.rawResults
    .filter((r) => r.tag === "paper")
    .slice(0, 5)
    .map((r) => ({
      title: r.title,
      url: r.url,
      abstract: r.snippet || "",
      venue: "arXiv",
      year: 2026,
      relevance: 0.7,
      citation_id: citations.find((c) => c.url === r.url)?.citation_id,
    }));

  const ycRfsMatches = state.rawResults
    .filter((r) => r.tag === "yc_rfs")
    .slice(0, 5)
    .map((r) => ({
      anchor: r.title || "RFS match",
      url: r.url,
      rationale: r.snippet || "",
    }));

  const a16zThesisMatches = state.rawResults
    .filter((r) => r.tag === "a16z")
    .slice(0, 5)
    .map((r) => ({
      title: r.title || "a16z thesis",
      url: r.url,
      rationale: r.snippet || "",
    }));

  const regSources = state.rawResults.filter((r) => r.tag === "regulatory");
  const regulatoryLandscape = {
    jurisdictions: regSources.length ? ["US", "EU"] : [],
    summary: regSources
      .slice(0, 3)
      .map((r) => r.snippet)
      .filter(Boolean)
      .join(" "),
    citation_ids: regSources
      .map((r) => citations.find((c) => c.url === r.url)?.citation_id)
      .filter(Boolean),
  };

  return {
    state: {
      ...state,
      citations,
      competitors,
      papers,
      ycRfsMatches,
      a16zThesisMatches,
      regulatoryLandscape,
    },
    note: `extracted ${citations.length} citations, ${competitors.length} competitors, ${papers.length} papers`,
  };
}
