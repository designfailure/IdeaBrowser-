import type { Metadata } from "next";
import "@/styles/globals.css";
import { TopNav } from "@/components/top-nav";

export const metadata: Metadata = {
  title: "Corsair Idea Browser",
  description: "AI-native venture cockpit. 130 blueprints. 13 verticals. Live research.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-ink antialiased">
        <TopNav />
        <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
        <footer className="mx-auto max-w-7xl px-6 py-10 text-xs text-mute">
          Corsair Idea Browser · Letter of Marque countersigned 2026-05-16. The
          Corsair does not bluff.
        </footer>
      </body>
    </html>
  );
}
