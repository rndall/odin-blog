<script lang="ts">
	import { dayjs } from '@odin-blog/shared/lib/dayjs.ts'
	import type { PostComment } from '@odin-blog/shared/types/post-comments.ts'
	import { auth } from '#lib/auth.svelte.js'
	import * as Item from '#lib/components/ui/item/index.js'
	import type { PageProps } from './$types'
	import CommentForm from './comment-form.svelte'

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

		<div class="post-content">
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

		{#if auth.isAuthenticated}
			<CommentForm />
		{/if}

		{#snippet commentItem(comment: PostComment)}
			<Item.Root class="rounded-md bg-[#f3f3f6] py-6">
				<Item.Content>
					<Item.Title class="font-sans font-bold text-primary">{comment.user.fullName}</Item.Title>
					<Item.Description class="line-clamp-none text-black">{comment.content}</Item.Description>
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

<style>
	/* Styles the raw html emitted by the tinymce editor on the author app. */
	.post-content {
		font-family: var(--font-heading);
		font-size: 1.125rem;
		line-height: 1.75;
		text-wrap: pretty;
		overflow-wrap: break-word;
	}

	.post-content :global(*:first-child) {
		margin-block-start: 0;
	}

	.post-content :global(*:last-child) {
		margin-block-end: 0;
	}

	/* Block rhythm: spacing comes from the top margin only, so no margin ever collapses away. */
	.post-content :global(p),
	.post-content :global(ul),
	.post-content :global(ol),
	.post-content :global(dl),
	.post-content :global(blockquote),
	.post-content :global(pre),
	.post-content :global(table),
	.post-content :global(figure),
	.post-content :global(h1),
	.post-content :global(h2),
	.post-content :global(h3),
	.post-content :global(h4),
	.post-content :global(h5),
	.post-content :global(h6) {
		margin-block: 1.25em;
	}

	.post-content :global(p) {
		text-align: justify;
		text-align-last: start;
		hyphens: auto;
	}

	/* Headings */
	.post-content :global(h1),
	.post-content :global(h2),
	.post-content :global(h3),
	.post-content :global(h4),
	.post-content :global(h5),
	.post-content :global(h6) {
		font-family: var(--font-sans);
		font-weight: 700;
		line-height: 1.15;
		letter-spacing: -0.02em;
		scroll-margin-block-start: 2rem;
	}

	.post-content :global(h1) {
		font-size: 2.25rem;
	}

	.post-content :global(h2) {
		font-size: 1.75rem;
	}

	.post-content :global(h3) {
		font-size: 1.375rem;
	}

	.post-content :global(h4) {
		font-size: 1.125rem;
	}

	.post-content :global(h5),
	.post-content :global(h6) {
		font-size: 0.8125rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted-foreground);
	}

	.post-content :global(h2) {
		padding-block-end: 0.35em;
		border-block-end: 1px solid var(--border);
	}

	/* Inline */
	.post-content :global(a) {
		color: var(--primary);
		text-decoration: underline;
		text-decoration-color: color-mix(in oklab, var(--primary) 35%, transparent);
		text-underline-offset: 0.2em;
		transition: text-decoration-color 150ms;
	}

	.post-content :global(a:hover) {
		text-decoration-color: var(--primary);
	}

	.post-content :global(strong) {
		font-weight: 700;
	}

	.post-content :global(s),
	.post-content :global(del) {
		text-decoration-thickness: 1px;
		color: var(--muted-foreground);
	}

	.post-content :global(mark) {
		background-color: color-mix(in oklab, var(--tertiary) 20%, transparent);
		color: inherit;
		padding-inline: 0.15em;
	}

	.post-content :global(small) {
		font-size: 0.875em;
		color: var(--muted-foreground);
	}

	.post-content :global(sub),
	.post-content :global(sup) {
		font-size: 0.75em;
		line-height: 0;
	}

	.post-content :global(code),
	.post-content :global(kbd),
	.post-content :global(samp),
	.post-content :global(pre) {
		font-family: ui-monospace, 'SFMono-Regular', 'Menlo', 'Consolas', monospace;
	}

	.post-content :global(:not(pre) > code) {
		font-size: 0.85em;
		background-color: var(--muted);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding-inline: 0.3em;
		padding-block: 0.1em;
	}

	.post-content :global(pre) {
		font-size: 0.875rem;
		line-height: 1.6;
		overflow-x: auto;
		background-color: var(--muted);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 1rem;
		tab-size: 2;
	}

	.post-content :global(pre code) {
		background: none;
		border: 0;
		padding: 0;
		font-size: inherit;
	}

	/* Lists */
	.post-content :global(ul),
	.post-content :global(ol) {
		padding-inline-start: 1.5em;
	}

	.post-content :global(ul) {
		list-style: disc;
	}

	.post-content :global(ol) {
		list-style: decimal;
	}

	.post-content :global(ul ul) {
		list-style: circle;
	}

	.post-content :global(ul ul ul) {
		list-style: square;
	}

	.post-content :global(li) {
		margin-block: 0.35em;
		padding-inline-start: 0.25em;
	}

	.post-content :global(li > ul),
	.post-content :global(li > ol) {
		margin-block: 0.35em;
	}

	.post-content :global(li::marker) {
		color: var(--muted-foreground);
	}

	.post-content :global(dt) {
		font-family: var(--font-sans);
		font-weight: 700;
	}

	.post-content :global(dd) {
		padding-inline-start: 1.5em;
		color: var(--muted-foreground);
	}

	/* Quotes */
	.post-content :global(blockquote) {
		font-style: italic;
		font-size: 1.25em;
		line-height: 1.5;
		text-indent: -0.4em;
		border-inline-start: 2px solid var(--primary);
		padding-inline-start: 1rem;
		color: var(--muted-foreground);
	}

	.post-content :global(blockquote p) {
		text-align: start;
		text-indent: 0;
	}

	.post-content :global(blockquote cite),
	.post-content :global(figcaption) {
		display: block;
		margin-block-start: 0.75em;
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		font-style: normal;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted-foreground);
	}

	.post-content :global(blockquote cite::before) {
		content: '— ';
	}

	/* Media */
	.post-content :global(img),
	.post-content :global(video),
	.post-content :global(iframe),
	.post-content :global(embed) {
		display: block;
		max-width: 100%;
		height: auto;
		margin-inline: auto;
	}

	.post-content :global(img),
	.post-content :global(video) {
		border-radius: var(--radius-md);
	}

	.post-content :global(figure) {
		margin-inline: 0;
	}

	.post-content :global(figcaption) {
		text-align: center;
		text-indent: 0;
	}

	/* Tables */
	.post-content :global(table) {
		display: block;
		width: 100%;
		overflow-x: auto;
		border-collapse: collapse;
		font-family: var(--font-sans);
		font-size: 0.875rem;
	}

	.post-content :global(th),
	.post-content :global(td) {
		border: 1px solid var(--border);
		padding: 0.5rem 0.75rem;
		text-align: start;
		vertical-align: top;
	}

	.post-content :global(th) {
		background-color: var(--muted);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.post-content :global(tbody tr:nth-child(even)) {
		background-color: color-mix(in oklab, var(--muted) 50%, transparent);
	}

	/* Misc */
	.post-content :global(hr) {
		border: 0;
		border-block-start: 1px solid var(--border);
		margin-block: 2.5em;
		margin-inline: auto;
		width: 25%;
	}

	.post-content :global(iframe) {
		aspect-ratio: 16 / 9;
		width: 100%;
		border: 0;
	}

	@media (width < 40rem) {
		.post-content {
			font-size: 1.0625rem;
		}

		.post-content :global(h1) {
			font-size: 1.875rem;
		}

		.post-content :global(h2) {
			font-size: 1.5rem;
		}

		.post-content :global(blockquote) {
			font-size: 1.125rem;
			text-indent: 0;
		}
	}
</style>
