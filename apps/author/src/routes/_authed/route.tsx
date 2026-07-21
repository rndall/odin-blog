import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { AppSidebar } from "#/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar"
import { authQueries } from "#/features/auth/queries"

export const Route = createFileRoute("/_authed")({
	beforeLoad: async ({ context, location }) => {
		const user = await context.queryClient
			.ensureQueryData(authQueries.me())
			.catch(() => null)

		if (!user) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			})
		}
		return { user }
	},
	component: Layout,
})

function Layout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger className="md:hidden" />
				<Outlet />
			</main>
		</SidebarProvider>
	)
}
