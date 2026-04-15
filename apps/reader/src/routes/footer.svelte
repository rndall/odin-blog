<script lang="ts">
	import { resolve } from '$app/paths'

	interface Props {
		showFooterTitle?: boolean
	}

	let { showFooterTitle = true }: Props = $props()
</script>

<footer class="container my-10 space-y-7 text-center">
	{#if showFooterTitle}
		<p class="font-serif text-xl text-primary italic">The Digital Atelier</p>
	{/if}
	<nav>
		<ul
			class="flex justify-center gap-8 text-sm font-medium tracking-widest text-muted-foreground uppercase"
		>
			<li><a href={resolve('/')}>Privacy Policy</a></li>
			<li><a href={resolve('/')}>Terms of Service</a></li>
			<li><a href={resolve('/')}>RSS Feed</a></li>
			<li><a href={resolve('/')}>Contact</a></li>
		</ul>
	</nav>
	<p class="text-sm font-medium tracking-wider text-muted-foreground uppercase">
		&copy; {new Date().getFullYear()}. The Digital Atelier. Crafter for Readers.
	</p>
</footer>
