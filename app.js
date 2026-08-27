/**
 * cPanel / CloudLinux Passenger Entrypoint (app.js)
 *
 * This file serves as the default startup file for cPanel "Setup Node.js App".
 * It bootstraps environment variables, handles diagnostics, and launches the Nitro Node server.
 */

import fs from "node:fs";
import http from "node:http";
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

// 1. Load local .env files if present
const envFiles = [".env", ".env.local", ".env.production"];
for (const envFile of envFiles) {
  const envPath = path.resolve(__dirname, envFile);
  if (fs.existsSync(envPath)) {
    try {
      if (typeof process.loadEnvFile === "function") {
        process.loadEnvFile(envPath);
      } else {
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

// 2. Ensure NODE_ENV is production
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const serverEntryPath = path.resolve(__dirname, ".output/server/index.mjs");

function serveDiagnosticError(title, message, helpTips) {
  const server = http.createServer((_req, res) => {
    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>cPanel Startup Diagnostic - Seddypluz</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; max-width: 640px; width: 100%; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
    h1 { color: #f43f5e; font-size: 1.5rem; margin-top: 0; display: flex; align-items: center; gap: 0.5rem; }
    pre { background: #090d16; border: 1px solid #334155; border-radius: 8px; padding: 1rem; color: #fca5a5; overflow-x: auto; font-size: 0.875rem; white-space: pre-wrap; word-break: break-word; }
    .tips { background: #1e3a5f; border-left: 4px solid #38bdf8; padding: 1rem; border-radius: 4px; margin-top: 1.5rem; font-size: 0.9rem; }
    .tips ul { margin: 0.5rem 0 0 1.2rem; padding: 0; }
    .tips li { margin-bottom: 0.4rem; color: #e0f2fe; }
    .badge { display: inline-block; background: #334155; color: #94a3b8; font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚠️ ${title}</h1>
    <p>The Node.js server started, but encountered a configuration or build issue before serving the application.</p>
    <pre>${message}</pre>
    <div class="tips">
      <strong>Suggested Resolutions:</strong>
      <ul>
        ${helpTips.map((tip) => `<li>${tip}</li>`).join("")}
      </ul>
    </div>
    <div class="badge">Node.js ${process.version} • Mode: ${process.env.NODE_ENV || "production"}</div>
  </div>
</body>
</html>`);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.warn(
      `[cPanel Diagnostic Server] Listening on ${port} to serve startup diagnostic page.`,
    );
  });
}

// 3. Launch Nitro server or fallback to diagnostic page
if (!fs.existsSync(serverEntryPath)) {
  const errMsg = `Missing compiled server entry at:\n${serverEntryPath}\n\nThe '.output' directory is either missing or was not uploaded to cPanel.`;
  console.error(`\n[cPanel Starter] ❌ ${errMsg}\n`);
  serveDiagnosticError("Application Build Not Found (.output missing)", errMsg, [
    "In cPanel File Manager, click <strong>Settings</strong> (top-right) and check <strong>Show Hidden Files (dotfiles)</strong> so <code>.output</code> is visible.",
    "If deploying via cPanel Terminal, run <code>npm run build</code> inside your project directory.",
    "If deploying via ZIP / FTP upload, make sure you ran <code>npm run build</code> locally and uploaded the entire <code>.output</code> directory.",
  ]);
} else {
  try {
    console.log(`[cPanel Starter] 🚀 Starting Seddypluz Node Server (Node ${process.version})...`);
    console.log(`[cPanel Starter] Target Port: ${process.env.PORT || 3000}`);
    await import("./.output/server/index.mjs");
  } catch (err) {
    const errorString = err instanceof Error ? err.stack || err.message : String(err);
    console.error("[cPanel Starter] ❌ Fatal Error during server launch:", err);
    serveDiagnosticError("Fatal Server Startup Exception", errorString, [
      "Check that all environment variables are correctly configured in cPanel Node.js App settings.",
      "Ensure you ran <code>npm install</code> on the cPanel server directly (do not upload Windows <code>node_modules</code> to Linux cPanel).",
      "Verify Node.js version is <strong>22.x</strong> in cPanel Setup Node.js App.",
    ]);
  }
}
