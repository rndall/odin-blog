<script lang="ts">
	import { dayjs } from '@odin-blog/shared/lib/dayjs'
	import { resolve } from '$app/paths'
	import { createApi } from '$lib/api'
	import * as Item from '$lib/components/ui/item'
	import Spinner from '$lib/components/ui/spinner/spinner.svelte'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import type { Post } from '$lib/types/posts'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	let posts = $derived(data.data.posts)

	let archive = $derived(
		posts.reduce<Record<string, Post[]>>((acc, curr) => {
			const year = new Date(curr.publishedAt).getFullYear()

			if (!acc[year]) {
				acc[year] = []
			}

			acc[year].push(curr)

			return acc
		}, {})
	)
	let nextCursor = $derived(data.data.nextCursor)
	let isLoading = $state(false)

	let sentinel: HTMLDivElement

	async function loadMore() {
		if (isLoading || !nextCursor) return
		isLoading = true
		const api = createApi(fetch)

		try {
			const data = await api.posts.list({ cursor: nextCursor })

			posts = [...posts, ...data.posts]
			nextCursor = data.nextCursor
		} catch (error) {
			console.error('Failed to load more posts:', error)
		} finally {
			isLoading = false
		}
	}

	$effect(() => {
		if (!sentinel) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && nextCursor && !isLoading) {
					loadMore()
				}
			},
			{ rootMargin: '200px' }
		)

		observer.observe(sentinel)

		return () => {
			if (sentinel) observer.unobserve(sentinel)
		}
	})

	let sortedYears = $derived(Object.keys(archive).sort((a, b) => Number(b) - Number(a)))
</script>

<div class="my-8 flex flex-col gap-12">
	<section>
		<h1 class="font-serif text-6xl text-primary">Archive</h1>
		<p class="text-muted-foreground md:max-w-2/3">
			A chronological index of inquiries, meditations, and documented crafts curated since the
			inception of the studio.
		</p>
	</section>

	<section class="flex flex-col gap-12">
		{#snippet postArchive(post: Post)}
			<li>
				<a class="group" href={resolve(`/archive/${post.slug}`)}>
					<Item.Root class="gap-1 p-0">
						<Item.Header>
							<Tooltip.Root>
								<Tooltip.Trigger class="cursor-pointer">
									<p class="text-secondary">{dayjs(post.publishedAt).format('MMMM DD')}</p>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>{dayjs(post.publishedAt).format('LLL')}</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Item.Header>
						<Item.Content>
							<Item.Title class="line-clamp-2 text-3xl font-normal group-hover:underline"
								>{post.title}
							</Item.Title>
						</Item.Content>
					</Item.Root>
				</a>
			</li>
		{/snippet}

		{#each sortedYears as year}
			<section class="grid grid-cols-[max-content_1fr] gap-16">
				<h2 class="font-serif text-xl text-tertiary italic">{year}</h2>
				<ul class="flex flex-col gap-5">
					{#each archive[year] as post}
						{@render postArchive(post)}
					{/each}
				</ul>
			</section>
		{/each}

		<div bind:this={sentinel}>
			{#if true && nextCursor}
				<Spinner class="mx-auto size-8" />
			{/if}
		</div>
	</section>
</div>
