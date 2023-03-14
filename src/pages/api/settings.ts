import type { APIRoute } from "astro";
import { error, success } from "../../lib/APIResponse";
import { GetLockFile, WriteLockFile } from "../../lib/Lock";

export const post: APIRoute = async ({params, request}) => {
	const body = await request.json();

	if (!body.postgres) {
		return error(["Missing required parameter 'postgres'"]);
	}

	const lockFile = GetLockFile();

	lockFile.settings = lockFile.settings || {};

	lockFile.settings.postgres = body.postgres;

	WriteLockFile(lockFile);

	return success()
}