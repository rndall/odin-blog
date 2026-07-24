import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"

import { cn } from "#/lib/utils"
import type { NavItem } from "#/types/nav"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "./ui/sidebar"

interface NavProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
	items: NavItem[]
}

export function Nav({ items, ...props }: NavProps) {
	const { open } = useSidebar()

	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu className={cn(!open && "gap-2")}>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								className="hover:font-bold hover:text-primary active:text-primary data-active:font-bold data-active:text-primary"
								size="lg"
								render={
									<Link
										to={item.to}
										search={item.search}
										className="text-primary"
										activeOptions={{ exact: true }}
										activeProps={{
											"data-active": true,
										}}
									>
										<div className="flex aspect-square size-8 items-center justify-center">
											<HugeiconsIcon
												icon={item.icon}
												className="size-5!"
												strokeWidth={2}
											/>
										</div>
										<span>{item.title}</span>
									</Link>
								}
							/>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
