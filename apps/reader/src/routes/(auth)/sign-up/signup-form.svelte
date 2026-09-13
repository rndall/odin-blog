<script lang="ts">
	import { HttpError } from '@odin-blog/shared/errors'
	import type { ComponentProps } from 'svelte'
	import { defaults, setError, superForm } from 'sveltekit-superforms'
	import { zod4, zod4Client } from 'sveltekit-superforms/adapters'
	import { resolve } from '$app/paths'
	import { createApi } from '$lib/api'
	import { auth } from '$lib/auth.svelte'
	import { Button } from '$lib/components/ui/button/index.js'
	import * as Card from '$lib/components/ui/card/index.js'
	import FieldError from '$lib/components/ui/field/field-error.svelte'
	import * as Field from '$lib/components/ui/field/index.js'
	import * as Form from '$lib/components/ui/form/index.js'
	import { Input } from '$lib/components/ui/input/index.js'
	import { signUpFormSchema } from './schema'

	let { ...restProps }: ComponentProps<typeof Card.Root> = $props()

	const api = createApi(fetch)

	const form = superForm(defaults(zod4(signUpFormSchema)), {
		SPA: true,
		validators: zod4Client(signUpFormSchema),
		onUpdate: async ({ form: f }) => {
			if (!f.valid) return

			try {
				const data = await api.auth.signUp(f.data)
				auth.setAuth(data.token, data.user)
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

<Card.Root {...restProps}>
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>Enter your information below to create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<Field.Group>
				<Form.Field {form} name="fullName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Full Name</Form.Label>
							<Input {...props} bind:value={$formData.fullName} placeholder="John Doe" required />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
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
							<Form.Label>Password</Form.Label>
							<Input {...props} bind:value={$formData.password} type="password" required />
						{/snippet}
					</Form.Control>
					<Field.Description>Must be at least 6 characters long.</Field.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="confirmPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input {...props} bind:value={$formData.confirmPassword} type="password" required />
						{/snippet}
					</Form.Control>
					<Field.Description>Please confirm your password.</Field.Description>
					<Form.FieldErrors />
				</Form.Field>
				<Field.Group>
					<Field.Field>
						<FieldError errors={$errors._errors?.map((error) => ({ message: error }))} />
						<Button type="submit">Create Account</Button>
						<!-- <Button variant="outline" type="button">Sign up with Google</Button> -->
						<Field.Description class="px-6 text-center">
							Already have an account? <a href={resolve('/(auth)/sign-in')}>Sign in</a>
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</Field.Group>
		</form>
	</Card.Content>
</Card.Root>
