<script lang="ts">
	export let link: string | undefined = undefined;
	export let onClick: () => any = () => {};
</script>

<a href={link} on:click={onClick} class="rounded-lg bg-primary hover:bg-violet-100 border border-dark-blue px-2 py-2 cursor-pointer transition-colors">
	<slot></slot>
</a>