import type { Post } from '@odin-blog/shared/posts'
import { toQueryString } from '$lib/utils/api'
import type { Request } from '.'

interface GetPostsResponse {
	posts: Post[]
	nextCursor: string | null
}

export const posts = (request: Request) => ({
	list: (params?: { limit?: number; cursor?: string }) => {
		const queryString = toQueryString(params)
		return request.get<GetPostsResponse>(`posts${queryString}`)
	}
})
