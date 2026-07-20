import { createFileRoute } from "@tanstack/react-router"

import { LoginForm } from "#/features/auth/components/login-form"
import { pageTitle } from "#/utils/page-title"

export const Route = createFileRoute("/_auth/login")({
	head: () => ({
		meta: [
			{
				title: pageTitle("Login"),
			},
		],
	}),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-4xl">
				<LoginForm />
			</div>
		</div>
	)
}
