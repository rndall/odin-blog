<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import { auth } from '$lib/auth.svelte'
	import { Button } from '$lib/components/ui/button'
</script>

<header class="grid grid-cols-3 items-center bg-[#fefefe]">
	<div class="flex justify-start">
		<a href={resolve('/')} class="my-2 font-serif text-3xl text-primary italic"
			>The Digital Atelier</a
		>
	</div>

	<nav class="flex justify-center">
		<ul
			class="flex font-serif **:text-base **:text-muted-foreground **:decoration-2 **:underline-offset-8 **:aria-current:text-primary **:aria-current:underline"
		>
			<li>
				<Button aria-current={page.url.pathname === '/'} href={resolve('/')} variant="link"
					>Essays</Button
				>
			</li>
			<li>
				<Button
					aria-current={page.url.pathname.includes('/archive')}
					href={resolve('/archive')}
					variant="link">Archive</Button
				>
			</li>
		</ul>
	</nav>

	<div class="flex justify-end gap-4">
		{#if auth.isAuthenticated}
			<Button onclick={() => auth.logout()} class="rounded-sm">Log out</Button>
		{:else}
			<Button href={resolve('/sign-in')} class="rounded-sm">Sign In</Button>
		{/if}
	</div>
</header>
