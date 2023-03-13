<script lang="ts">
	import { addMessage } from "../MessageHandler";
  import { WebSocketClient } from "../../lib/BrowserSocket";
  import type { Site } from "../../lib/types";
	import Card from "../Card.svelte";
  import Modal from "../Modal.svelte";
  import ProgressBar from "../ProgressBar.svelte";
	import { Tabs, TabList, TabPanel, Tab } from "../Tabs";

	import Sites from "./stack-exchange-sites.json";

	const SiteArray: Site[] = Sites as Site[];

	async function toggleInstalled(site: Site, active: boolean) {
		if (!active) {
			// Dataset was requested to be uninstalled.
			addMessage({ text: `Uninstalling "${site.title}", this might take a while`, type: "info" });
		} else {
			const result = await fetch("/api/dataset", {
				method: "POST",
				body: JSON.stringify(site)
			})

			const json = await result.json()
			if (json.success == true) {
				addMessage({ text: "Started download, you can see it in the downloads section now.", type: "success" });
			} else {
				addMessage({ text: "Something went wrong!", type: "error" });
			}
		}
	}

	let openModal: (site: Site) => {};

	const downloads: {
		[key: string]: {
			status: "started" | "downloading" | "error" | "success",
			progress?: number,
			eta?: number,
			speed?: number,
			site: Site
		}
	} = {};

	const client = new WebSocketClient("ws://localhost:8080");
	client.on("open", () => {
		client.subscribe("dataset:download:start", (data: { site: Site }) => {
			downloads[data.site.title] = {
				status: "downloading",
				site: data.site
			};
		})

		// progress in percent, speed in KB/s, eta in seconds
		client.subscribe("dataset:download:progress",(data: { progress: number, speed: number, eta: number, file: string, site: Site }) => {
			downloads[data.site.title] = {
				status: "downloading",
				progress: data.progress,
				eta: data.eta,
				speed: data.speed,
				site: data.site
			};
		})
		
		client.subscribe("dataset:download:success", (data: { file: string, time: number, site: Site }) => {
			downloads[data.site.title] = {
				status: "success",
				site: data.site
			};
		})

		client.subscribe("dataset:download:error", (data: { errors: string[], file: string, site: Site }) => {
			downloads[data.site.title] = {
				status: "error",
				site: data.site
			};
		})

		client.subscribe("dataset:install:start", (data: { site: Site }) => {
			downloads[data.site.title] = {
				status: "downloading",
				site: data.site
			};
			console.log(data);
		})

		// progress in percent, speed in KB/s, eta in seconds
		client.subscribe("dataset:install:progress",(data: { progress: number, speed: number, eta: number, name: string, site: Site }) => {
			downloads[data.site.title] = {
				status: "downloading",
				site: data.site,
				progress: data.progress,
				eta: data.eta,
				speed: data.speed
			};
			console.log(data);
		})
		
		client.subscribe("dataset:install:success", (data: { files: string, time: number, site: Site }) => {
			downloads[data.site.title] = {
				status: "success",
				site: data.site
			};
			console.log(data);
		})

		client.subscribe("dataset:install:error", (data: { errors: string[], files: string, site: Site }) => {
			downloads[data.site.title] = {
				status: "error",
				site: data.site
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
</script>

<Tabs>
	<TabList>
		<Tab>Integrations</Tab>
		<Tab>Plugins</Tab>
		<Tab>Datasets</Tab>
		<Tab>Downloads</Tab>
	</TabList>
	<TabPanel>
		<h2>Integrations and connected apps</h2>
		<p>Supercharge your workflow and connect your favorite tools to StackUnderflow</p>
		<Tabs>
			<TabList>
				<Tab>View All</Tab>
				<Tab>Developer Tools</Tab>
				<Tab>Productivity</Tab>
			</TabList>
			<TabPanel>
				<div class="grid grid-cols-3 py-4 gap-4">
					<Card link="/integrations/gpt-2" button="View Integration" description="GPT-2 offline aids coding by integrating OpenAI's language model to generate code snippets and suggestions based on natural language input." title="GPT-2" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"></Card>
					<Card link="/integrations/" button="View Integration" description="The documentation downloader plugin allows easy access to comprehensive documentation for various programming languages, saving time and increasing productivity." title="Documentation" icon="https://static.thenounproject.com/png/390336-200.png"></Card>
					<Card link="/integrations/" button="View Integration" description="The documentation downloader plugin allows easy access to comprehensive documentation for various programming languages, saving time and increasing productivity." title="Svelte Docs" icon="https://static.thenounproject.com/png/390336-200.png"></Card>
				</div>
			</TabPanel>
		</Tabs>
	</TabPanel>
	<TabPanel>
		<h2>Plugins</h2>
		<p>Supercharge your workflow and connect your favorite tools to StackUnderflow</p>
		<Tabs>
			<TabList>
				<Tab>View All</Tab>
				<Tab>Developer Tools</Tab>
				<Tab>Productivity</Tab>
			</TabList>
			<TabPanel>
			</TabPanel>
		</Tabs>
	</TabPanel>
	<TabPanel>
		<h2>Stack Exchange Dataset Downloads</h2>
		<p>Unleash the power of Stack Exchange locally and without any hassle!</p>
		<Tabs>
			<TabList>
				<Tab>View All</Tab>
				<Tab>Developer Tools</Tab>
				<Tab>Productivity</Tab>
			</TabList>
			<TabPanel>
				<div class="grid grid-cols-3 py-4 gap-4">
					{#each SiteArray as site}
					<Card link={site.link} onToggleSwitch={(active) => toggleInstalled(site, active)} button="View Source" description={site.description + " - " + site.size} title={site.title} icon={site.logo}></Card>
					{/each}
				</div>
			</TabPanel>
			<TabPanel>
			</TabPanel>
			<TabPanel>
			</TabPanel>
		</Tabs>
	</TabPanel>
	<TabPanel>
		<h2>Downloads</h2>
		<p>Manage all your downloads in one place</p>
		<div class="grid grid-cols-3 py-4 gap-4">
			{#each Object.entries(downloads) as [name, info]}
				<Card button="Manage" description={info.site.description} title={info.site.title} icon={info.site.logo} link={""} showSwitch={false}>
					{#if info.status == "started"}
						<span class="text-sm">Waiting...</span>
						<ProgressBar progress={0} status="waiting"></ProgressBar>
					{:else if info.status == "downloading"}
						<span class="text-sm">Downloading...</span>
						<ProgressBar progress={info.progress || 0} status="loading"></ProgressBar>
					{/if}
				</Card>
			{/each}
		</div>
	</TabPanel>
</Tabs>
<Modal bind:open={openModal}></Modal>