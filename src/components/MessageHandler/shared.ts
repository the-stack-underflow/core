import { Writable, writable } from "svelte/store";
import type { MessageType } from "./types";

export const messages: Writable<MessageType[]> = writable([]);