<script lang="ts">
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>

<style>
	button {
		@apply text-slate-500 border-b-2 border-b-transparent px-1 py-2;
	}
	
	.selected {
		@apply border-b-2 border-b-dark-blue text-dark-blue;
	}
</style>