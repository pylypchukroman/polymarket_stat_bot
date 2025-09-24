export type BookEvent = {
  market: string;
  asset_id: string;
  timestamp: string;
  hash: string;
  bids: PriceLevel[];
  asks: PriceLevel[];
  event_type: 'book';
};

export type PriceLevel = {
  price: string;
  size: string;
};

export type MarketSide = "Yes" | "No";

export type MarketData = {
  side: MarketSide;
  price: number;
  size: number;
};

export interface PriceData {
  price: number;
  size: number;
}
