/** biome-ignore-all lint/correctness/noChildrenProp: Tanstack Form API */

import { SendHorizontal } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"

import { Button } from "#/components/ui/button"
import { Field } from "#/components/ui/field"
import { Spinner } from "#/components/ui/spinner"
import { toast } from "#/components/ui/toast"
import { useAppForm } from "#/form"
import { PostFields, postFormOpts } from "../form-fields"
import { useEditPostMutation } from "../hooks/use-edit-post-mutation"
import { myPostQueries } from "../queries"

export default function EditPostForm() {
	const { slug } = useParams({ from: "/_authed/posts/edit/$slug" })
	const { data: post } = useSuspenseQuery(myPostQueries.detail(slug))
	const navigate = useNavigate()
	const editPostMutation = useEditPostMutation()

	const form = useAppForm({
		...postFormOpts,
		defaultValues: {
			title: post.title,
			content: post.content,
			published: post.published,
		},
		onSubmit: ({ value }) => {
			editPostMutation.mutate(
				{ postSlug: post.slug, post: value },
				{
					onSuccess: () => {
						navigate({ to: "/posts" })
						toast.add({
							type: "success",
							description: `Post has been edited successfully.`,
						})
					},
					onError: (error) => {
						console.error(error)
						toast.add({
							type: "error",
							description: "Error editing post.",
						})
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
			<PostFields form={form}>
				<Field
					orientation="responsive"
					className="@md/field-group:flex-row-reverse"
				>
					<Button
						size="lg"
						type="submit"
						className="rounded-sm"
						onClick={() => form.setFieldValue("published", true)}
						disabled={editPostMutation.isPending}
					>
						{editPostMutation.isPending &&
							editPostMutation.variables.post.published && (
								<Spinner data-icon="inline-start" />
							)}
						Publish
						<HugeiconsIcon
							data-icon="inline-end"
							icon={SendHorizontal}
							strokeWidth={2}
						/>
					</Button>
					<Button
						size="lg"
						type="submit"
						variant="secondary"
						className="rounded-sm"
						disabled={editPostMutation.isPending}
						onClick={() => form.setFieldValue("published", false)}
					>
						{editPostMutation.isPending &&
							!editPostMutation.variables.post.published && (
								<Spinner data-icon="inline-start" />
							)}
						Save Draft
					</Button>
				</Field>
			</PostFields>
		</form>
	)
}
