"use client";
import * as Tabs from "@radix-ui/react-tabs";
import type { Blueprint, ResearchEnvelope } from "@/lib/corpus";
import { cn } from "@/lib/cn";
import { useState } from "react";

const TABS = [
  { id: "blueprint", label: "Blueprint" },
  { id: "evidence", label: "Live Evidence" },
  { id: "signals", label: "Signals" },
  { id: "deep", label: "Deep Research" },
];

export function BlueprintTabs({ blueprint, envelope }: { blueprint: Blueprint; envelope: ResearchEnvelope | null }) {
  return (
    <Tabs.Root defaultValue="blueprint" className="space-y-5">
      <Tabs.List className="flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <Tabs.Trigger
            key={t.id}
            value={t.id}
            className="px-3 py-2 text-sm text-mute data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent transition-colors"
          >
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="blueprint">
        <BlueprintPane blueprint={blueprint} />
      </Tabs.Content>
      <Tabs.Content value="evidence">
        <EvidencePane envelope={envelope} />
      </Tabs.Content>
      <Tabs.Content value="signals">
        <SignalsPane envelope={envelope} />
      </Tabs.Content>
      <Tabs.Content value="deep">
        <DeepResearchPane blueprint={blueprint} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-wider text-mute font-mono">{label}</div>
      <div className="text-sm text-ink leading-relaxed">{children}</div>
    </div>
  );
}

