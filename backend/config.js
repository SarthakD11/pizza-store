import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend folder
const result = dotenv.config({
  path: path.join(__dirname, ".env"),
});

if (result.error) {
  console.log("⚠️ DOTENV ERROR: Could not find backend/.env file");
} else {
  console.log("✅ DOTENV LOADED from backend/.env");
}

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5001,
};

export default config;
