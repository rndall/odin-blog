import { MessageMultiple02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"

import { buttonVariants } from "#/components/ui/button"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "#/components/ui/empty"
import { cn } from "#/lib/utils"

export default function EmptyComments() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<HugeiconsIcon icon={MessageMultiple02Icon} />
				</EmptyMedia>
				<EmptyTitle>No Comments Yet</EmptyTitle>
				<EmptyDescription>You don't have any comments yet.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Link
					to="/posts/new"
					className={cn(buttonVariants({ variant: "default" }))}
				>
					Create a Post
				</Link>
			</EmptyContent>
		</Empty>
	)
}
