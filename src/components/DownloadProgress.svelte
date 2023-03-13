<script lang="ts">
	import { WebSocketClient } from "../lib/BrowserSocket";
  import type { Download, LockFile } from "../lib/Lock/types";
	const client = new WebSocketClient("ws://localhost:8080");
	export let lockFile: LockFile;

	const downloads: {
		[key: string]: {
			status: "started" | "downloading" | "error" | "success",
			progress?: number,
			eta?: number,
			file?: string,
			speed?: number
		}
	} = {};

	client.on("open", () => {
		client.subscribe("dataset:download:start", (data: { file: string }) => {
			downloads[data.file] = {
				status: "downloading",
				file: data.file
			};
		})

		// progress in percent, speed in KB/s, eta in seconds
		client.subscribe("dataset:download:progress",(data: { progress: number, speed: number, eta: number, file: string }) => {
			downloads[data.file] = {
				status: "downloading",
				file: data.file,
				progress: data.progress,
				eta: data.eta,
				speed: data.speed
			};
			
		})
		
		client.subscribe("dataset:download:success", (data: { file: string, time: number }) => {
			downloads[data.file] = {
				status: "success",
				file: data.file
			};
		})

		client.subscribe("dataset:download:error", (data: { errors: string[], file: string }) => {
			downloads[data.file] = {
				status: "error",
				file: data.file,
			};
		})

		client.subscribe("dataset:install:start", (data: { dir: string }) => {
			downloads[data.dir] = {
				status: "downloading",
				file: data.dir
			};
			console.log(data);
		})

		// progress in percent, speed in KB/s, eta in seconds
		client.subscribe("dataset:install:progress",(data: { progress: number, speed: number, eta: number, name: string }) => {
			downloads[data.name] = {
				status: "downloading",
				file: data.name,
				progress: data.progress,
				eta: data.eta,
				speed: data.speed
			};
			console.log(data);
		})
		
		client.subscribe("dataset:install:success", (data: { files: string, time: number, name: string }) => {
			downloads[data.name] = {
				status: "success",
				file: data.name
			};
			console.log(data);
		})

		client.subscribe("dataset:install:error", (data: { errors: string[], files: string, name: string }) => {
			downloads[data.name] = {
				status: "error",
				file: data.name,
			};
			console.log(data);
		})

		client.subscribe("dataset:unzip:start", (data: { file: string }) => {
			console.log(data)
		})

		// progress in percent, speed in KB/s, eta in seconds
		client.subscribe("dataset:unzip:progress",(data: { progress: number, speed: number, eta: number }) => {
			console.log(data)
		})

		client.subscribe("dataset:unzip:success", (data: { files: string[], time: number }) => {
			console.log(data)
		})

		client.subscribe("dataset:unzip:error", (data: { errors: string[] }) => {
			console.log(data)
		})
	})

	function triggerDownloadInstall(download: Download) {
		fetch("/api/dataset", {
			method: "PUT",
			body: JSON.stringify({
				name: download.name
			})
		})
	}
</script>

<div class="mb-4 flex flex-col gap-4">
	<div class="grid grid-cols-3 gap-4">
		{#each lockFile.downloads as download}
				<div class="rounded-lg border border-slate-300 bg-white flex flex-col p-4">
					<span class="text-sm text-slate-600">{download.name}</span>
					<span class="text-sm text-slate-600">Status: {download.status}</span>
					{#if download.status == "installed"}
					<button>Remove</button>
					{:else}
					<button on:click={() => triggerDownloadInstall(download)}>Install</button>
					{/if}
				</div>
		{/each}
	</div>

	{#each Object.values(downloads) as download}
		{#if download.status == "downloading" || download.status == "started"}
		<div class="flex flex-row w-full gap-4 items-center">
			<span class="text-sm text-slate-600">{download.file}</span>
			<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
				<div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style="width: {download.progress || 0}%"> {download.progress}%</div>
			</div>
			<span class="text-sm text-slate-600">{Math.round(download.eta || 0).toFixed(0).padStart(6, " ")}s</span>
		</div>
		{:else if download.status == "error"}
		<div class="flex flex-row w-full gap-4 items-center">
			<span class="text-sm text-slate-600">{download.file}</span>
			<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
				<div class="bg-red-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-full">Error</div>
			</div>
		</div>
		{:else if download.status == "success"}
		<div class="flex flex-row w-full gap-4 items-center">
			<span class="text-sm text-slate-600">{download.file}</span>
			<div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
				<div class="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-full">Success</div>
			</div>
		</div>
		{/if}
	{/each}
</div>