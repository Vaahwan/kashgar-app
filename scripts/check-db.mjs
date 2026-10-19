import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
const databaseName = process.env.MONGODB_DB?.trim();

if (!uri || /<[^>]+>/.test(uri) || !databaseName) {
  console.error("Database is not configured. Set MONGODB_URI and MONGODB_DB in .env.local, then run npm run db:check again.");
  process.exitCode = 1;
} else {
  let client;
  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    });
    await client.connect();
    await client.db(databaseName).command({ ping: 1 });
    console.log("MongoDB connection and database ping succeeded.");
  } catch {
    // Do not print driver errors: they may contain connection details.
    console.error("MongoDB connection failed. Check the Atlas database credentials, connection string, cluster availability, and Network Access IP allowlist.");
    process.exitCode = 1;
  } finally {
    await client?.close();
  }
}