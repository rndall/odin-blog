import { commentSchema } from "@odin-blog/schemas/comments"
import { useForm } from "@tanstack/react-form"

import { Button } from "#/components/ui/button"
import { Field, FieldError, FieldGroup } from "#/components/ui/field"
import { Spinner } from "#/components/ui/spinner"
import { Textarea } from "#/components/ui/textarea"
import { useEditCommentMutation } from "../hooks/use-edit-comment-mutation"

interface EditCommentFormProps {
	postSlug: string
	commentId: number
	initialContent: string
	onCancel: () => void
	onEditSuccess: () => void
}

export function EditCommentForm({
	postSlug,
	commentId,
	initialContent,
	onCancel,
	onEditSuccess,
}: EditCommentFormProps) {
	const editCommentMutation = useEditCommentMutation()

	const form = useForm({
		defaultValues: {
			content: initialContent,
		},
		validators: {
			onSubmit: commentSchema,
		},
		onSubmit: ({ value }) => {
			editCommentMutation.mutate(
				{ postSlug, commentId, comment: value },
				{
					onSuccess: () => {
						onEditSuccess()
					},
				},
			)
		},
	})

	return (
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
									onChange={(e) => field.handleChange(e.currentTarget.value)}
									aria-invalid={isInvalid}
									autoComplete="off"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						)
					}}
				/>
				<Field
					orientation="responsive"
					className="@md/field-group:flex-row-reverse"
				>
					<Button type="submit" disabled={editCommentMutation.isPending}>
						{editCommentMutation.isPending && (
							<Spinner data-icon="inline-start" />
						)}
						Edit Reply
					</Button>
					<Button
						onClick={() => {
							form.setFieldValue("content", initialContent)
							onCancel()
						}}
						variant="ghost"
					>
						Cancel
					</Button>
				</Field>
			</FieldGroup>
		</form>
	)
}
