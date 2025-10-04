import { MarketData, MarketSide, PriceData } from '../types/types';

let lastPrice: number | null = null;

export function getNormalizedPrice(
  data: Record<MarketSide, PriceData | null>
): MarketData | null {
  if (!data.Yes || !data.No) return null;

  const normalized: MarketData =
    data.Yes.price > data.No.price
      ? { side: "Yes", ...data.Yes }
      : { side: "No", ...data.No };

  if (lastPrice === normalized.price) {
    return null;
  }

  lastPrice = normalized.price;
  return normalized;
}
