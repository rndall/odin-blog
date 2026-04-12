import { createApi } from '$lib/api'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
	const api = createApi(fetch)
	const posts = await api.posts.list()
	return { posts }
}
