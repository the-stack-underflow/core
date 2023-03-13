export const Views: {[id: string]: { component: (props: Record<string, any>) =>string, options: { title: string }}} = {}

export const loadedExtensions: Record<string, Record<string, boolean>> = {

}

export const SidebarLinks: {
	[id: string]: { icon: any, link?: string, id: string }
} = {}

export const APIRoutes: Record<string, {
	method: string,
	handler: any,
	id: string
}> = {};

export const Config = {
	title: "StackUnderflow",
	currentView: ""
}