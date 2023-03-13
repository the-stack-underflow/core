<script lang="ts">
	import { addMessage } from "./MessageHandler";
	import type { Site } from "../lib/types";

	export let open: (site: Site) => void;
	let isOpen = false;
	let currentDataset: Site;
	open = (site: Site) => {
		currentDataset = site;
		isOpen = true;
	}

	const startDownload = async () => {
		isOpen = false;
		const result = await fetch("/api/dataset", {
			method: "POST",
			body: JSON.stringify(currentDataset)
		})

		const json = await result.json()
		if (json.success == true) {
			addMessage({ text: "Started download, you can see it in the downloads section now.", type: "info" })
		} else {
			addMessage({ text: "Something went wrong!", type: "error" });
		}
	}
</script>

{#if isOpen}
<dialog class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-secondary rounded-lg z-50 border border-dark-blue" open={isOpen}>
	<p>Are you sure you want to download <code>{currentDataset.link}</code>? It's {currentDataset.size} in size! This might take a while depending on your connection speed.</p>
	<p>This operation will download the required files from "archive.org" and store them in the "persistent" folder.</p>
	<p>The files will be added do your "downloads" section where you can see the progress of the installation.</p>
	<p>After that a database will be created and the content will be uploaded to it.</p>
	<div class="flex flex-row gap-4 mt-4">
		<button on:click={startDownload} class="rounded-lg px-4 py-2 bg-violet-600 text-secondary">Download</button>
		<button on:click={() => {
			isOpen = false;
		}} class="rounded-lg px-4 py-2 bg-secondary border border-dark-blue text-dark-blue">Cancel</button>
	</div>
</dialog>
<div class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"></div>
{/if}