import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0c",
        surface: "#111114",
        elev: "#181820",
        border: "#23232a",
        ink: "#e8e8ee",
        mute: "#9b9bab",
        accent: "#f59e0b",
        ok: "#10b981",
        warn: "#f59e0b",
        bad: "#ef4444",
        nuclear: "#a855f7",
        hot: "#ef4444",
        warm: "#f59e0b",
        cold: "#6b7280",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
