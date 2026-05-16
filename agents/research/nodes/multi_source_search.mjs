// Multi-source search fan-out. Honors per-blueprint budget caps.
// Tools are pluggable: ctx.tools.{webSearch, apify, arxiv, scholar, ycRfs,
// a16zThesis, secEdgar, githubTrending}.

const TAG_TO_SOURCE_CLASS = {
  tam: "news",
  competitors: "news",
  news_90d: "news",
  paper: "paper",
  regulatory: "regulatory",
  post_mortem: "post_mortem",
  yc_rfs: "yc_rfs",
  a16z: "a16z",
  capital_flow: "news",
};

export async function multiSourceSearch(ctx, state) {
  const out = [];
  for (const q of state.queries) {
    if (ctx.spent.search >= ctx.budgets.search) break;
    ctx.spent.search++;
    try {
      const tool = ctx.tools.webSearch;
      const results = (await tool({ query: q.q, daysBack: q.daysBack })) || [];
      for (const r of results.slice(0, 5)) {
        out.push({
          query: q.q,
          tag: q.tag,
          source_class: TAG_TO_SOURCE_CLASS[q.tag] || "news",
          url: r.url,
          title: r.title,
          snippet: r.snippet,
        });
      }
    } catch (err) {
      ctx.errors.push(`webSearch[${q.q}]: ${err.message}`);
    }
  }
  // Domain-specific harvesters (paper, yc_rfs, a16z) get a single fan-out call each.
  for (const [name, key] of [
    ["arxiv", "paper"],
    ["ycRfs", "yc_rfs"],
    ["a16zThesis", "a16z"],
    ["secEdgar", "regulatory"],
  ]) {
    if (typeof ctx.tools[name] === "function") {
      try {
        const items = (await ctx.tools[name](state.blueprint)) || [];
        for (const r of items.slice(0, 5)) {
          out.push({
            tag: key,
            source_class: key === "yc_rfs" || key === "a16z" ? key : key === "regulatory" ? "regulatory" : "paper",
            url: r.url,
            title: r.title,
            snippet: r.snippet || r.abstract,
          });
        }
      } catch (err) {
        ctx.errors.push(`${name}: ${err.message}`);
      }
    }
  }
  return { state: { ...state, rawResults: out }, note: `${out.length} raw results` };
}
