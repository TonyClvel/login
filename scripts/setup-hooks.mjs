import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
execFileSync("git", ["config", "core.hooksPath", ".githooks"], {
  cwd: projectRoot,
  stdio: "inherit",
});

console.log("Hooks de Git activados desde .githooks");
