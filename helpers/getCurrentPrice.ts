import { PriceData } from '../types/types';

export function getCurrentPrice(
  bids: PriceData[],
  asks: PriceData[]
): PriceData | null {
  if (asks.length) {
    return asks.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
  }
  if (bids.length) {
    return bids.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
  }
  return null;
}
