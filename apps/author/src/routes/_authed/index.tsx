import { createFileRoute } from "@tanstack/react-router"

import { Button } from "#/components/ui/button"
import { useAuth } from "#/features/auth/hooks/useAuth"

export const Route = createFileRoute("/_authed/")({
	component: Home,
})

function Home() {
	const { logout } = useAuth()

	return (
		<div className="p-8">
			<h1 className="font-bold text-4xl">Welcome to TanStack Start</h1>
			<p className="mt-4 text-lg">
				Edit <code>src/routes/_authed/index.tsx</code> to get started.
			</p>
			<Button onClick={logout} type="button">
				Logout
			</Button>
		</div>
	)
}
