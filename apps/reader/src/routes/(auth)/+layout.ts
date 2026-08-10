import { redirect } from '@sveltejs/kit'
import { resolve } from '$app/paths'
import { auth } from '$lib/auth.svelte'

export const load = () => {
	if (auth.isAuthenticated) {
		redirect(307, resolve('/'))
	}
}
