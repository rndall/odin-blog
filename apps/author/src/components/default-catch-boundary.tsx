import type { ErrorComponentProps } from "@tanstack/react-router"
import {
	ErrorComponent,
	Link,
	useLocation,
	useRouter,
} from "@tanstack/react-router"
import { cn } from "#/lib/utils"
import { Button, buttonVariants } from "./ui/button"

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter()
	const isRoot = useLocation({
		select: (location) => location.pathname === "/",
	})

	console.error(error)

	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 p-4">
			<ErrorComponent error={error} />
			<div className="flex flex-wrap items-center gap-2">
				<Button
					onClick={() => {
						router.invalidate()
					}}
					className="font-extrabold uppercase"
				>
					Try Again
				</Button>
				{isRoot ? (
					<Link
						to="/"
						className={cn(
							buttonVariants({ variant: "link" }),
							"font-extrabold uppercase",
						)}
					>
						Home
					</Link>
				) : (
					<Link
						to="/"
						className={cn(
							buttonVariants({ variant: "link" }),
							"font-extrabold uppercase",
						)}
						onClick={(e) => {
							e.preventDefault()
							window.history.back()
						}}
					>
						Go Back
					</Link>
				)}
			</div>
		</div>
	)
}
