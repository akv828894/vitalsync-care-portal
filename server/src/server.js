const env = require("./config/env");
const app = require("./app");
const connectDatabase = require("./config/connectDatabase");

const startServer = async () => {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is missing. Add it to server/.env before starting the API.");
  }

  await connectDatabase();

  app.listen(env.port, env.host, () => {
    console.log(`VitalSync API running on http://${env.host}:${env.port}`);
    console.log(`Allowed client origins: ${env.clientUrls.join(", ")}`);
    if (env.demoMode) {
      console.log("Current mode: in-memory demo mode");
    }
  });
};

startServer().catch((error) => {
  console.error("Failed to start VitalSync API.");
  console.error(error.message);
  process.exit(1);
});
