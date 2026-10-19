import "server-only";

import { MongoClient, type Db } from "mongodb";

// Reuse the connection pool across requests and Next.js development reloads.
const mongoGlobal = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export async function getDatabase(): Promise<Db> {
  const uri = process.env.MONGODB_URI?.trim();
  const databaseName = process.env.MONGODB_DB?.trim();

  if (!uri || /<[^>]+>/.test(uri)) {
    throw new Error("Set MONGODB_URI to your complete Atlas connection string in .env.local.");
  }
  if (!databaseName) {
    throw new Error("Set MONGODB_DB to your database name in .env.local.");
  }

  if (!mongoGlobal.mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    });

    mongoGlobal.mongoClientPromise = client.connect().catch(async (error: unknown) => {
      // Allow a later request to retry instead of caching a failed connection.
      mongoGlobal.mongoClientPromise = undefined;
      await client.close().catch(() => undefined);
      throw error;
    });
  }

  const client = await mongoGlobal.mongoClientPromise;
  return client.db(databaseName);
}