<script lang="ts">
	export let progress: number;
	export let status: "waiting" | "loading" = "loading";
	export let className: string = "";
</script>

<div class="w-full h-2 bg-secondary rounded-full overflow-hidden relative border border-dark-blue {className}">
	<div style={
		status !== "waiting" ? `width: ${progress}%;` : ""
	} class="bg-violet-600 h-[6px] rounded-full {status} inner absolute left-0"></div>
</div>


<style>
	@keyframes waiting {
		0% {
			width: 60%;
			left: -60%;
		}

		100% {
			width: 20%;
			left: 100%;
		}
	}

	.inner.waiting {
		position: absolute;
		animation: waiting 2s infinite;
		animation-timing-function: cubic-bezier(.55,.28,.41,1.15);
	}
</style>