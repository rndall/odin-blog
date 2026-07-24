import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense } from "react"
import { Button, buttonVariants } from "#/components/ui/button"
import { useAuth } from "#/features/auth/hooks/useAuth"
import { Cards } from "#/features/dashboard/components/cards"
import { CardsSkeleton } from "#/features/dashboard/components/cards-skeleton"
import { dashboardQueries } from "#/features/dashboard/queries"
import { Posts } from "#/features/posts/components/posts"
import { myPostQueries } from "#/features/posts/queries"
import { cn } from "#/lib/utils"

export const Route = createFileRoute("/_authed/")({
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData(dashboardQueries.metrics())
		context.queryClient.ensureQueryData(myPostQueries.list({ limit: 3 }))
	},
	component: Home,
})

function Home() {
	const { logout } = useAuth()

	return (
		<div className="space-y-18">
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
			<div className="grid">
				<section></section>
				<div>
					<section className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="font-bold font-heading text-3xl">Recent Posts</h2>
							<Link
								className={cn(buttonVariants({ variant: "link" }), "text-lg")}
								to="/posts"
							>
								View All
								<HugeiconsIcon
									data-icon="inline-end"
									icon={ArrowRight02Icon}
									strokeWidth={2}
									className="size-5"
								/>
							</Link>
						</div>
						<Posts />
					</section>
				</div>
			</div>
			<Button onClick={logout} type="button">
				Logout
			</Button>
		</div>
	)
}
