<script lang="ts">
	export let active: boolean = false;
	export let onChange: (active: boolean) => any = () => {};
</script>

<div>
	<input
		type="checkbox"
		role="switch"
		id="flexSwitchCheckDefault"
		checked={active}
		on:change={() => {
			active = !active;
			onChange(active)
		}} />
</div>

<style>
	input {
		@apply mr-2 h-6 w-12 appearance-none rounded-full bg-primary outline-none border border-[rgba(0,0,0,0.1)];
	}

	input:hover {
		@apply cursor-pointer;
	}

	input:checked:focus {
		@apply border-dark-blue bg-dark-blue;
	}

	input:checked {
		@apply bg-dark-blue;
	}

	input:focus::after {
		@apply absolute z-[1] block rounded-full content-[''];
	}

	input:checked::after {
		@apply absolute z-[2] ml-[26px] rounded-full border-none bg-secondary shadow-lg transition-[background-color_0.2s,transform_0.2s] content-[''];
	}

	input::after {
		@apply absolute z-[2] ml-[2px] mt-[2px] h-[18px] w-[18px] rounded-full border-none bg-white shadow-[0px_0px_1px_1px_rgba(0,0,0,0.2)] transition-[background-color_0.2s,transform_0.2s] content-[''];
	}
</style>