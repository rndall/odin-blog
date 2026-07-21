import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/posts/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/posts/edit"!</div>
}
