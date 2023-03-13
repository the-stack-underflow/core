<script lang="ts">
	export let message: string;
</script>

{#if message}
<div class="fixed bg-secondary rounded-lg px-6 py-4 bottom-8 left-[120px] border border-dark-blue visible">
	<p class="m-0">{message}</p>
</div>
{/if}

<style lang="scss">
	div {
		&.visible {
			animation: from-left 0.6s forwards;
		}

		&.not-visible {
			animation: to-left 0.6s forwards;
		}
	}

	@keyframes to-left {
		0% {
			visibility: visible;
			left: 30px;
		}

		100% {
			left: -100%;
			visibility: hidden;
		}
	}

	@keyframes from-left {
		0% {
			left: -100%;
		}

		100% {
			left: 30px;
		}
	}
</style>