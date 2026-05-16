import Link from "next/link";
import { getBlueprints, getFailures } from "@/lib/corpus";

export default function FailuresPage() {
  const { failures, archetypes } = getFailures();
  const blueprints = getBlueprints();
  const byArchetype: Record<string, string[]> = {};
  for (const b of blueprints) {
    for (const fa of b.failure_avoidance) {
      const arch = fa.split(":")[0];
      (byArchetype[arch] = byArchetype[arch] || []).push(b.id);
    }
  }
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">The Graveyard</h1>
        <p className="text-sm text-mute">
          20 startup failures + 8 universal archetypes from Phase 1 post-mortem.
          Every blueprint in the corpus maps to ≥1 archetype + names its inversion.
        </p>
      </header>
      <section>
        <h2 className="text-sm uppercase tracking-wider text-mute font-mono mb-3">8 Failure Archetypes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {archetypes.map((a) => (
            <div key={a.id} className="border border-border bg-surface rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-ink">{a.name}</h3>
                <span className="text-[10px] font-mono text-mute">{(byArchetype[a.id] || []).length} blueprints</span>
              </div>
              <p className="text-xs text-mute">{a.pattern}</p>
              <p className="text-xs text-emerald-300">↳ {a.inversion}</p>
              {(byArchetype[a.id] || []).length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {(byArchetype[a.id] || []).slice(0, 6).map((id) => (
                    <Link
                      key={id}
                      href={`/b/${id}`}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border text-mute hover:text-accent hover:border-accent/50"
                    >
                      {id}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm uppercase tracking-wider text-mute font-mono mb-3">20 Post-Mortems</h2>
        <div className="border border-border rounded-md overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-elev text-mute uppercase">
              <tr>
                <th className="text-left px-3 py-2">#</th>
                <th className="text-left px-3 py-2">Startup</th>
                <th className="text-left px-3 py-2">Vertical</th>
                <th className="text-right px-3 py-2">Funding lost</th>
                <th className="text-left px-3 py-2">Cause</th>
                <th className="text-left px-3 py-2">Archetypes</th>
              </tr>
            </thead>
            <tbody>
              {failures.map((f) => (
                <tr key={f.rank} className="border-t border-border align-top">
                  <td className="px-3 py-2 text-mute font-mono">{f.rank}</td>
                  <td className="px-3 py-2 text-ink font-medium">{f.name}</td>
                  <td className="px-3 py-2 text-mute">{f.vertical}</td>
                  <td className="px-3 py-2 text-right text-bad font-mono">
                    {f.funding_lost_usd ? `$${(f.funding_lost_usd / 1e6).toFixed(0)}M` : "—"}
                  </td>
                  <td className="px-3 py-2 text-mute">{f.cause}</td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-1">
                      {f.archetypes.map((a) => (
                        <span key={a} className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border text-mute">
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
