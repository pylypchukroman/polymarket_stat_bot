import { MongoClient } from "mongodb";

const uri = "";
const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db("myBotDB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}
