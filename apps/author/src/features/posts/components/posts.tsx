import { useSuspenseQuery } from "@tanstack/react-query"
import { cva } from "class-variance-authority"
import { Badge } from "#/components/ui/badge"
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "#/components/ui/item"
import { cn } from "#/lib/utils"
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

const postBadgeVariants = cva("rounded-sm font-bold uppercase", {
	variants: {
		status: {
			published: "bg-primary/10 text-primary",
			draft: "bg-tertiary/10 text-tertiary",
		},
	},
})

function PostItem(post: Post) {
	return (
		<Item className="bg-white" variant="muted">
			<ItemContent>
				<div className="flex items-center gap-2">
					<Badge
						className={cn(
							postBadgeVariants({
								status: post.published ? "published" : "draft",
							}),
						)}
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
				<ItemDescription>{post.content}</ItemDescription>
			</ItemContent>
		</Item>
	)
}
