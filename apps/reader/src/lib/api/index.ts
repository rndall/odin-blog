import { throwHttpError } from '@odin-blog/shared/utils/api.js'

import { goto } from '$app/navigation'
import { resolve } from '$app/paths'
import { PUBLIC_API_BASE_URL } from '$env/static/public'
import { auth as authStore } from '$lib/auth.svelte'

import { auth } from './auth'
import { postComments } from './post-comments'
import { posts } from './posts'

type SvelteFetch = typeof fetch

const createApiFetch =
	(fetch: SvelteFetch) =>
	async <T>(url: string, options: RequestInit = {}) => {
		const headers = new Headers(options.headers)

		if (authStore.token) {
			headers.set('Authorization', `Bearer ${authStore.token}`)
		}

		if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
			headers.set('Content-Type', 'application/json')
		}

		const res = await fetch(`${PUBLIC_API_BASE_URL}/${url}`, {
			...options,
			headers
		})

		if (res.status === 401) {
			authStore.logout()
			goto(resolve('/sign-in'))
		}

		if (!res.ok) {
			await throwHttpError(res)
		}

		return res.json() as T
	}

export type Request = ReturnType<typeof createRequest>

export const createRequest = (fetch: SvelteFetch) => {
	const apiFetch = createApiFetch(fetch)
	return {
		get: <T>(url: string) => apiFetch<T>(url),
		post: <T, B = object>(url: string, body: B) =>
			apiFetch<T>(url, { method: 'POST', body: JSON.stringify(body) }),
		put: <T, B>(url: string, body: B) =>
			apiFetch<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
		delete: <T>(url: string) => apiFetch<T>(url, { method: 'DELETE' })
	}
}

export const createApi = (fetch: SvelteFetch) => ({
	posts: posts(createRequest(fetch)),
	postComments: postComments(createRequest(fetch)),
	auth: auth(createRequest(fetch))
})
