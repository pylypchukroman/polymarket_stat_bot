import { connectDB } from './db';


export async function savePriceUpdate(symbol, price) {
  try {
    const db = await connectDB();
    const collection = db.collection("priceUpdates");

    await collection.insertOne({
      symbol,
      price,
      timestamp: new Date()
    });

    console.log("💾 Price saved:", symbol, price);
  } catch (err) {
    console.error("❌ Error saving price:", err);
  }
}
