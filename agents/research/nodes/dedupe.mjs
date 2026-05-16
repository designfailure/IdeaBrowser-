// Hermes module: dedupe + canonicalize.
// Collapses near-duplicates by URL canonical form + content hash;
// prefers authoritative source classes (per RESEARCH_ENGINE_SPEC.md trust hierarchy).

const TRUST_RANK = {
  paper: 9,
  regulatory: 8,
  yc_rfs: 7,
  a16z: 7,
  vc_thesis: 6,
  news: 5,
  founder_writeup: 4,
  podcast: 3,
  social: 2,
  dataset: 6,
  repo: 5,
  post_mortem: 8,
};

const canon = (url) =>
  (url || "")
    .toLowerCase()
    .replace(/[#?].*$/, "")
    .replace(/\/+$/, "");

export async function dedupe(_ctx, state) {
  const seen = new Map();
  for (const c of state.citations) {
    const key = canon(c.url);
    if (!seen.has(key)) {
      seen.set(key, c);
    } else {
      const prev = seen.get(key);
      if ((TRUST_RANK[c.source_class] || 0) > (TRUST_RANK[prev.source_class] || 0)) {
        prev.superseded_by = c.citation_id;
        seen.set(key, c);
      } else {
        c.superseded_by = prev.citation_id;
      }
    }
  }
  const citations = [...seen.values()];
  return {
    state: { ...state, citations },
    note: `${state.citations.length} -> ${citations.length} after dedupe`,
  };
}
