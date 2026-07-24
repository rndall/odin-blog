import { useSuspenseQuery } from "@tanstack/react-query"
import { Badge } from "#/components/ui/badge"
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "#/components/ui/item"
import { myPostQueries } from "../queries"
import type { Post } from "../types"

export function Posts({ ...props }: React.ComponentProps<typeof ItemGroup>) {
	const {
		data: { data: posts },
	} = useSuspenseQuery(myPostQueries.list({ limit: 3 }))

	return (
		<ItemGroup {...props}>
			{posts.map((post) => (
				<PostItem {...post} key={post.id} />
			))}
		</ItemGroup>
	)
}

const POST_BADGE_VARIANTS = {
	published: "bg-primary/10 text-primary",
	draft: "bg-tertiary/10 text-tertiary",
}

function PostItem(post: Post) {
	return (
		<Item variant="muted">
			<ItemContent>
				<div className="flex items-center gap-2">
					<Badge
						className={`rounded-sm font-bold uppercase ${post.published ? POST_BADGE_VARIANTS.published : POST_BADGE_VARIANTS.draft}`}
					>
						{post.published ? "Published" : "Draft"}
					</Badge>
					<p className="text-muted-foreground text-xs">
						{new Date(post.createdAt).toLocaleDateString()}
					</p>
				</div>
				<ItemTitle className="font-bold font-heading text-xl">
					{post.title}
				</ItemTitle>
				<ItemDescription>{post.content.slice(0, 100)}</ItemDescription>
			</ItemContent>
		</Item>
	)
}
