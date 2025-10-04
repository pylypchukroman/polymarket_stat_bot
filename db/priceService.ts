import { connectDB } from './db';
import { Db } from 'mongodb';
import { logger } from '../slack/logger';
import { FLUSH_INTERVAL } from '../data/consts';
import { MarketData } from '../types/interfaces';

let buffer: any[] = [];

export function savePriceUpdate(data: MarketData | null) {
  if(!data) return;

  buffer.push({
    ...data,
    timestamp: new Date()
  });
}

setInterval(async () => {
  if (buffer.length === 0) return;

  try {
    const db: Db = await connectDB();
    const collection = db.collection("prices");
    const dataToInsert = buffer;
    buffer = [];
    await collection.insertMany(dataToInsert);
  } catch (err) {
    logger.error("❌ Error flushing prices:", err);
  }
}, FLUSH_INTERVAL);
