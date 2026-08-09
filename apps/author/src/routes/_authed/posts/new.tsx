import { createFileRoute } from "@tanstack/react-router"

import CreatePostForm from "#/features/posts/components/create-post-form"

export const Route = createFileRoute("/_authed/posts/new")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<section className="space-y-6">
			<h1 className="font-heading text-4xl">Writing a New Post</h1>
			<CreatePostForm />
		</section>
	)
}
