import WebSocket, {WebSocketServer as WSServer} from "ws";

class WebSocketServer {
	public wss: WebSocket.Server;
	public clients: Set<WebSocket.WebSocket>
	public subscriptions: Map<string, Set<WebSocket>>
  constructor({ port }: { port : number }) {
    this.wss = new WSServer({ port });
    this.clients = new Set();
    this.subscriptions = new Map();
    
    this.wss.on('connection', (client) => {
      this.clients.add(client);
      
      client.on('message', (message) => {
          const json = JSON.parse(message.toString());
          
          if (json.type === 'subscribe') {
            // Add the client to the specified subscription
            const { event } = json.data;
            const subscription = this.subscriptions.get(event) || new Set();
            subscription.add(client);
            this.subscriptions.set(event, subscription);
          } else if (json.type == "emit") {
						// This call comes from the server, we are to emit a payload.
						const { payload, event } = json.data;
						this.emit(event, payload);
					}
      });
      
      client.on('close', () => {
        this.clients.delete(client);
        
        // Remove the client from all subscriptions
        this.subscriptions.forEach((clients, event) => {
          clients.delete(client);
        });
      });
    });
  }
  
  emit(event: string, data: any) {
    const clients = this.subscriptions.get(event) || new Set();
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          event: event,
          data,
        }));
      }
    });
  }
}

export { WebSocketServer }