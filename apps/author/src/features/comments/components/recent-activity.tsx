import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { cva } from "class-variance-authority"
import { Avatar, AvatarFallback } from "#/components/ui/avatar"
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "#/components/ui/item"
import { cn } from "#/lib/utils"
import { commentQueries } from "../queries"
import type { Comment } from "../types"

export default function RecentActivity() {
	const {
		data: { pages },
	} = useSuspenseInfiniteQuery(commentQueries.list({ limit: 2 }))

	return (
		<>
			{pages.map((page) => (
				<ItemGroup className="gap-2" key={page.nextCursor}>
					{page.comments.map((comment, index) => (
						<li key={comment.id}>
							<ActivityItem {...comment} index={index} />
						</li>
					))}
				</ItemGroup>
			))}
		</>
	)
}

const avatarVariants = cva("rounded-lg uppercase", {
	variants: {
		parity: {
			even: "bg-primary/10 text-primary",
			odd: "bg-tertiary/10 text-tertiary",
		},
	},
})

interface ActivityItemProps extends Comment {
	index: number
}

function ActivityItem({ index, ...comment }: ActivityItemProps) {
	const parity = index % 2 === 0 ? "even" : "odd"

	return (
		<Item>
			<ItemMedia>
				<Avatar size="lg" className="after:rounded-lg">
					<AvatarFallback className={cn(avatarVariants({ parity }))}>
						{comment.user.fullName[0]}
					</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent>
				<ItemTitle className="line-clamp-2 w-auto">
					<span className="font-bold">{comment.user.fullName}</span> commented
					on <span className="italic">{comment.post.title}</span>
				</ItemTitle>
				<div className="rounded-xs bg-white p-4">
					<ItemDescription className="line-clamp-3 text-primary before:content-['“'] after:content-['”']">
						{comment.content}
					</ItemDescription>
				</div>
			</ItemContent>
		</Item>
	)
}
