import { createFileRoute } from "@tanstack/react-router"

import EditPostForm from "#/features/posts/components/edit-post-form"
import { myPostQueries } from "#/features/posts/queries"

export const Route = createFileRoute("/_authed/posts/edit/$slug")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(myPostQueries.detail(params.slug))
	},
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="space-y-6">
			<h1 className="font-heading text-4xl">Edit Post</h1>
			<EditPostForm />
		</section>
	)
}
