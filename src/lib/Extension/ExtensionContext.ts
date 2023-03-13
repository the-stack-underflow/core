import * as path from "path";
import * as fs from "fs";
import { __dirname } from "../../__dirname";
import { GetLockFile, WriteLockFile } from "../Lock";
import type { APIRouteConfig, LockFile, SidebarLinkConfig, ViewConfig } from "~/types/index";
import { Views, APIRoutes, SidebarLinks, loadedExtensions } from "../Shared";

type LockFileCallback = (data: Record<string, any>) => Record<string, any> | Promise<Record<string, any>>;

export class ExtensionContext {
	constructor(public id: string) {
		// Make all properties immutable.
		Object.seal(this);
	}

	public async addToLockfile(callback: LockFileCallback): Promise<void> {
		// Retrieve the lock file.
		const lock = this.getLockFile()

		// Add the data to the lock file
		// by calling a callback function that can iterate freely through the data
		// otherwise it's more difficult iterating through a list of path parts.
		lock.plugins[this.id].data = await callback(lock.plugins[this.id].data);
		// Save the lock file.
		WriteLockFile(lock);
	}

	public async deleteFromLockfile(callback: LockFileCallback): Promise<void> {
		// Retrieve the lock file
		const lock = this.getLockFile();

		lock.plugins[this.id].data = await callback(lock.plugins[this.id].data);

		WriteLockFile(lock);
	}

	public getLockedContent() {
		const lock = this.getLockFile();

		return lock.plugins[this.id].data;
	}

	public getLockFile(): LockFile {
		// Retrieve the lock file
		const lock = GetLockFile();
		// Check if the lock file already has a property called `plugins` and withing
		// that if the `id` of the current instance is already stored.
		if (!lock.hasOwnProperty("plugins")) {
			lock["plugins"] = {};
		}

		if (!lock.plugins.hasOwnProperty(this.id)) {
			lock.plugins[this.id] = {
				dependencies: {},
				description: "",
				name: "",
				url: "",
				version: "",
				data: {}
			}
		}

		return lock;
	}

	public getPersistentLocation(): string {
		// If the persistent folder for this id does not exist already, create it.
		const dir = path.join(__dirname, "./persistent/", this.id);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		return dir;
	}

	public addView(view: ViewConfig): void | never {
		if (!view.id) {
			throw new Error("An extension view must register a unique id!");
		}

		if (Views.hasOwnProperty(view.id)) {
			throw new Error(`'${view.id}' is already reserved!`);
		}

		// Reserve the view.
		loadedExtensions[this.id][view.id] = true;
		Views[view.id] = view;
	}

	public addRoute(route: APIRouteConfig): void | never {
		if (!route.id) {
			throw new Error("Every route must register a unique id!");
		}

		if (APIRoutes.hasOwnProperty(route.id)) {
			throw new Error(`'${route.id}' is already reserved!`);
		}

		// Reserve the route.
		loadedExtensions[this.id][route.id] = true;
		APIRoutes[route.id] = route;
	}

	public addLink(link: SidebarLinkConfig): void | never {
		if (!link.id) {
			throw new Error("Every route must register a unique id!");
		}

		if (SidebarLinks.hasOwnProperty(link.id)) {
			throw new Error(`'${link.id}' is already reserved!`);
		}

		// Reserve the link
		loadedExtensions[this.id][link.id] = true;
		SidebarLinks[link.id] = link;
	}

	public getStoragePath() {
		// Check if the path has already been created, otherwise we need to create the directory.
		const dir = path.join(__dirname, "./persistent", this.id);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		return dir;
	}

	public store(
		file: string,
		content: string | NodeJS.ArrayBufferView,
		options?: fs.WriteFileOptions | undefined
	) {
		let filePath = path.join(this.getStoragePath(), file);
		fs.writeFileSync(filePath, content, options);
	}

	public get(file: string): string | null {
		let filePath = path.join(this.getStoragePath(), file);

		if (fs.existsSync(filePath)) {
			return fs.readFileSync(filePath, "utf-8");
		}

		return null;
	}
}