import type { APIRoute } from "astro";
import { error, success } from "../../lib/APIResponse";
import { APIRoutes } from "../../lib/Shared";

export const get: APIRoute = async (parameters) => {
	let route;
	for (const name in APIRoutes) {
		if (APIRoutes[name].method.toLowerCase() == "get" && name == parameters.params.route) {
			route = APIRoutes[name];
			break;
		}
	}

	if (!route) {
		return error(["Route does not exist!"]);
	}

	return await route.handler(parameters, success, error);
}

export const post: APIRoute = async (parameters) => {
	let route;
	for (const name in APIRoutes) {
		if (APIRoutes[name].method.toLowerCase() == "post" && name == parameters.params.route) {
			route = APIRoutes[name];
			break;
		}
	}

	if (!route) {
		return error(["Route does not exist!"]);
	}

	return await route.handler(parameters, success, error);
}