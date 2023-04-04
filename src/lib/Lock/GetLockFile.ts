import * as fs from "fs"
import * as path from "path";
import { __dirname } from "../../__dirname";
import { CreateLockFile } from "./CreateLockFile";
import type { LockFile } from "~/types/index";

export function GetLockFile(): LockFile {
	const lockFilePath = path.join(__dirname, "../persistent/lockfile.json");

	if (!fs.existsSync(lockFilePath)) {
		// The lock file does not exist, we need to create it;
		let content = CreateLockFile(lockFilePath);
		return content;
	}

	const content = fs.readFileSync(lockFilePath, "utf-8");
	const json = JSON.parse(content)
	return json;
}