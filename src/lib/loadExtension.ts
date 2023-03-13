import { __dirname } from "../__dirname";
import { ExtensionContext } from "./Extension/ExtensionContext";
import { loadedExtensions } from "./Shared";

export async function loadExtension(name: string, activate: (context: ExtensionContext) => any, version: string = "0.0.1") {
	// An extension is just a node module
	const id = name.toLowerCase().replace(/[^A-Za-z_\-0-9]/g, "_").replace(/[_]+/g, "_");
	
	if (loadedExtensions[id]) {
		// Extension was already loaded, continue;
		return;
	}

	loadedExtensions[id] = {};

	const context = new ExtensionContext(id);
	await activate(context);
}
