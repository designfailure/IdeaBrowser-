// Hermes module: query expansion (gbarin-style).
// For each blueprint, generates 6-10 targeted queries spanning market size,
// competitors, recent news, papers, regulatory motion, dead-SaaS analogues,
// YC RFS overlap, a16z thesis overlap, and capital flow.

const dimensions = (b) => {
  const wedge = b.hook?.split(" ").slice(0, 8).join(" ") || b.id;
  const vertical = b.vertical.replace(/_/g, " ");
  const ai = b.ai_leverage?.split(";")[0] || "";
  return [
    { tag: "tam", q: `"${vertical}" "${wedge}" market size 2026` },
    { tag: "competitors", q: `"${vertical}" startups ${wedge} competitors 2026` },
    { tag: "news_90d", q: `"${wedge}" funding 2026`, daysBack: 90 },
    { tag: "paper", q: `${ai} ${vertical} arXiv survey` },
    { tag: "regulatory", q: `${vertical} regulation 2026 ${wedge}` },
    { tag: "post_mortem", q: `${wedge} startup shutdown postmortem` },
    { tag: "yc_rfs", q: `Y Combinator request for startups ${vertical}` },
    { tag: "a16z", q: `a16z big ideas ${vertical} thesis` },
    { tag: "capital_flow", q: `venture funding ${vertical} Q1 2026` },
  ];
};

export async function queryExpansion(_ctx, state) {
  const queries = dimensions(state.blueprint);
  return {
    state: { ...state, queries },
    note: `${queries.length} queries generated`,
  };
}
