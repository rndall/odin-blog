<script lang="ts">
	import type { PostComment } from '@odin-blog/shared/post-comments'
	import * as Item from '$lib/components/ui/item'
	import { dayjs } from '$lib/dayjs'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<div class="mx-auto flex max-w-2xl flex-col gap-16">
	<article class="flex flex-col gap-12">
		<div class="my-6 flex flex-col items-center gap-4 text-center">
			<h1 class="font-serif text-5xl italic">{data.post.title}</h1>
			<div
				class="flex uppercase [&>*:not(:last-child)]:after:mx-2 [&>*:not(:last-child)]:after:content-['•']"
			>
				<p class="font-bold">{data.post.author.fullName}</p>
				<p>{dayjs(data.post.publishedAt).format('LL')}</p>
			</div>
		</div>

		<div>
			{@html data.post.content}
		</div>
	</article>

	<Item.Root>
		<Item.Content>
			<Item.Title class="font-sans font-bold">{data.post.author.fullName}</Item.Title>
			<Item.Description>{data.post.author.bio}</Item.Description>
		</Item.Content>
	</Item.Root>

	<section class="flex flex-col gap-12">
		<h2 class="font-serif text-3xl italic">Dialogue</h2>
		{#snippet commentItem(comment: PostComment)}
			<Item.Root class="rounded-md bg-[#f3f3f6] py-6">
				<Item.Content>
					<Item.Title class="font-sans font-bold text-primary">{comment.user.fullName}</Item.Title>
					<Item.Description class="text-black">{comment.content}</Item.Description>
				</Item.Content>
				<Item.Content class="self-start">
					<Item.Description>{dayjs(comment.updatedAt).fromNow()}</Item.Description>
				</Item.Content>
			</Item.Root>
		{/snippet}

		<Item.Group class="gap-12">
			{#each data.comments as comment}
				{@render commentItem(comment)}
			{/each}
		</Item.Group>
	</section>
</div>
