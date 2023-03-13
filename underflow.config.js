import { activate as docsLoader } from "@underflow/docs-loader";
import { activate as stackoverflowLoader } from "@underflow/stackoverflow-loader";

export default {
	plugins: [{
		name: "@underflow/docs-loader",
		activate: docsLoader,
		version: "0.0.1"
	},{
		name: "@underflow/stackoverflow-loader",
		activate: stackoverflowLoader,
		version: "0.0.1"
	}]
}