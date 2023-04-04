import type { APIContext } from "astro";
import type { SuccessResponse, ErrorResponse } from "./Extension/ExtensionContext";

export const Views: {[id: string]: { component: (props: Record<string, any>) =>string, options: { title: string }}} = {}

export const loadedExtensions: Record<string, Record<string, boolean>> = {

}

export const SidebarLinks: {
	[id: string]: { icon: any, link?: string, id: string }
} = {}

export const APIRoutes: Record<string, {
	method: string,
	handler: (context: APIContext<Record<string, any>>, success: SuccessResponse, error: ErrorResponse) => Response,
	id: string
}> = {};

export const Config = {
	title: "StackUnderflow",
	currentView: ""
}