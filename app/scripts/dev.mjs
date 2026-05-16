#!/usr/bin/env node
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const nextBin = path.join(appRoot, "node_modules", "next", "dist", "bin", "next");

const port = process.env.PORT || "3000";

console.error(
  `[corsair-idea-browser] Dev server: http://localhost:${port} (set PORT to override)`,
);

const child = spawn(process.execPath, [nextBin, "dev", "-p", String(port)], {
  cwd: appRoot,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
