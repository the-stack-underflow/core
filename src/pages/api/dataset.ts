import type { APIRoute } from "astro";
import { error, success } from "../../lib/APIResponse";
import { startDatasetDownload } from "../../lib/Datasets";
import { InstallDataset, UnzipDataset } from "../../lib/DonwloadDatasets";
import { GetLockFile } from "../../lib/Lock";
import type { Site } from "../../types";

export const post: APIRoute = async ({ request }) => {
	const body = await request.json() as Site;

	if (!body.dataset) {
		return error(["Missing required field: url"])
	}

	startDatasetDownload(body);

	return success()
} 

export const put: APIRoute = async ({request}) => {
	const body = await request.json();

	if (!body.name) {
		return error(["Missing required field: name"])
	}

	const lockFile = GetLockFile();
	const download = lockFile.downloads.find((x) => x.name == body.name);

	if (!download) {
		return error(["Request download does not exist!"]);
	}

	if (download.status == "downloaded") {
		let unzipped = await UnzipDataset(download)
		await InstallDataset(unzipped)
		return success()
	} else if (download.status == "unzipped") {
		await InstallDataset(download)
		return success()
	} else {
		return error(["Dataset already installed!"])
	}
}