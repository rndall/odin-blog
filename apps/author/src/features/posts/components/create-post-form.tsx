/** biome-ignore-all lint/correctness/noChildrenProp: Tanstack Form API */

import { SendHorizontal } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useNavigate } from "@tanstack/react-router"

import { Button } from "#/components/ui/button"
import { Field } from "#/components/ui/field"
import { Spinner } from "#/components/ui/spinner"
import { toast } from "#/components/ui/toast"
import { useAppForm } from "#/form"
import { PostFields, postFormOpts } from "../form-fields"
import { useCreatePostMutation } from "../hooks/use-create-post-mutation"

export default function CreatePostForm() {
	const navigate = useNavigate()
	const createPostMutation = useCreatePostMutation()

	const form = useAppForm({
		...postFormOpts,
		onSubmit: ({ value }) => {
			createPostMutation.mutate(value, {
				onSuccess: () => {
					navigate({ to: "/posts" })
					toast.add({
						type: "success",
						description: `Post has been created successfully.`,
					})
				},
				onError: (error) => {
					console.error(error)
					toast.add({
						type: "error",
						description: "Error creating post.",
					})
				},
			})
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
						disabled={createPostMutation.isPending}
					>
						{createPostMutation.isPending &&
							createPostMutation.variables.published && (
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
						disabled={createPostMutation.isPending}
					>
						{createPostMutation.isPending &&
							!createPostMutation.variables.published && (
								<Spinner data-icon="inline-start" />
							)}
						Save Draft
					</Button>
				</Field>
			</PostFields>
		</form>
	)
}
