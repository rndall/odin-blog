import {
	DashboardSquare02Icon,
	FeatherIcon,
	LicenseIcon,
	MailOpen02Icon,
	MessageMultiple02Icon,
	PlusSignSquareIcon,
	ViewIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"

import type { NavItem } from "#/types/nav"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar"
import { Nav } from "./nav"

interface NavData {
	nav: NavItem[]
}

const data: NavData = {
	nav: [
		{
			title: "Dashboard",
			to: "/",
			icon: DashboardSquare02Icon,
		},
		{
			title: "Posts",
			to: "/posts",
			icon: LicenseIcon,
		},
		{
			title: "New Post",
			to: "/posts/new",
			icon: PlusSignSquareIcon,
		},
		{
			title: "Comments",
			to: "/comments",
			icon: MessageMultiple02Icon,
		},
		{
			title: "Published",
			to: "/posts",
			search: {
				status: "published",
			},
			icon: ViewIcon,
		},
		{
			title: "Drafts",
			to: "/posts",
			search: {
				status: "draft",
			},
			icon: MailOpen02Icon,
		},
	],
}

export function AppSidebar() {
	const { state } = useSidebar()

	return (
		<Sidebar collapsible="icon" className="bg-sidebar">
			<SidebarHeader>
				<SidebarTrigger className="self-end" />
				<SidebarMenu>
					<SidebarMenuItem className="mt-8 mb-4">
						<SidebarMenuButton
							size="lg"
							render={
								<Link to="/">
									{state === "collapsed" && (
										<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
											<HugeiconsIcon icon={FeatherIcon} className="size-4" />
										</div>
									)}
									<div className="flex flex-col gap-0.5 leading-none">
										<span className="truncate font-bold font-heading text-lg text-primary">
											The Digital Atelier
										</span>
										<span className="font-light text-primary">
											Editorial CMS
										</span>
									</div>
								</Link>
							}
						/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<Nav items={data.nav} />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	)
}
