<script lang="ts">
  import type { Dataset } from "../lib/GetNewestDatasets";
  import Switch from "./Switch.svelte";
	import Modal from "./Modal.svelte";

	let openModal: (dataset: Dataset) => {};

	export let datasets: Dataset[];

	function onModalChange(active: boolean, dataset: Dataset) {
		if (active) {
			openModal(dataset)
		} else {
			// Remove dataset
		}
	}
</script>

<h1>Datasets</h1>
<div class="grid grid-cols-3 gap-4">
	{#each datasets as dataset}
	<div class="border border-slate-300 rounded-lg p-2">
		<div class="flex flex-row justify-between mb-2">
			<span class="text-sm text-slate-600">{(dataset.size / 1024 ** 2).toFixed(2)} MB</span>
			{#if dataset.installed}
			<span class="text-sm text-green-600">Installed</span>
			{/if}
		</div>
		<h2 class="m-0 text-slate-800 text-left">{dataset.name}</h2>
		<Switch active={dataset.installed} onChange={(active) => onModalChange(active, dataset)}></Switch>
	</div>
{/each}
</div>
<Modal bind:open={openModal}></Modal>
