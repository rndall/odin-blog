import { createFileRoute, redirect } from "@tanstack/react-router"

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
})
