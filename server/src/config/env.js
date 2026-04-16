const dotenv = require("dotenv");

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";
const rawClientUrls =
  process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173";
const clientUrls = rawClientUrls
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);
const demoMode =
  process.env.DEMO_MODE === "true" ||
  (!process.env.MONGO_URI && nodeEnv !== "production");

const env = {
  nodeEnv,
  host: process.env.HOST || "0.0.0.0",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret:
    process.env.JWT_SECRET ||
    (nodeEnv === "development" ? "vitalsync-dev-only-secret" : ""),
  clientUrls,
  primaryClientUrl: clientUrls[0] || "http://localhost:5173",
  demoMode,
};

module.exports = env;
