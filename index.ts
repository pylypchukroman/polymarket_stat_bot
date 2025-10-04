import dotenv from "dotenv";
dotenv.config();

import { MarketWebSocket } from './WS/ws';
import { getClobTokenIds } from './helpers/getClobTokenIds';
import { logger } from './slack/logger';

async function main() {
  const clobTokenIds = await getClobTokenIds();
  if (!clobTokenIds) {
    logger.error("CLOB token ids not found")
    return;
  }

  new MarketWebSocket(clobTokenIds);
}

main();
