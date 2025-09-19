import { MarketWebSocket } from './WS/ws';
import { getClobTokenIds } from './getClobTokenIds';


async function setupSubscriptions() {
  const clobTokenIds = await getClobTokenIds("bitcoin");
  if (!clobTokenIds) {
    return;
  }
  const ids = [clobTokenIds.Up, clobTokenIds.Down];

  new MarketWebSocket(ids);
}


setupSubscriptions();
