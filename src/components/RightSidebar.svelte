<script lang="ts">
	export let structure: {[key: string]: string};
</script>

<div class="rounded-lg w-[400px] sticky top-[100px] h-[85vh] px-4 py-4 flex flex-col">
	{#each Object.keys(structure) as key}
		<a href="/docs/javascript/{key}" class="underline">{key}</a>
	{/each}
</div>