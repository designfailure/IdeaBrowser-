// Content-addressed crawl cache + per-source-class TTL + robots.txt + rate limit.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");
const CACHE_DIR = path.join(ROOT, "phase2/data/research/_cache");
fs.mkdirSync(CACHE_DIR, { recursive: true });

export const TTL_BY_SOURCE_CLASS = {
  news: 24 * 3600,
  social: 24 * 3600,
  regulatory: 7 * 24 * 3600,
  vc_thesis: 7 * 24 * 3600,
  yc_rfs: 14 * 24 * 3600,
  a16z: 14 * 24 * 3600,
  founder_writeup: 30 * 24 * 3600,
  paper: 30 * 24 * 3600,
  repo: 7 * 24 * 3600,
  dataset: 30 * 24 * 3600,
  podcast: 30 * 24 * 3600,
  post_mortem: 365 * 24 * 3600,
};

const canonical = (s) => (s || "").trim().toLowerCase().replace(/\s+/g, " ");
const key = (url, body) =>
  crypto.createHash("sha256").update(canonical(url) + "\n" + canonical(body || "")).digest("hex");

export function read(url, body) {
  const k = key(url, body);
  const p = path.join(CACHE_DIR, `${k}.json`);
  if (!fs.existsSync(p)) return null;
  const stat = fs.statSync(p);
  const entry = JSON.parse(fs.readFileSync(p, "utf8"));
  const ttl = TTL_BY_SOURCE_CLASS[entry.source_class] || 24 * 3600;
  if (Date.now() - stat.mtimeMs > ttl * 1000) return null;
  return entry;
}

export function write(url, body, source_class, extra = {}) {
  const k = key(url, body);
  const p = path.join(CACHE_DIR, `${k}.json`);
  const entry = { url, body, source_class, sha256: k, written_at: new Date().toISOString(), ...extra };
  fs.writeFileSync(p, JSON.stringify(entry, null, 2));
  return entry;
}

const lastFetchByHost = new Map();
const RATE_LIMIT_MS = 1000;

export async function rateLimit(url) {
  const host = new URL(url).host;
  const now = Date.now();
  const last = lastFetchByHost.get(host) || 0;
  const wait = Math.max(0, last + RATE_LIMIT_MS - now);
  if (wait) await new Promise((r) => setTimeout(r, wait));
  lastFetchByHost.set(host, Date.now());
}

const robotsCache = new Map();
export async function isAllowedByRobots(url, fetchImpl) {
  const u = new URL(url);
  const host = u.host;
  if (!robotsCache.has(host)) {
    try {
      const txt = await fetchImpl(`${u.protocol}//${host}/robots.txt`);
      robotsCache.set(host, txt || "");
    } catch {
      robotsCache.set(host, "");
    }
  }
  const robots = robotsCache.get(host);
  // Naive Disallow check for User-agent: *
  const lines = robots.split("\n").map((l) => l.trim());
  let inStar = false;
  for (const line of lines) {
    if (/^user-agent:\s*\*/i.test(line)) inStar = true;
    else if (/^user-agent:/i.test(line)) inStar = false;
    if (inStar && /^disallow:\s*(.+)$/i.test(line)) {
      const dis = line.replace(/^disallow:\s*/i, "").trim();
      if (dis && u.pathname.startsWith(dis)) return false;
    }
  }
  return true;
}
