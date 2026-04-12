import { PUBLIC_API_BASE_URL } from '$env/static/public'
import { posts } from './posts'

type SvelteFetch = typeof fetch

const createApiFetch =
	(fetch: SvelteFetch) =>
	async <T>(url: string, options?: RequestInit) => {
		const res = await fetch(`${PUBLIC_API_BASE_URL}/${url}`, options)

		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`)
		}

		return res.json() as T
	}

export type Request = ReturnType<typeof createRequest>

export const createRequest = (fetch: SvelteFetch) => {
	const apiFetch = createApiFetch(fetch)
	return {
		get: <T>(url: string) => apiFetch<T>(url),
		post: <T, B>(url: string, body: B) =>
			apiFetch<T>(url, { method: 'POST', body: JSON.stringify(body) }),
		put: <T, B>(url: string, body: B) =>
			apiFetch<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
		delete: <T>(url: string) => apiFetch<T>(url, { method: 'DELETE' })
	}
}

export const createApi = (fetch: SvelteFetch) => ({
	posts: posts(createRequest(fetch))
})
