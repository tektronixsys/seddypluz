import fs from "node:fs";
import path from "node:path";

const coreRequired = ["ADMIN_PASSCODE", "ADMIN_SESSION_SECRET"];

const firebaseRequired = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];

const paymentOptional = [
  "FLUTTERWAVE_PUBLIC_KEY",
  "FLUTTERWAVE_SECRET_KEY",
  "FLUTTERWAVE_ENCRYPTION_KEY",
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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");
loadEnvFile(".env.production");

const isPlaceholder = (value) => {
  if (!value || value.trim().length === 0) return true;
  return (
    value.includes("change-me") ||
    value.includes("use-a-long-random-secret") ||
    value.includes("your-firebase-project-id") ||
    value.includes("firebase-adminsdk-xxxxx") ||
    value.includes("YOUR_KEY")
  );
};

const missingCore = coreRequired.filter((name) => isPlaceholder(process.env[name]));
const missingFirebase = firebaseRequired.filter((name) => isPlaceholder(process.env[name]));
const missingPayment = paymentOptional.filter((name) => isPlaceholder(process.env[name]));

console.log("\n📋 --- Seddypluz Environment Configuration Check ---");

if (missingCore.length > 0) {
  console.error("❌ Missing required Admin Authentication secrets:");
  for (const key of missingCore) console.error(`   - ${key}`);
} else {
  console.log("✅ Admin Authentication secrets configured.");
}

if (missingFirebase.length > 0) {
  console.warn(
    "⚠️  Firebase Admin credentials not fully configured (fallback in-memory/client mode will be used):",
  );
  for (const key of missingFirebase) console.warn(`   - ${key}`);
} else {
  console.log("✅ Firebase Admin credentials configured.");
}

if (missingPayment.length > 0) {
  console.warn("⚠️  Flutterwave Payment keys not fully configured:");
  for (const key of missingPayment) console.warn(`   - ${key}`);
} else {
  console.log("✅ Flutterwave Payment Gateway keys configured.");
}

if (missingCore.length > 0) {
  console.error("\n❌ Environment check FAILED due to missing core secrets.\n");
  process.exit(1);
}

console.log("\n✨ Environment check PASSED for production deployment.\n");
