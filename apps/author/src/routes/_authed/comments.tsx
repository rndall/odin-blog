import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"

import CommentsList from "#/features/comments/components/comments-list"
import CommentsListSkeleton from "#/features/comments/components/comments-list-skeleton"
import { commentQueries } from "#/features/comments/queries"

export const Route = createFileRoute("/_authed/comments")({
	loader: async ({ context }) => {
		context.queryClient.ensureInfiniteQueryData(commentQueries.list())
	},
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="space-y-12">
			<div className="space-y-3">
				<h1 className="font-heading text-4xl text-primary">
					Community Discourse
				</h1>
				<p>
					Review and moderate the latest discussions happening across your
					published articles. Foster a thoughtful and respectful environment.
				</p>
			</div>

			<Suspense fallback={<CommentsListSkeleton />}>
				<CommentsList />
			</Suspense>
		</section>
	)
}
