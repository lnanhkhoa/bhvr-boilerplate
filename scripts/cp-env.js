#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const envMappings = [
  { source: "dotenv/.env.server", target: "apps/server/.env" },
  { source: "dotenv/.env.client", target: "apps/client/.env" },
];

const rootDir = path.join(__dirname, "..");

console.log("🦫 Linking environment files...");

envMappings.forEach(({ source, target }) => {
  const sourcePath = path.join(rootDir, source);
  const targetPath = path.join(rootDir, target);

  try {
    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      console.warn(`⚠️  Source not found: ${source}`);
      return;
    }

    // Create target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy the file (overwrite if exists)
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✓ Copied ${source} → ${target}`);
  } catch (error) {
    console.error(`✗ Failed to copy ${source}:`, error.message);
    process.exit(1);
  }
});

console.log("✨ Environment files linked successfully!");
