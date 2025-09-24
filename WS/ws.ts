import WebSocket from 'ws';
import { getMarketData } from '../helpers/getMarketData';
import { MarketSide } from '../types/types';

export class MarketWebSocket {
  private ws: WebSocket;
  private pingInterval: NodeJS.Timeout | null = null;
  private ids: any;

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
    // Subscribe to market data for specified asset IDs
    this.ws.send(JSON.stringify({
      assets_ids: this.ids,
      type: "market"
    }));

    // Start ping to keep connection alive
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
          console.log(marketData, "DATA");
        }
      } catch (error) {
        console.error('Failed to parse JSON string:', error);
      }
  }

  private onError(error: Error): void {
    console.log("Error: ", error);
  }

  private onClose(): void {
    console.log("Connection closed");
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
  }
}
