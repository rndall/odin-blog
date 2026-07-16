import { createApi } from '$lib/api'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({fetch}) => {
	const api = createApi(fetch)
	const data = await api.posts.list()
	return { title: 'Archive', data }
}
