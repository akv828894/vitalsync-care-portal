const mongoose = require("mongoose");
const env = require("./env");

const connectDatabase = async () => {
  if (!env.mongoUri) {
    if (env.demoMode) {
      console.log("MONGO_URI is missing. Running VitalSync API in in-memory demo mode.");
      return;
    }

    throw new Error("MONGO_URI is missing. Add it before starting the production API.");
  }

  await mongoose.connect(env.mongoUri);

  console.log(`MongoDB connected on ${mongoose.connection.host}`);
};

module.exports = connectDatabase;
