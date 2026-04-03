<script lang="ts">
	import './layout.css'
	import { page } from '$app/state'
	import favicon from '$lib/assets/favicon.svg'
	import Navbar from './navbar.svelte'

	const pageTitle = $derived(page.data.title)
	const siteTitle = 'The Digital Atelier'

	let { children } = $props()
</script>

<svelte:head>
	<title>{pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle}</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<main class="container">
	{@render children()}
</main>
