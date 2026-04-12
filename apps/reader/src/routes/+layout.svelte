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

<div class="flex min-h-dvh flex-col">
	<Navbar />
	<main class="flex-1 bg-[#f9f9fc]">
		<div class="container">
			{@render children()}
		</div>
	</main>
</div>
