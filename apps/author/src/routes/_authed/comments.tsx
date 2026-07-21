import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/comments")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_authed/comments"!</div>
}
