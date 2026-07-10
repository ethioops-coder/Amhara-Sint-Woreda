#!/usr/bin/env node
// Run Prisma db push at startup
const { execSync } = require("child_process");

try {
  console.log("Running database migration...");
  execSync("node node_modules/prisma/build/index.js db push --schema=prisma/schema.prisma --skip-generate --accept-data-loss", {
    stdio: "inherit",
    env: process.env,
  });
  console.log("Database migration complete.");
} catch (e) {
  console.error("Migration failed:", e.message);
  // Don't exit — let the server start anyway
}

// Start the Next.js server
require("./server.js");
