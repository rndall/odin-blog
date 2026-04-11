<script lang="ts">
	import { Search01Icon } from '@hugeicons/core-free-icons'
	import { HugeiconsIcon } from '@hugeicons/svelte'
	import { resolve } from '$app/paths'
	import { page } from '$app/state'
	import { Button } from '$lib/components/ui/button'
</script>

<header class="container grid grid-cols-3 items-center bg-[#fefefe] py-4">
	<div class="flex justify-start">
		<a href={resolve('/')} class="my-2 font-serif text-3xl font-bold text-primary italic"
			>The Digital Atelier</a
		>
	</div>

	<nav class="flex justify-center">
		<ul
			class="flex font-serif **:text-base **:font-bold **:text-muted-foreground **:decoration-2 **:underline-offset-8 **:aria-current:text-primary **:aria-current:underline"
		>
			<li>
				<Button aria-current={page.url.pathname === '/'} href={resolve('/')} variant="link"
					>Essays</Button
				>
			</li>
			<li>
				<Button
					aria-current={page.url.pathname === '/archive'}
					href={resolve('/archive')}
					variant="link">Archive</Button
				>
			</li>
		</ul>
	</nav>

	<div class="flex justify-end gap-4">
		<Button size="icon" variant="ghost" aria-label="search">
			<HugeiconsIcon class="text-primary" strokeWidth={3} icon={Search01Icon} />
		</Button>
		<Button class="rounded-sm">Sign In</Button>
	</div>
</header>
