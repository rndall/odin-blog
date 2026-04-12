<script lang="ts">
	import type { Post } from '@odin-blog/shared/posts'
	import * as Card from '$lib/components/ui/card'
	import * as Item from '$lib/components/ui/item'
	import { Separator } from '$lib/components/ui/separator'
	import { dayjs } from '$lib/dayjs'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const firstPost = $derived(data.posts[0])
	const firstSentence = $derived(
		firstPost.content.split(/[.!?]/)[0] + (firstPost.content.match(/[.!?]/)?.[0] || '.')
	)

	const nextThreePosts = $derived(data.posts.slice(1, 4))
	const remainingPosts = $derived(data.posts.slice(4))
</script>

<div class="flex flex-col gap-10 py-4 *:my-10">
	<section>
		<Card.Root class="mx-auto max-w-2xl rounded-sm px-10 py-12 text-center shadow-2xs ring-0">
			<Card.Header>
				<Card.Title class="text-6xl font-normal italic">
					{firstPost.title}
				</Card.Title>
			</Card.Header>
			<Card.Content>
				<p class="text-lg font-medium text-muted-foreground">
					{firstSentence}
				</p>
			</Card.Content>
			<Card.Footer class="flex flex-col gap-3">
				<p class="font-bold">{firstPost.author.fullName}</p>
				<p class="font-medium text-muted-foreground uppercase">
					{dayjs(firstPost.publishedAt).format('LL')}
				</p>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#snippet postCard(post: Post)}
			<Card.Root
				class="bg-transparent shadow-none ring-0 transition hover:translate-y-4 hover:bg-secondary-foreground/5"
			>
				<Card.Header>
					<Card.Title class="text-3xl">
						{post.title}
					</Card.Title>
				</Card.Header>
				<Card.Content class="line-clamp-4 flex-1 text-muted-foreground">
					<p>{post.content}</p>
				</Card.Content>
				<div class="px-6">
					<Separator />
				</div>
				<Card.Footer class="justify-between text-muted-foreground">
					<p class="font-medium uppercase">{post.author.fullName}</p>
					{#if dayjs().isSame(post.publishedAt, 'year')}
						<p>{dayjs(post.publishedAt).format('D MMM')}</p>
					{:else}
						<p>{dayjs(post.publishedAt).format('D MMM YYYY')}</p>
					{/if}
				</Card.Footer>
			</Card.Root>
		{/snippet}

		{#each nextThreePosts as post}
			{@render postCard(post)}
		{/each}
	</section>

	<section class="mx-auto w-full max-w-5xl">
		{#snippet postCard(post: Post)}
			<Item.Root>
				<Item.Header class="font-semibold text-muted-foreground uppercase">
					{#if dayjs().isSame(post.publishedAt, 'year')}
						<p>{dayjs(post.publishedAt).format('MMM D')}</p>
					{:else}
						<p>{dayjs(post.publishedAt).format('MMM D YYYY')}</p>
					{/if}
				</Item.Header>
				<Item.Content>
					<Item.Title class="text-2xl font-normal">
						{post.title}
					</Item.Title>
					<Item.Description class="line-clamp-1">
						<p>{post.content}</p>
					</Item.Description>
				</Item.Content>
			</Item.Root>
		{/snippet}

		<Item.Group class="grid grid-cols-1 sm:grid-cols-2">
			{#each remainingPosts as post}
				{@render postCard(post)}
			{/each}
		</Item.Group>
	</section>
</div>
