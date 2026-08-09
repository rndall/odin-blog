/** biome-ignore-all lint/correctness/noUnusedImports: subject to change */

import {
	ArrowMoveDownRightIcon,
	ArrowTurnForwardIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { dayjs } from "@odin-blog/shared/lib/dayjs"
import {
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query"
import { Activity, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

import { Button } from "#/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card"
import { Field, FieldGroup } from "#/components/ui/field"
import { Spinner } from "#/components/ui/spinner"
import { authQueries } from "#/features/auth/queries"
import { cn } from "#/lib/utils"
import { commentQueries } from "../queries"
import type { Comment } from "../types"
import DeleteCommentAlertDialog from "./delete-comment-alert-dialog"
import { EditCommentForm } from "./edit-comment-form"
import EmptyComments from "./empty-comments"

export default function CommentsList() {
	const { ref, inView } = useInView()

	const {
		data: { pages },
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useSuspenseInfiniteQuery(commentQueries.list())

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

	const hasComments = pages.some((page) => page.comments.length > 0)

	if (!hasComments) {
		return <EmptyComments />
	}

	return (
		<>
			{pages.map((page) => (
				<ul className="space-y-7" key={page.nextCursor}>
					{page.comments.map((comment) => (
						<li key={comment.id}>
							<CommentCard {...comment} />
						</li>
					))}
				</ul>
			))}
			{hasNextPage && <Spinner ref={ref} className="mx-auto size-8" />}
		</>
	)
}

function CommentCard(comment: Comment) {
	const [isEditing, setIsEditing] = useState(false)

	const {
		data: { user },
	} = useSuspenseQuery(authQueries.me())

	const isCurrentUser = comment.user.username === user.username

	return (
		<Card>
			<CardHeader className="gap-0.5">
				<CardTitle className="font-bold font-sans">
					{comment.user.fullName}
				</CardTitle>
				<CardDescription>
					{dayjs(comment.createdAt).format("ll")}
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="flex items-center gap-2 text-muted-foreground">
					<HugeiconsIcon icon={ArrowMoveDownRightIcon} size={12} />
					On:
					<span className="font-medium text-primary">{comment.post.title}</span>
				</p>
				{!isEditing && <p className="text-base">{comment.content}</p>}
				<Activity mode={isEditing ? "visible" : "hidden"}>
					<EditCommentForm
						postSlug={comment.post.slug}
						commentId={comment.id}
						initialContent={comment.content}
						onCancel={() => setIsEditing(false)}
						onEditSuccess={() => setIsEditing(false)}
					/>
				</Activity>
			</CardContent>
			<CardFooter>
				<FieldGroup>
					<Field
						orientation="responsive"
						className={cn("justify-end", isCurrentUser && "justify-between")}
					>
						{isCurrentUser && (
							<Button
								variant="ghost"
								className={cn(
									"text-primary hover:text-primary/80",
									isEditing && "text-foreground",
								)}
								onClick={() => setIsEditing((prev) => !prev)}
							>
								<HugeiconsIcon
									className="rotate-180"
									data-icon="inline-start"
									icon={ArrowTurnForwardIcon}
								/>
								Edit
							</Button>
						)}
						<DeleteCommentAlertDialog
							commentId={comment.id}
							postSlug={comment.post.slug}
						/>
					</Field>
				</FieldGroup>
			</CardFooter>
		</Card>
	)
}
