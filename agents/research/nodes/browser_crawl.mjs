// Browser-driven deep crawl. Used sparingly because of latency.
// Hands off to ctx.tools.browser (which the caller wires to cursor-ide-browser MCP
// via the browser-use subagent in production).

const NEEDS_BROWSER = (url) =>
  /(linkedin|crunchbase|bloomberg|wsj|ft\.com|app\.dealroom|pitchbook)/i.test(url);

export async function browserCrawl(ctx, state) {
  const candidates = state.rawResults.filter((r) => NEEDS_BROWSER(r.url || ""));
  const slice = candidates.slice(0, ctx.budgets.browser - ctx.spent.browser);
  const pages = [];
  for (const r of slice) {
    if (ctx.spent.browser >= ctx.budgets.browser) break;
    ctx.spent.browser++;
    try {
      const page = await ctx.tools.browser({ url: r.url });
      if (page) {
        pages.push({ ...r, body: page.body, screenshot: page.screenshot });
      }
    } catch (err) {
      ctx.errors.push(`browser[${r.url}]: ${err.message}`);
    }
  }
  return { state: { ...state, pages }, note: `${pages.length} browser-fetched` };
}