function BlueprintPane({ blueprint }: { blueprint: Blueprint }) {
  const [copied, setCopied] = useState(false);
  const prdBlock = JSON.stringify(blueprint, null, 2);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="space-y-4">
        <Field label="emotional driver">{blueprint.emotional_driver}</Field>
        <Field label="ai leverage">{blueprint.ai_leverage}</Field>
        <Field label="business model">{blueprint.business_model}</Field>
        <Field label="monetization">{blueprint.monetization_logic}</Field>
        <Field label="distribution">{blueprint.distribution_strategy}</Field>
        <Field label="retention loop">{blueprint.retention_loop}</Field>
        <Field label="moat">
          <span className="text-accent font-mono text-xs uppercase">{blueprint.moat_potential.class}</span>
          <span className="ml-2">{blueprint.moat_potential.rationale}</span>
        </Field>
      </div>
      <div className="space-y-4">
        <Field label="scalability">
          <span className="text-accent font-mono">{blueprint.scalability_score}/10</span> · {blueprint.scalability_rationale}
        </Field>
        <Field label="billion-dollar path">{blueprint.billion_dollar_path}</Field>
        <Field label="failure avoidance">
          <ul className="list-disc list-inside space-y-1">
            {blueprint.failure_avoidance.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </Field>
        <Field label="validation principle">
          <span className="font-mono uppercase text-accent">{blueprint.validation_principle}</span>
          <span className="ml-2">{blueprint.validation_invocation}</span>
        </Field>
        <Field label="ui/ux operating model">
          <span className="font-mono uppercase text-accent">{blueprint.ui_ux_operating_model}</span>
          <span className="ml-2">{blueprint.ui_ux_invocation}</span>
        </Field>
        <Field label="technical mvp sketch">
          <pre className="text-[11px] bg-bg border border-border rounded-md p-3 overflow-x-auto scrollbar-thin">
{JSON.stringify(blueprint.technical_mvp_sketch, null, 2)}
          </pre>
        </Field>
        <button
          className="text-xs px-3 py-1.5 rounded-md border border-accent text-accent hover:bg-accent hover:text-bg transition-colors"
          onClick={() => {
            navigator.clipboard.writeText(prdBlock);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? "Copied PRD JSON" : "Copy as PRD JSON"}
        </button>
      </div>
    </div>
  );
}

function EvidencePane({ envelope }: { envelope: ResearchEnvelope | null }) {
  if (!envelope) return <div className="text-sm text-mute">No envelope yet.</div>;
  const grouped = envelope.citations.reduce<Record<string, typeof envelope.citations>>((acc, c) => {
    (acc[c.source_class] = acc[c.source_class] || []).push(c);
    return acc;
  }, {});
  return (
    <div className="space-y-6">
      <div className="text-sm text-ink">{envelope.summary}</div>
      {envelope.competitors.length > 0 && (
        <section>
          <h3 className="text-xs uppercase tracking-wider text-mute font-mono mb-2">Competitors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {envelope.competitors.map((c, i) => (
              <div key={i} className="border border-border bg-surface rounded-md p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="text-[10px] uppercase font-mono text-mute">
                    {c.status} · {c.threat_level}
                  </span>
                </div>
                {c.one_liner && <div className="text-xs text-mute mt-1">{c.one_liner}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([cls, items]) => (
          <section key={cls}>
            <h3 className="text-xs uppercase tracking-wider text-mute font-mono mb-2">{cls}</h3>
            <div className="space-y-2">
              {items.map((c) => (
                <a
                  key={c.citation_id}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-border bg-surface rounded-md p-3 hover:border-accent/40 transition-colors"
                >
                  <div className="text-sm font-medium text-ink">{c.title}</div>
                  {c.snippet && <div className="text-xs text-mute mt-1">{c.snippet}</div>}
                  <div className="text-[10px] font-mono text-mute mt-1">
                    {new URL(c.url).host} · retrieved {c.retrieved_at.slice(0, 10)}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="text-sm text-mute italic">
          No citations yet. The Corsair does not bluff. Run{" "}
          <code className="text-accent font-mono">npm run research -- --id {envelope.blueprint_id}</code>{" "}
          with live tools wired to populate.
        </div>
      )}
      {envelope.dead_saas_matches.length > 0 && (
        <section>
          <h3 className="text-xs uppercase tracking-wider text-mute font-mono mb-2">Dead SaaS Analogues</h3>
          <ul className="space-y-1 text-sm">
            {envelope.dead_saas_matches.map((m, i) => (
              <li key={i} className="text-mute">
                <span className="text-bad">⚱</span> <span className="text-ink">{m.failure_id}</span> — {m.rationale}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function SignalsPane({ envelope }: { envelope: ResearchEnvelope | null }) {
  if (!envelope) return <div className="text-sm text-mute">No envelope.</div>;
  return (
    <div className="space-y-5">
      <div className={cn("p-5 rounded-xl border")}
        style={{
          background: `linear-gradient(135deg, transparent, ${envelope.signal_band === "nuclear" ? "#a855f7" : envelope.signal_band === "hot" ? "#ef4444" : envelope.signal_band === "warm" ? "#f59e0b" : "#374151"}11 100%)`,
          borderColor: "var(--tw-border-opacity, #23232a)",
        }}
      >
        <div className="text-[10px] uppercase tracking-wider text-mute font-mono">Signal score</div>
        <div className="flex items-baseline gap-3">
          <div className="text-5xl font-semibold">{envelope.signal_score}</div>
          <div className="text-sm uppercase tracking-wider text-mute font-mono">{envelope.signal_band}</div>
        </div>
        <div className="text-xs text-mute mt-2">Confidence {Math.round(envelope.confidence * 100)}% · last crawled {envelope.last_crawled_at.slice(0, 10)}</div>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-wider text-mute font-mono mb-2">History</h3>
        <ul className="space-y-1 text-sm font-mono">
          {envelope.history.map((h, i) => (
            <li key={i} className="text-mute">
              <span className="text-ink">{h.crawled_at.slice(0, 10)}</span> · score {h.signal_score} {h.delta && `(${h.delta})`}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xs uppercase tracking-wider text-mute font-mono mb-2">Agent trace</h3>
        <pre className="text-[11px] bg-bg border border-border rounded-md p-3 overflow-x-auto scrollbar-thin">
{JSON.stringify(envelope.agent_trace, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function DeepResearchPane({ blueprint }: { blueprint: Blueprint }) {
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      <div className="text-sm text-mute">
        Run the Corsair Browser Agent against this blueprint. The DAG will
        expand queries, search across native + MCP tools, browser-crawl
        gated sources where required, dedupe, score, and persist a fresh
        envelope. HITL gates fire on overwrite if signal delta {">"} 25.
      </div>
      <button
        disabled={running}
        onClick={async () => {
          setRunning(true);
          setLog((l) => [...l, `[${new Date().toISOString()}] start`]);
          try {
            const res = await fetch(`/api/research/${blueprint.id}`, { method: "POST" });
            const j = await res.json();
            setLog((l) => [...l, `[${new Date().toISOString()}] done — signal=${j.signal_score} (${j.signal_band})`]);
          } catch (e) {
            setLog((l) => [...l, `[${new Date().toISOString()}] error: ${(e as Error).message}`]);
          } finally {
            setRunning(false);
          }
        }}
        className="px-4 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-bg transition-colors disabled:opacity-50"
      >
        {running ? "Running..." : "Hoist the Flag — run Corsair Research"}
      </button>
      <pre className="text-[11px] bg-bg border border-border rounded-md p-3 min-h-[200px] overflow-x-auto scrollbar-thin">
        {log.join("\n") || "Agent trace will stream here..."}
      </pre>
    </div>
  );
}
