import { MarketSide } from './types';

export interface PriceLevel {
  price: string;
  size: string;
}

export interface BookEvent {
  market: string;
  asset_id: string;
  timestamp: string;
  hash: string;
  bids: PriceLevel[];
  asks: PriceLevel[];
  event_type: 'book';
}

export interface PriceData {
  price: number;
  size: number;
}

export interface MarketData {
  side: MarketSide;
  price: number;
  size: number;
}
