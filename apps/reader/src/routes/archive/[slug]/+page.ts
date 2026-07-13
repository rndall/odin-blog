import { createApi } from '$lib/api'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({fetch, params}) => {
	const api = createApi(fetch)
	const [post, postComments] = await Promise.all([
		api.posts.detail(params.slug),
		api.postComments.list(params.slug),
	])
	return { title: post.title, post, comments: postComments.comments }
}

