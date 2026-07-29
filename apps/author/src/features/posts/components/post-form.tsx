/** biome-ignore-all lint/correctness/noChildrenProp: Tanstack Form API */

import { SendHorizontal } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"
import type { Editor as TinyMCEEditor } from "tinymce"
import z from "zod"

import { Button } from "#/components/ui/button"
import { Field, FieldError, FieldGroup } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { Separator } from "#/components/ui/separator"
import { Spinner } from "#/components/ui/spinner"
import { useCreatePostMutation } from "../hooks/use-create-post-mutation"

const postFormSchema = z.object({
	title: z.string().min(1, "Title is required."),
	content: z.string().min(1, "Content is required."),
})

export default function PostForm() {
	const editorRef = useRef<TinyMCEEditor>(null)
	const navigate = useNavigate()
	const createPostMutation = useCreatePostMutation()

	const form = useForm({
		defaultValues: {
			title: "",
			content: "",
		},
		validators: {
			onSubmit: postFormSchema,
		},
		onSubmitMeta: { published: true },
		onSubmit: ({ value, meta }) => {
			createPostMutation.mutate(
				{ ...value, published: meta.published },
				{
					onSuccess: () => {
						navigate({ to: "/posts" })
					},
				},
			)
		},
	})

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
			}}
		>
			<FieldGroup>
				<form.Field
					name="title"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<div>
								<Field data-invalid={isInvalid}>
									<Input
										className="h-14 rounded-xs bg-transparent font-heading md:text-xl"
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder="A brilliant title goes here..."
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
								<Separator />
							</div>
						)
					}}
				/>
				<form.Field
					name="content"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<Field data-invalid={isInvalid}>
								<Editor
									apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
									initialValue={field.state.value}
									onInit={(_, editor) => {
										editorRef.current = editor
									}}
									onBlur={() => {
										if (editorRef.current) {
											field.handleChange(editorRef.current.getContent())
											field.handleBlur()
										}
									}}
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
					<Button
						size="lg"
						type="submit"
						className="rounded-sm"
						onClick={() => form.handleSubmit()}
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
						onClick={() => form.handleSubmit({ published: false })}
					>
						{createPostMutation.isPending &&
							!createPostMutation.variables.published && (
								<Spinner data-icon="inline-start" />
							)}
						Save Draft
					</Button>
				</Field>
			</FieldGroup>
		</form>
	)
}
