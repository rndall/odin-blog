<script lang="ts">
	import { loginSchema } from '@odin-blog/schemas/auth'
	import { HttpError } from '@odin-blog/shared/errors'
	import { defaults, setError, superForm } from 'sveltekit-superforms'
	import { zod4, zod4Client } from 'sveltekit-superforms/adapters'
	import { createApi } from '$lib/api'
	import { auth } from '$lib/auth.svelte'
	import * as Card from '$lib/components/ui/card/index.js'
	import { Field, FieldGroup } from '$lib/components/ui/field/index.js'
	import * as Form from '$lib/components/ui/form/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import FieldError from './ui/field/field-error.svelte'

	const api = createApi(fetch)

	const form = superForm(defaults(zod4(loginSchema)), {
		SPA: true,
		validators: zod4Client(loginSchema),
		onUpdate: async ({ form: f }) => {
			if (!f.valid) return

			try {
				const data = await api.auth.signIn(f.data)
				auth.setAuth(data.user, data.token)
			} catch (error) {
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

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign In</Card.Title>
		<Card.Description>Enter your email below to sign in to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<FieldGroup>
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Username</Form.Label>
							<Input {...props} bind:value={$formData.username} required />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex items-center">
								<Form.Label>Password</Form.Label>
								<!-- <a href="##" class="ms-auto inline-block text-sm underline"> Forgot your password? </a> -->
							</div>
							<Input {...props} type="password" bind:value={$formData.password} required />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Field>
					<FieldError errors={$errors._errors?.map((error) => ({ message: error }))} />
					<Form.Button class="w-full">Sign In</Form.Button>
					<!-- <Button variant="outline" class="w-full">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor"
							/>
						</svg>
						Login with Google
					</Button> -->
					<!-- <FieldDescription class="text-center">
						Don't have an account? <a href="##">Sign up</a>
					</FieldDescription> -->
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
