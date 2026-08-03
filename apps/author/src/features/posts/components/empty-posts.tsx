import { LicenseIcon } from "@hugeicons/core-free-icons"
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

export default function EmptyPosts() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<HugeiconsIcon icon={LicenseIcon} />
				</EmptyMedia>
				<EmptyTitle>No Posts Yet</EmptyTitle>
				<EmptyDescription>
					You haven't created any posts yet. Get started by creating your first
					post.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Link to="/posts/new" className={cn(buttonVariants())}>
					Create Post
				</Link>
			</EmptyContent>
		</Empty>
	)
}
