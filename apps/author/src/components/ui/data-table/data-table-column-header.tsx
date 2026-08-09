import {
	ArrowDown02Icon,
	ArrowUp02Icon,
	ArrowUpDownIcon,
	EyeOff,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>
	}

	const headerSortIcon =
		column.getIsSorted() === "desc"
			? ArrowDown02Icon
			: column.getIsSorted() === "asc"
				? ArrowUp02Icon
				: ArrowUpDownIcon

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							variant="ghost"
							size="sm"
							className="-ml-3 h-8 data-[state=open]:bg-accent"
						>
							<span>{title}</span>
							<HugeiconsIcon icon={headerSortIcon} />
						</Button>
					}
				/>
				<DropdownMenuContent align="start">
					<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
						<HugeiconsIcon icon={ArrowUp02Icon} />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
						<HugeiconsIcon icon={ArrowDown02Icon} />
						Desc
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
						<HugeiconsIcon icon={EyeOff} />
						Hide
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
