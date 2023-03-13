import { CreateLockFile } from "./CreateLockFile";
import type { LockFile } from "~/types/index";
import { __dirname } from "../../__dirname";
import * as fs from "fs";
import * as path from "path";

export function WriteLockFile(content: LockFile) {
	const location = path.join(__dirname, "persistent/lockfile.json");
	if (!fs.existsSync(location)) {
		CreateLockFile(location);
	}

	fs.writeFileSync(location, JSON.stringify(content));
}