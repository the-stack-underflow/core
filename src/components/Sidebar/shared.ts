import { writable, Writable } from "svelte/store";
import type { ViewLinks } from "./types";
import { SidebarLinks } from "../../lib/Shared";

export const ViewButtons: Writable<ViewLinks> = writable(SidebarLinks)