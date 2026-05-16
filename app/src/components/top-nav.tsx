import Link from "next/link";
import { Anchor, Skull, Search, MessageSquare } from "lucide-react";

const items = [
  { href: "/", label: "Armada", icon: Anchor },
  { href: "/failures", label: "Graveyard", icon: Skull },
  { href: "/research", label: "Research", icon: Search },
  { href: "/corsair", label: "Corsair", icon: MessageSquare },
];

export function TopNav() {
  return (
    <nav className="border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-sm tracking-tight text-accent">CORSAIR</span>
          <span className="text-sm text-mute">Idea Browser</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="flex items-center gap-1.5 text-ink hover:text-accent transition-colors">
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
