import type { APIRoute } from "astro";
import { addBookmark, removeBookmark } from "../../lib/Bookmarks";
import { getPost } from "../../lib/Posts";

export const post: APIRoute = async ({ request }) => {
	// Write all bookmarks to a file to persist changes.
	// Check if the file already exists.
	const body = await request.json();
	if (!body.hasOwnProperty("id")) {
		return new Response(JSON.stringify({success: false, errors: ["Missing id in request."]}))
	}
	
	const post = await getPost(body.id)
	addBookmark(body.id, post);

	return new Response(JSON.stringify({success: true, data: {}}));
}

export const del: APIRoute = async ({ request }) => {
	// Write all bookmarks to a file to persist changes.
	// Check if the file already exists.
	const body = await request.json();
	if (!body.hasOwnProperty("id")) {
		return new Response(JSON.stringify({success: false, errors: ["Missing id in request."]}))
	}

	removeBookmark(body.id);

	return new Response(JSON.stringify({success: true, data: {}}));
}