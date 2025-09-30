import { MarketWebSocket } from './WS/ws';
import { getClobTokenIds } from './helpers/getClobTokenIds';
import { getMarketData } from './helpers/getMarketData';


async function main() {
  const clobTokenIds = await getClobTokenIds();
  if (!clobTokenIds) {
    return;
  }
  const ids = [clobTokenIds.Yes, clobTokenIds.No];

  new MarketWebSocket(clobTokenIds);
}


main();
