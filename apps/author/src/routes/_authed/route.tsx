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
			<main className="container mx-auto flex-1 bg-[#f9f9fc] px-4 py-8 md:px-12">
				<SidebarTrigger className="absolute top-1 left-1 md:hidden" />
				<Outlet />
			</main>
		</SidebarProvider>
	)
}
