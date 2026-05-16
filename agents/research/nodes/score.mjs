// Hermes module: score.
// Computes signal_score (0-100) per RESEARCH_ENGINE_SPEC.md §5.

const HALF_LIFE_DAYS = 30;

const recencyWeight = (iso) => {
  const t = new Date(iso).getTime();
  const days = (Date.now() - t) / 86400000;
  return Math.pow(0.5, Math.max(0, days) / HALF_LIFE_DAYS);
};

export async function score(_ctx, state) {
  const cites = state.citations || [];
  const classes = new Set(cites.map((c) => c.source_class));
  const sourceDiversity = Math.min(1, classes.size / 8);

  const recencyAvg =
    cites.length === 0
      ? 0
      : cites.reduce((s, c) => s + recencyWeight(c.retrieved_at), 0) / cites.length;

  const competitorDensity = Math.min(1, (state.competitors?.length || 0) / 10);
  const regulatoryActivity = Math.min(
    1,
    (state.regulatoryLandscape?.citation_ids?.length || 0) / 5
  );
  const capitalFlow = Math.min(1, (state.rawResults?.filter((r) => r.tag === "capital_flow").length || 0) / 5);
  const paperVelocity = Math.min(1, (state.papers?.length || 0) / 5);

  const raw =
    25 * sourceDiversity +
    20 * recencyAvg +
    20 * competitorDensity +
    15 * regulatoryActivity +
    10 * capitalFlow +
    10 * paperVelocity;

  const score = Math.round(raw);
  const band = score >= 90 ? "nuclear" : score >= 70 ? "hot" : score >= 40 ? "warm" : "cold";

  const summary =
    cites.length > 0
      ? `Live envelope: ${cites.length} citations across ${classes.size} source class(es); ${state.competitors?.length || 0} competitors mapped.`
      : `No live citations yet — invoke 'npm run research -- --id ${state.blueprint.id}' with tools wired to populate.`;

  return {
    state: { ...state, signal: { score, band }, confidence: cites.length > 0 ? 0.7 : 0.2, summary },
    note: `signal=${score} (${band})`,
  };
}
