import { Link } from "@tanstack/react-router"

import { cn } from "#/lib/utils"
import { Button, buttonVariants } from "./ui/button"

export function NotFound({ children }: { children?: React.ReactNode }) {
	return (
		<div className="space-y-2 p-2">
			<div>
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
			<p className="flex flex-wrap items-center gap-2">
				<Button
					onClick={() => window.history.back()}
					className="font-black uppercase"
				>
					Go back
				</Button>
				<Link
					to="/"
					className={cn(
						buttonVariants({ variant: "link" }),
						"font-black uppercase",
					)}
				>
					Start Over
				</Link>
			</p>
		</div>
	)
}
