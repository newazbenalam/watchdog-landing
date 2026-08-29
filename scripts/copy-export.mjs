import { cpSync, rmSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const outDir = resolve(root, "out");
const distDir = resolve(root, "dist");

if (existsSync(outDir)) {
  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });
  cpSync(outDir, distDir, { recursive: true });
  console.log("Copied static export from ./out to ./dist");
} else {
  console.log("Built in full-stack server mode. Dynamic API routes and SSR pages are active in .next");
}