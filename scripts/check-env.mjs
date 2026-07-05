const required = ["ADMIN_PASSCODE", "ADMIN_SESSION_SECRET"];

const missing = required.filter((name) => {
  const value = process.env[name];
  return !value || value.trim().length === 0 || value.includes("change-me") || value.includes("use-a-long-random-secret");
});

if (missing.length > 0) {
  console.error("Missing/invalid required env vars:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

console.log("Environment check passed for admin auth secrets.");
