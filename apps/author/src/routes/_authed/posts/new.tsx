import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/posts/new")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/_authed/posts/new"!</div>
}
