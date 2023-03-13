<script lang="ts">
  import Switch from "./Switch.svelte";


	export let icon: string | null = null;
	export let button: string;
	export let link: string;
	export let title: string;
	export let description: string;
	export let showSwitch: boolean = true;
	export let switchToggled: boolean = false;
	export let onToggleSwitch: (active: boolean) => any = () => {};
</script>

<div class="rounded-lg border border-dark-blue bg-secondary h-fit">
	<div class="p-6 flex flex-row justify-between">
		<div class="flex gap-6 items-center">
			{#if icon}
			<img src={icon} alt="" class="rounded-lg w-10 h-10">
			{/if}
			<h4 class="text-dark-blue text-lg font-medium">{title}</h4>
		</div>
		{#if showSwitch}
		<Switch onChange={onToggleSwitch} active={switchToggled}></Switch>
		{/if}
	</div>
	<div class="px-6 py-4">
		<p class="text-base text-dark-blue">{description}</p>
		<slot></slot>
	</div>
	<a href={link} class="border-t border-t-dark-blue text-right py-4 block px-4 w-full rounded-br-lg rounded-bl-lg transition-colors hover:bg-violet-50">
		{button}
	</a>
</div>