type Callback = (data: any) => any;
import WebSocket from "ws";

export class WebSocketClient {
	public url: string;
	public socket: WebSocket | null = null;
	public subscriptions: Map<string, Set<Callback>> = new Map()
	public events: Map<string, Set<Callback>> = new Map();
  constructor(url: string) {
    this.url = url;
		this.socket = new WebSocket(this.url);
    this.socket?.on("open", this.onOpen.bind(this));
    this.socket?.on("message", this.onMessage.bind(this));
    this.socket?.on("close", this.onClose.bind(this));
    this.socket?.on("error", this.onError.bind(this));
  }

  onOpen(event: Event) {
    this.events.get('open')?.forEach(fn => fn(event));
  }

  onClose(event: Event) {
    this.events.get('close')?.forEach(fn => fn(event));
  }

  onError(event: Event) {
    this.events.get('error')?.forEach(fn => fn(event));
  }

  onMessage(e: Event & { data: any }) {
    const { event, data } = JSON.parse(e.data);

    this.subscriptions.get(event)?.forEach(fn => {
			fn(data);
		})
  }

  subscribe(event: string, fn: Callback) {
    this.send({ type: 'subscribe', data: { event: event } });
    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, new Set());
    }
		this.subscriptions.get(event)?.add(fn)
  }

  unsubscribe(event: string, fn: Callback) {
    this.send({ type: 'unsubscribe', data: { event: event } });
		this.subscriptions.get(event)?.delete(fn)
  }

	on(event: string, fn: Callback) {
		if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)?.add(fn);
	}

	off(event: string, fn: Callback) {
		this.events.get(event)?.delete(fn);
	}

  send(data: {[key: string]: any} | any[]) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('Socket not connected');
    }
  }

	emit(event: string, payload: any) {
		this.send({
			type: "emit",
			data: {
				event,
				payload
			}
		})
	}
}