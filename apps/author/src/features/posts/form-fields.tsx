/** biome-ignore-all lint/correctness/noChildrenProp: Tanstack Form API */

import { postSchema } from "@odin-blog/schemas/posts"
import { formOptions } from "@tanstack/react-form"
import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"
import type { Editor as TinyMCEEditor } from "tinymce"
import { Field, FieldError, FieldGroup } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { Separator } from "#/components/ui/separator"
import { withForm } from "#/form"

export const postFormOpts = formOptions({
	defaultValues: {
		title: "",
		content: "",
		published: false,
	},
	validators: {
		onSubmit: postSchema,
	},
})

export const PostFields = withForm({
	...postFormOpts,
	render: function Render({ form, children }) {
		const editorRef = useRef<TinyMCEEditor>(null)

		return (
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
							<Field data-invalid={isInvalid} className="min-h-100">
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

				{children}
			</FieldGroup>
		)
	},
})
