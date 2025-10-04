import { Db, MongoClient } from "mongodb";
import { logger } from '../slack/logger';


const uri: string = process.env.MONGO_DB_URI as string;
const client = new MongoClient(uri);

let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db) return db;

  try {
    await client.connect();
    db = client.db("myBotDB");
    logger.info("✅ Connected to MongoDB");
    return db;
  } catch (err) {
    logger.error("❌ Error connecting to MongoDB");
    throw new Error("MongoDB connection failed");
  }
}
