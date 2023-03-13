<script>
	import { onMount } from "svelte";
	let isDarkMode = false;

onMount(() => {
	if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.classList.add('dark')
		isDarkMode = true;
	} else {
		document.documentElement.classList.remove('dark')
		isDarkMode = false;
	}
})

function toggleDarkMode() {
	isDarkMode = !isDarkMode
	if (isDarkMode) {
		document.documentElement.classList.add('dark')
		localStorage.setItem("theme", "dark")
	} else {
		document.documentElement.classList.remove('dark')
		localStorage.setItem("theme", "light")
	}
}
</script>

<a on:click={toggleDarkMode}>
			
</a>