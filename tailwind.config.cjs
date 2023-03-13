/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: "#f5f3ed",
				secondary: "#ffffff",
				"dark-blue": "#131429",
				"pastel-violet": "#9381ff",
				"pastel-green": "#60d394",
				"pastel-red": "#ee6055",
				"pastel-brown": "#f1e2d7"
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
