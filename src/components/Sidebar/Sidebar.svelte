<script lang="ts">
  import { SidebarLinks } from "../../lib/Shared";
  import MixerVertical from "../Icons/MixerVertical.svelte";
  import ToggleThemeButton from "../ToggleThemeButton.svelte";
</script>

<div class="w-[80px] border-r border-r-dark-blue fixed top-0 left-0 flex flex-col items-center px-2 py-8 h-full justify-between bg-secondary">
	<div class="w-full flex flex-col items-center gap-4">
		{#each Object.entries(SidebarLinks) as [id, button]}
			<a href={button.id} class="rounded-lg p-2 transition-colors duration-200 hover:bg-primary">
				{#if typeof button.icon == "string"}
					<img src={button.icon} alt="">
				{:else}
					<svelte:component this={button.icon}></svelte:component>
				{/if}
			</a>
		{/each}
	</div>

	<div class="w-full flex flex-col items-center gap-4">
		<ToggleThemeButton></ToggleThemeButton>
		<a href="/help">
			
		</a>
		<a href="/settings">
			<MixerVertical></MixerVertical>
		</a>
	</div>
</div>