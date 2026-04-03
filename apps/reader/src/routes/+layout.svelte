<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import Navbar from './navbar.svelte'

	let { children } = $props()
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar />
<main class="container">
	{@render children()}
</main>
