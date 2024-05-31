import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Resolve the directory name from the module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config();

const envPath = resolve(__dirname, "../.env");
const env = readFileSync(envPath, "utf8");

const matches = env.match(/VITE_APP_VERSION=(\d+)/);
if (matches && matches[1]) {
  const currentVersion = parseInt(matches[1], 10);
  const newVersion = currentVersion + 1;
  const updatedEnv = env.replace(
    /VITE_APP_VERSION=\d+/,
    `VITE_APP_VERSION=${newVersion}`
  );
  writeFileSync(envPath, updatedEnv);
  console.log(`Version updated to ${newVersion}`);
} else {
  console.error("Failed to update version.");
}
