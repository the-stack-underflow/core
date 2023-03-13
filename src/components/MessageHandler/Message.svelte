<script lang="ts">
	export let type: "success" | "error" | "info" = "info";
	export let text: string;
</script>

<div class="bg-secondary rounded-lg px-6 py-4 border border-dark-blue visible">
	<p class="m-0">{text}</p>
</div>