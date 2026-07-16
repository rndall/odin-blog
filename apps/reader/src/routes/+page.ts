import { createApi } from '$lib/api'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	const api = createApi(fetch)
	const data = await api.posts.list({ limit: 8 })
	return data
}
