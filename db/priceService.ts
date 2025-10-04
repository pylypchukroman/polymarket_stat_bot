import { connectDB } from './db';
import { MarketData } from '../types/types';
import { Db } from 'mongodb';
import { logger } from '../slack/logger';


export async function savePriceUpdate(data: MarketData | null) {
  if (!data) return;
  try {
    const db: Db | undefined = await connectDB();
    const collection = db.collection("price");

    await collection.insertOne({
      data,
      timestamp: new Date()
    });
  } catch (err) {
    logger.error("❌ Error saving price");
  }
}
