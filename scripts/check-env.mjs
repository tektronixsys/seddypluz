import fs from "node:fs";
import path from "node:path";

const required = [
  "ADMIN_PASSCODE",
  "ADMIN_SESSION_SECRET",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

function loadEnvFile(fileName) {
  const filePath = path.resolve(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const missing = required.filter((name) => {
  const value = process.env[name];
  return (
    !value ||
    value.trim().length === 0 ||
    value.includes("change-me") ||
    value.includes("use-a-long-random-secret") ||
    value.includes("your-firebase-project-id") ||
    value.includes("firebase-adminsdk-xxxxx") ||
    value.includes("YOUR_KEY")
  );
});

if (missing.length > 0) {
  console.error("Missing/invalid required env vars:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

console.log("Environment check passed for admin auth secrets.");
