export interface MessageType {
	type: "success" | "error" | "info",
	text: string,
	id?: number
}