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
    const rawData = data.toString();

    // Перевіряємо, чи починається повідомлення з '{'.
    // Це простий спосіб відрізнити JSON від звичайних текстових повідомлень,
    // таких як "PONG".
    if (rawData.startsWith('{')) {
      try {
        const message = JSON.parse(rawData);

        if (typeof message === 'object' && message !== null && message.event_type === 'book') {
          console.log('Received "book" data:', message);
        } else {
          // За бажанням, можна ігнорувати інші типи повідомлень
          console.log(`Ignoring event type: ${message.event_type}`);
        }
      } catch (error) {
        console.error('Failed to parse JSON string:', error);
      }
    } else {
      console.log('Received non-JSON message:', rawData);
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
