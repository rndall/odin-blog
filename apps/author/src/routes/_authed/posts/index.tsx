import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createFileRoute, Link } from "@tanstack/react-router"

import { buttonVariants } from "#/components/ui/button"
import {
	DEFAULT_LIMIT,
	DEFAULT_PAGE,
	DEFAULT_SORT,
	type PostFilters,
} from "#/features/posts/api"
import PostsTable from "#/features/posts/components/posts-table"
import { myPostQueries } from "#/features/posts/queries"
import { cn } from "#/lib/utils"

export const Route = createFileRoute("/_authed/posts/")({
	validateSearch: () => ({}) as PostFilters,
	loaderDeps: ({ search: { page, limit, sort, search } }) => ({
		page,
		limit,
		sort,
		search,
	}),
	loader: async ({ context, deps: { page, limit, sort, search } }) => {
		await context.queryClient.ensureQueryData(
			myPostQueries.list({
				page: page ?? DEFAULT_PAGE,
				limit: limit ?? DEFAULT_LIMIT,
				sort: sort ?? DEFAULT_SORT,
				search,
			}),
		)
	},
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<section className="">
				<div className="flex items-center justify-between">
					<div className="space-y-3">
						<h1 className="font-heading text-4xl text-primary">Manage Posts</h1>
						<p>Curate and publish your editorial content.</p>
					</div>
					<Link
						to="/posts/new"
						className={cn(
							buttonVariants({ size: "lg" }),
							"h-15 rounded-md px-6! font-bold text-lg",
						)}
					>
						<HugeiconsIcon
							data-icon="inline-start"
							icon={PlusSignIcon}
							className="size-3! text-white"
							strokeWidth={2}
						/>
						New Post
					</Link>
				</div>

				<div className="py-10">
					<PostsTable />
				</div>
			</section>
		</div>
	)
}
