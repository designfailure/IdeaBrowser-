"use client";
import { useState } from "react";

type Msg = { role: "user" | "agent" | "tool"; content: string };

export default function CorsairChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "agent",
      content:
        "Corsair online. I can rank blueprints by moat, synthesize a PRD from any blueprint, run live research, drive a browser session for verification, and stress-test failure avoidance. HITL gates fire on irreversible actions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const send = async () => {
    if (!input.trim() || busy) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch(`/api/corsair`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const j = await r.json();
      setMessages((m) => [...m, { role: "agent", content: j.reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "agent", content: `error: ${(e as Error).message}` }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
      <div className="space-y-4">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Corsair</h1>
          <p className="text-sm text-mute">Conversational + tool-calling + browser pane.</p>
        </header>
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-md p-3 text-sm border ${
                m.role === "user"
                  ? "bg-elev border-border ml-12"
                  : m.role === "tool"
                    ? "bg-bg border-mute/30 text-mute font-mono text-xs"
                    : "bg-surface border-accent/20"
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider text-mute font-mono mb-1">{m.role}</div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 sticky bottom-4 bg-bg/80 backdrop-blur p-2 rounded-md border border-border">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="rank robotics blueprints by moat, then run research on the top one..."
            className="flex-1 bg-bg border border-border rounded-md px-3 py-2 text-sm text-ink placeholder:text-mute focus:outline-none focus:border-accent"
          />
          <button
            disabled={busy}
            onClick={send}
            className="px-4 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-bg transition-colors disabled:opacity-50"
          >
            {busy ? "..." : "Send"}
          </button>
        </div>
      </div>
      <aside className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-mute font-mono">Browser pane</h3>
        <div className="border border-border rounded-md bg-surface p-4 text-xs text-mute min-h-[420px]">
          When the Corsair Browser Agent navigates, the live session streams here.
          Snapshots, clicks, and extracted refs render with a per-step trace.
          Wired to the <code className="text-accent">cursor-ide-browser</code> MCP via the
          <code className="text-accent"> browser-use</code> subagent.
        </div>
        <h3 className="text-xs uppercase tracking-wider text-mute font-mono">HITL gates</h3>
        <ul className="text-xs text-mute space-y-1">
          <li>· research envelope overwrite (if Δsignal {">"} 25)</li>
          <li>· PRD generation</li>
          <li>· MVP scaffold</li>
          <li>· deployment / external POST</li>
        </ul>
      </aside>
    </div>
  );
}
