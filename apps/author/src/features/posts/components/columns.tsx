import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { dayjs } from "@odin-blog/shared/lib/dayjs"
import { useRouter } from "@tanstack/react-router"
import type { ColumnDef } from "@tanstack/react-table"
import { cva } from "class-variance-authority"
import { useState } from "react"
import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { DataTableColumnHeader } from "#/components/ui/data-table/data-table-column-header"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu"
import { Spinner } from "#/components/ui/spinner"
import { toast } from "#/components/ui/toast"
import { useDeletePostMutation } from "../hooks/use-delete-post-mutation"
import { useEditPostMutation } from "../hooks/use-edit-post-mutation"
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
			const [open, setOpen] = useState(false)
			const post = row.original

			const editPostMutation = useEditPostMutation()
			const deletePostMutation = useDeletePostMutation()
			const router = useRouter()

			const handleToggleStatus = () => {
				const newStatus = post.published ? "Draft" : "Published"

				editPostMutation.mutate(
					{
						postSlug: post.slug,
						post: { ...post, published: !post.published },
					},
					{
						onSuccess: () => {
							toast.add({
								type: "success",
								description: `Post status has been changed to ${newStatus}.`,
							})
						},
						onError: (error) => {
							console.error(error)
							toast.add({
								type: "error",
								description: "Error changing post status.",
							})
						},
						onSettled: () => setOpen(false),
					},
				)
			}

			const handleDelete = () => {
				deletePostMutation.mutate(post.slug, {
					onSuccess: () => {
						toast.add({
							type: "success",
							description: "Post has been deleted successfully.",
						})
					},
					onError: (error) => {
						console.error(error)
						toast.add({
							type: "error",
							description: "Error creating post.",
						})
					},
					onSettled: () => setOpen(false),
				})
			}

			return (
				<DropdownMenu open={open} onOpenChange={setOpen}>
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
								onClick={() =>
									router.navigate({
										to: "/posts/edit/$slug",
										params: { slug: post.slug },
									})
								}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={(e) => {
									e.preventDefault()
									handleToggleStatus()
								}}
							>
								Set as {post.published ? "Draft" : "Published"}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={(e) => {
									e.preventDefault()
									handleDelete()
								}}
								disabled={deletePostMutation.isPending}
							>
								Delete
								{deletePostMutation.isPending && <Spinner />}
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
