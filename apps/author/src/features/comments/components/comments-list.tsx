/** biome-ignore-all lint/correctness/noUnusedImports: subject to change */

import {
	ArrowMoveDownRightIcon,
	ArrowTurnForwardIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { commentSchema } from "@odin-blog/schemas/comments"
import { dayjs } from "@odin-blog/shared/lib/dayjs"
import { useForm } from "@tanstack/react-form"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"
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
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "#/components/ui/collapsible"
import { Field, FieldError, FieldGroup } from "#/components/ui/field"
import { Spinner } from "#/components/ui/spinner"
import { Textarea } from "#/components/ui/textarea"
import { useCreateCommentMutation } from "../hooks/use-create-comment-mutation"
import { commentQueries } from "../queries"
import type { Comment } from "../types"
import DeleteCommentAlertDialog from "./delete-comment-alert-dialog"
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
	// const createCommentMutation = useCreateCommentMutation()
	// const form = useForm({
	// 	defaultValues: {
	// 		content: "",
	// 	},
	// 	validators: {
	// 		onSubmit: commentSchema,
	// 	},
	// 	onSubmit: ({ value }) => {
	// 		createCommentMutation.mutate(
	// 			{ postSlug: comment.post.slug, comment: value },
	// 			{ onSuccess: () => form.reset() },
	// 		)
	// 	},
	// })

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
				<p className="text-base">{comment.content}</p>
			</CardContent>
			<CardFooter>
				<FieldGroup>
					<Collapsible className="space-y-5">
						{/* <CollapsibleContent>
							<form
								onSubmit={(e) => {
									e.preventDefault()
									form.handleSubmit()
								}}
							>
								<FieldGroup className="gap-2">
									<form.Field
										name="content"
										// biome-ignore lint/correctness/noChildrenProp: Tanstack Form API
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid

											return (
												<Field data-invalid={isInvalid}>
													<Textarea
														className="min-h-30"
														placeholder="Write your reply..."
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) =>
															field.handleChange(e.currentTarget.value)
														}
														aria-invalid={isInvalid}
														autoComplete="off"
													/>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											)
										}}
									/>
									<Field
										orientation="responsive"
										className="@md/field-group:flex-row-reverse"
									>
										<Button
											type="submit"
											disabled={createCommentMutation.isPending}
										>
											{createCommentMutation.isPending && (
												<Spinner data-icon="inline-start" />
											)}
											Post Reply
										</Button>
										<Button variant="ghost">Cancel</Button>
									</Field>
								</FieldGroup>
							</form>
						</CollapsibleContent> */}
						<Field orientation="responsive" className="justify-end">
							{/* <CollapsibleTrigger
								render={
									<Button
										variant="ghost"
										className="text-primary hover:text-primary/80"
									>
										<HugeiconsIcon
											className="rotate-180"
											data-icon="inline-start"
											icon={ArrowTurnForwardIcon}
										/>
										Reply
									</Button>
								}
							/> */}
							<DeleteCommentAlertDialog
								commentId={comment.id}
								postSlug={comment.post.slug}
							/>
						</Field>
					</Collapsible>
				</FieldGroup>
			</CardFooter>
		</Card>
	)
}
