import * as fs from "fs"
import * as path from "path";
import type { LockFile } from "~/types/index";

export function CreateLockFile(location: string): LockFile {
	if (!fs.existsSync(location)) {
		let content: LockFile = {
			downloads: [],
			plugins: {},
			version: 0.1
		}
		fs.writeFileSync(location, JSON.stringify(content));
		return content;
	}

	return JSON.parse(fs.readFileSync(location, "utf-8"))
}