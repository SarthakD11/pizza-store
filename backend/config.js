import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.resolve(process.cwd(), "backend", ".env"),
});

// Debugging
if (result.error) {
  console.log("⚠️  DOTENV ERROR: Could not find .env file at:", path.resolve(process.cwd(), "backend", ".env"));
} else {
  console.log("✅ DOTENV LOADED from backend folder.");
}

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5001,
};

export default config;