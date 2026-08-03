import { dayjs } from "@odin-blog/shared/lib/dayjs"
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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip"
import { cn } from "#/lib/utils"
import { myPostQueries } from "../queries"
import type { Post } from "../types"
import EmptyPosts from "./empty-posts"

export default function Posts({
	...props
}: React.ComponentProps<typeof ItemGroup>) {
	const {
		data: { data: posts },
	} = useSuspenseQuery(myPostQueries.list({ limit: 3 }))

	const hasPosts = posts.length > 0

	if (!hasPosts) {
		return <EmptyPosts />
	}

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
				<div className="space-x-2">
					<Badge
						className={cn(
							postBadgeVariants({
								status: post.published ? "published" : "draft",
							}),
						)}
					>
						{post.published ? "Published" : "Draft"}
					</Badge>
					<Tooltip>
						<TooltipTrigger
							render={
								<span className="cursor-default text-muted-foreground text-xs">
									{dayjs(post.createdAt).fromNow()}
								</span>
							}
						/>
						<TooltipContent>
							<p>{dayjs(post.createdAt).format("LLL")}</p>
						</TooltipContent>
					</Tooltip>
				</div>
				<ItemTitle className="font-bold font-heading text-xl">
					{post.title}
				</ItemTitle>
				{/** biome-ignore lint/security/noDangerouslySetInnerHtml: render post content */}
				<ItemDescription dangerouslySetInnerHTML={{ __html: post.content }} />
			</ItemContent>
		</Item>
	)
}
