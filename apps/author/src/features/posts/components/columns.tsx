import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { dayjs } from "@odin-blog/shared/lib/dayjs"
import type { ColumnDef } from "@tanstack/react-table"
import { cva } from "class-variance-authority"

import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { DataTableColumnHeader } from "#/components/ui/data-table/data-table-column-header"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu"
import type { Post } from "../types"

const postBadgeVariants = cva("h-6 font-medium before:content-['•']", {
	variants: {
		status: {
			published: "bg-primary/20 text-primary/90 before:text-primary/90",
			draft: "bg-tertiary/20 text-tertiary/90 before:text-tertiary/90",
		},
	},
})

export const columns: ColumnDef<Post>[] = [
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-[#486363] tracking-wide"
				column={column}
				title="TITLE"
			/>
		),
		cell: ({ row }) => (
			<div className="font-heading text-base text-primary">
				{row.getValue("title")}
			</div>
		),
	},
	{
		accessorKey: "published",
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-[#486363] tracking-wide"
				column={column}
				title="STATUS"
			/>
		),
		cell: ({ row }) => {
			const status = row.getValue("published") ? "published" : "draft"

			return (
				<Badge
					className={postBadgeVariants({
						status,
					})}
				>
					{status.at(0)?.toUpperCase() + status.slice(1)}
				</Badge>
			)
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<DataTableColumnHeader
				className="text-[#486363] tracking-wide"
				column={column}
				title="CREATED DATE"
			/>
		),
		cell: ({ row }) => (
			<div>{dayjs(row.getValue("createdAt")).format("ll")}</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const post = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button variant="ghost" className="size-8 p-0">
								<span className="sr-only">Open menu</span>
								<HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
							</Button>
						}
					/>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(String(post.id))}
							>
								Copy post ID
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>View customer</DropdownMenuItem>
							<DropdownMenuItem>View payment details</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
