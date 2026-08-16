/**
 * cPanel / CloudLinux Passenger Startup Entrypoint for Seddypluz
 *
 * This file serves as the main application startup file for cPanel "Setup Node.js App".
 * It bootstraps environment variables and launches the compiled Nitro Node server (.output/server/index.mjs).
 *
 * Requirements:
 * - Node.js: >=22.x
 * - cPanel Passenger / CloudLinux Node Selector
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure process.cwd() is the project root
try {
  process.chdir(__dirname);
} catch (err) {
  console.warn("[cPanel Starter] Could not change directory to root:", err);
}

// 1. Load local .env files if present and Node supports process.loadEnvFile (Node >=20.6.0)
const envFiles = [".env", ".env.local", ".env.production"];
for (const envFile of envFiles) {
  const envPath = path.resolve(__dirname, envFile);
  if (fs.existsSync(envPath)) {
    try {
      if (typeof process.loadEnvFile === "function") {
        process.loadEnvFile(envPath);
      } else {
        // Fallback manual parser for Node environments without process.loadEnvFile
        const content = fs.readFileSync(envPath, "utf8");
        for (const line of content.split(/\r?\n/)) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx <= 0) continue;
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (process.env[key] === undefined) {
            process.env[key] = val;
          }
        }
      }
    } catch (err) {
      console.warn(`[cPanel Starter] Note on reading ${envFile}:`, err.message);
    }
  }
}

// 2. Ensure NODE_ENV is set to production if not already specified
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

// 3. Locate compiled Nitro server entry
const serverEntryPath = path.resolve(__dirname, ".output/server/index.mjs");

if (!fs.existsSync(serverEntryPath)) {
  console.error(
    "\n[cPanel Starter] ❌ Fatal Error: Compiled server entry not found at:\n" +
      serverEntryPath +
      "\n\nPlease build the application first by running:\n" +
      "  npm run build\n" +
      "or check the build logs if deploying via CI/CD.\n"
  );
  process.exit(1);
}

console.log(`[cPanel Starter] 🚀 Starting Seddypluz Node Server (Node ${process.version})...`);
console.log(`[cPanel Starter] Target Port: ${process.env.PORT || 3000}`);

// 4. Launch Nitro server
try {
  await import("./.output/server/index.mjs");
} catch (err) {
  console.error("[cPanel Starter] ❌ Fatal Error during server launch:", err);
  process.exit(1);
}
