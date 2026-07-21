import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { Button } from "#/components/ui/button"
import { useAuth } from "#/features/auth/hooks/useAuth"
import { Cards } from "#/features/dashboard/components/cards"
import { CardsSkeleton } from "#/features/dashboard/components/cards-skeleton"
import { dashboardQueries } from "#/features/dashboard/queries"

export const Route = createFileRoute("/_authed/")({
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData(dashboardQueries.metrics())
	},
	component: Home,
})

function Home() {
	const { logout } = useAuth()

	return (
		<div className="space-y-6">
			<section className="space-y-4">
				<h1 className="font-bold font-heading text-5xl">Overview</h1>
				<p className="text-lg text-primary">
					A high-level summary of your editorial platform's current state and
					recent activities.
				</p>
			</section>
			<section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					<Cards />
				</Suspense>
			</section>
			<Button onClick={logout} type="button">
				Logout
			</Button>
		</div>
	)
}
