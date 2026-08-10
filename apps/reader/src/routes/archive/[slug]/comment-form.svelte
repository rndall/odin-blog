<script lang="ts">
	import { commentSchema } from '@odin-blog/schemas/comments'
	import { HttpError } from '@odin-blog/shared/errors'
	import { defaults, setError, superForm } from 'sveltekit-superforms'
	import { zod4, zod4Client } from 'sveltekit-superforms/adapters'
	import { page } from '$app/state'
	import { api } from '$lib/api'
	import { Field, FieldError, FieldGroup } from '$lib/components/ui/field'
	import * as Form from '$lib/components/ui/form'
	import { Textarea } from '$lib/components/ui/textarea'

	const form = superForm(defaults(zod4(commentSchema)), {
		SPA: true,
		validators: zod4Client(commentSchema),
		onUpdate: async ({ form: f }) => {
			if (!f.valid || !page.params.slug) return

			try {
				await api.postComments.create(page.params.slug, f.data)
			} catch (error) {
				console.log(error, 'er')
				setError(
					f,
					'',
					error instanceof HttpError ? error.message : 'An unexpected error occurred.'
				)
			}
		}
	})

	const { form: formData, errors, enhance } = form
</script>

<form method="POST" use:enhance>
	<FieldGroup class="gap-3">
		<Form.Field {form} name="content">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="tracking-wider uppercase">Comment</Form.Label>
					<Textarea
						{...props}
						bind:value={$formData.content}
						placeholder="Share your thoughts..."
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
			<FieldError errors={$errors._errors?.map((error) => ({ message: error }))} />
		</Form.Field>
		<Field orientation="responsive" class="@md/field-group:flex-row-reverse">
			<Form.Button>Post Comment</Form.Button>
		</Field>
	</FieldGroup>
</form>
