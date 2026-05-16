"use client";
import { useState } from "react";

export default function ResearchPage() {
  const [q, setQ] = useState("");
  const [running, setRunning] = useState(false);
  const [trace, setTrace] = useState<string[]>([]);
  const [result, setResult] = useState<unknown>(null);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Free-Form Research</h1>
        <p className="text-sm text-mute">
          Issue a free-form research mandate. The Corsair Browser Agent expands
          queries, browses the open web, scrapes structured sources, and returns
          a cited synthesis. Results can be saved to any blueprint envelope with
          HITL approval.
        </p>
      </header>
      <div className="space-y-2">
        <textarea
          rows={3}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='e.g. "competitor landscape for parametric crop-failure insurance in Sub-Saharan Africa, 2024–2026"'
          className="w-full bg-bg border border-border rounded-md px-3 py-2 text-sm text-ink placeholder:text-mute focus:outline-none focus:border-accent"
        />
        <button
          disabled={!q.trim() || running}
          onClick={async () => {
            setRunning(true);
            setTrace((t) => [...t, `[${new Date().toISOString()}] dispatch: ${q}`]);
            try {
              const r = await fetch(`/api/research/freeform`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ query: q }),
              });
              const j = await r.json();
              setResult(j);
              setTrace((t) => [...t, `[${new Date().toISOString()}] complete (${j.trace?.nodes?.length ?? 0} nodes)`]);
            } catch (e) {
              setTrace((t) => [...t, `[${new Date().toISOString()}] error: ${(e as Error).message}`]);
            } finally {
              setRunning(false);
            }
          }}
          className="px-4 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-bg transition-colors disabled:opacity-50"
        >
          {running ? "Sailing..." : "Dispatch the Browser Agent"}
        </button>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-wider text-mute font-mono mb-2">Stream</h3>
        <pre className="text-[11px] bg-bg border border-border rounded-md p-3 min-h-[120px] overflow-x-auto scrollbar-thin">
          {trace.join("\n") || "Awaiting dispatch..."}
        </pre>
      </div>
      {result ? (
        <div>
          <h3 className="text-xs uppercase tracking-wider text-mute font-mono mb-2">Result</h3>
          <pre className="text-[11px] bg-bg border border-border rounded-md p-3 overflow-x-auto scrollbar-thin">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
