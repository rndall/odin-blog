import type { Post } from '#lib/types/posts.js'
import { toQueryString } from '#lib/utils/api.js'
import type { Request } from '.'

interface GetPostsResponse {
	posts: Post[]
	nextCursor: string | null
}

export const posts = (request: Request) => ({
	list: (params?: { limit?: number; cursor?: string; sort?: string }) => {
		const queryString = toQueryString(params)
		return request.get<GetPostsResponse>(`posts${queryString}`)
	},
	detail: (slug: string) => request.get<Post>(`posts/${slug}`)
})
