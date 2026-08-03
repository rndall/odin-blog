import { LogOut, UnfoldMoreIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ClientOnly } from "@tanstack/react-router"
import { useAuth } from "#/features/auth/hooks/useAuth"
import { authQueries } from "#/features/auth/queries"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function NavUser() {
	return (
		<ClientOnly fallback={<NavUserSkeleton />}>
			<NavUserContent />
		</ClientOnly>
	)
}

function NavUserContent() {
	const { isMobile } = useSidebar()
	const { logout } = useAuth()
	const { data } = useSuspenseQuery(authQueries.me())
	const user = data.user
	const initials = user.fullName
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage alt={user.username} />
									<AvatarFallback className="rounded-lg">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.fullName}</span>
									<span className="truncate text-xs">{user.username}</span>
								</div>
								<HugeiconsIcon
									icon={UnfoldMoreIcon}
									className="ml-auto size-4"
								/>
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage alt={user.username} />
										<AvatarFallback className="rounded-lg">
											{initials}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">
											{user.fullName}
										</span>
										<span className="truncate text-xs">{user.username}</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout}>
							<HugeiconsIcon icon={LogOut} />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

function NavUserSkeleton() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className="flex items-center gap-2 px-3 py-1.5">
					<Skeleton className="size-8 rounded-full bg-muted-foreground/50" />
					<div className="grid flex-1 gap-1.5">
						<Skeleton className="h-3.5 w-24 bg-muted-foreground/50" />
						<Skeleton className="h-3 w-32 bg-muted-foreground/50" />
					</div>
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
