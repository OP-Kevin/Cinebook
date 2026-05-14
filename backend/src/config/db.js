const mongoose = require("mongoose");
const dns = require("dns");

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing in .env");
  }

  // Work around SRV lookup failures on some local DNS resolvers.
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  await mongoose.connect(mongoUri, {
    family: 4,
  });
  console.log("MongoDB connected");
}

module.exports = connectDB;
