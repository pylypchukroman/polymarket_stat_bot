import WebSocket from 'ws';

export class MarketWebSocket {
  private ws: WebSocket;
  private pingInterval: NodeJS.Timeout | null = null;

  constructor(private assetIds: string[]) {
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
      assets_ids: this.assetIds,
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
    const message = data.toString();
    console.log(message);
    // Process your market data here
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
