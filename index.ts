import { MarketWebSocket } from './WS/ws';
import { getClobTokenIds } from './getClobTokenIds';
import { getMarketData } from './helpers/getMarketData';


async function setupSubscriptions() {
  const clobTokenIds = await getClobTokenIds();
  if (!clobTokenIds) {
    return;
  }
  const ids = [clobTokenIds.Yes, clobTokenIds.No];

  new MarketWebSocket(clobTokenIds);
}


setupSubscriptions();
