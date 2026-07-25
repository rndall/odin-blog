import {
	MessageMultiple02Icon,
	PencilEdit02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import type { LinkComponentProps } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import type { VariantProps } from "class-variance-authority"
import type { PropsWithChildren } from "react"

import { buttonVariants } from "#/components/ui/button"
import { cn } from "#/lib/utils"

export default function QuickActions(props: React.ComponentProps<"ul">) {
	return (
		<ul {...props}>
			<li>
				<QuickAction to="/posts/new" icon={PencilEdit02Icon}>
					New Post
				</QuickAction>
			</li>
			<li>
				<QuickAction
					variant="outline"
					to="/comments"
					className="text-primary"
					icon={MessageMultiple02Icon}
				>
					Manage Comments
				</QuickAction>
			</li>
		</ul>
	)
}

interface QuickActionProps
	extends VariantProps<typeof buttonVariants>,
		PropsWithChildren {
	icon: IconSvgElement
	to: LinkComponentProps["to"]
	className?: string
}

function QuickAction({
	children,
	className,
	icon,
	to,
	...props
}: QuickActionProps) {
	return (
		<Link
			to={to}
			className={cn(
				buttonVariants({ size: "lg", ...props }),
				"h-18 w-full justify-between whitespace-normal rounded-md px-5! font-bold text-lg",
				className,
			)}
		>
			{children}
			<HugeiconsIcon
				data-icon="inline-end"
				icon={icon}
				strokeWidth={2}
				className="size-7"
			/>
		</Link>
	)
}
