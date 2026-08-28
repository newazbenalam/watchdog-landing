import { cpSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "out");
const distDir = resolve(root, "dist");

if (!existsSync(outDir)) {
  throw new Error("Expected Next static export output in ./out, but it was not found.");
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(outDir, distDir, { recursive: true });