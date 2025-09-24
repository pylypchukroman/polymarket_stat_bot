import { BookEvent, MarketSide, PriceData } from '../types/types';
import { getCurrentPrice } from './getCurrentPrice';

export let prices: Record<MarketSide, PriceData | null> = {
  Yes: null,
  No: null
};

export function getMarketData(
  e: BookEvent,
  clobTokenIds: any
): Record<MarketSide, PriceData | null> | null {

  const side: MarketSide | null = e.asset_id === clobTokenIds.Yes
    ? "Yes"
    : e.asset_id === clobTokenIds.No
      ? "No"
      : null;

  if (!side) return null;

  const bids: PriceData[] = e.bids?.map(b => ({ price: parseFloat(b.price), size: parseFloat(b.size) })) || [];
  const asks: PriceData[] = e.asks?.map(a => ({ price: parseFloat(a.price), size: parseFloat(a.size) })) || [];

  const currentPrice = getCurrentPrice(bids, asks);
  prices[side] = currentPrice;

  return prices;
}
