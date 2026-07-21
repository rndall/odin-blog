import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"
import type { NavItem } from "#/types/nav"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar"

interface NavProps extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
	items: NavItem[]
}

export function Nav({ items, ...props }: NavProps) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								render={
									<Link to={item.to} search={item.search}>
										<HugeiconsIcon icon={item.icon} />
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
