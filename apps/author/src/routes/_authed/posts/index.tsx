import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

export const Route = createFileRoute("/_authed/posts/")({
	validateSearch: z.object({
		status: z.enum(["draft", "published"]).optional(),
	}),
	component: RouteComponent,
})

function RouteComponent() {
	const search = Route.useSearch()

	return (
		<div>
			Hello "/_authed/posts/index{search.status && `?status=${search.status}`}
			"!
		</div>
	)
}
