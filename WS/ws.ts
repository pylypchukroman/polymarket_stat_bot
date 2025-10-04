import WebSocket from 'ws';
import { getMarketData } from '../helpers/getMarketData';
import { MarketSide } from '../types/types';
import { savePriceUpdate } from '../db/priceService';
import { logger } from '../slack/logger';

export class MarketWebSocket {
  private ws: WebSocket;
  private pingInterval: NodeJS.Timeout | null = null;
  private ids: (string | undefined)[];

  constructor(private clobTokenIds: Record<MarketSide, string> | null = null) {
    this.ids = [clobTokenIds?.Yes, clobTokenIds?.No];
    const url = "wss://ws-subscriptions-clob.polymarket.com/ws/market";
    this.ws = new WebSocket(url);
    this.ws.on('open', this.onOpen.bind(this));
    this.ws.on('message', this.onMessage.bind(this));
    this.ws.on('error', this.onError.bind(this));
    this.ws.on('close', this.onClose.bind(this));
  }

  private onOpen(): void {
    this.ws.send(JSON.stringify({
      assets_ids: this.ids,
      type: "market"
    }));

    this.pingInterval = setInterval(() => {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send("PING");
      }
    }, 10000);
  }

  private onMessage(data: WebSocket.Data): void {
    const rawData = data.toString();
    if (!rawData.startsWith('{')) return;

      try {
        const message = JSON.parse(rawData);
        if (typeof message === 'object' && message !== null && message.event_type === 'book') {
          const marketData = getMarketData(message, this.clobTokenIds);
          savePriceUpdate(marketData);
        }
      } catch (error) {
        logger.error('Failed to parse JSON string');
      }
  }

  private onError(error: Error): void {
    logger.error('WS Error');
  }

  private onClose(): void {
    logger.info("Connection closed");
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  }
}
