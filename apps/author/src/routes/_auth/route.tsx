import { createFileRoute, redirect } from "@tanstack/react-router"
import { z } from "zod"
import { authQueries } from "#/features/auth/queries"

export const Route = createFileRoute("/_auth")({
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	beforeLoad: async ({ context, search }) => {
		const token = localStorage.getItem("token")

		if (!token) return

		const user = await context.queryClient
			.ensureQueryData(authQueries.me())
			.catch(() => null)

		if (user) {
			throw redirect({
				to: search.redirect ?? "/",
			})
		}
		return { user }
	},
})
