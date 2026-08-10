import type { PostComment } from '@odin-blog/shared/types/post-comments.ts'

import { toQueryString } from '$lib/utils/api'
import type { Request } from '.'

export const postComments = (request: Request) => ({
	list: (postSlug: string, params?: { sort: string }) => {
		const queryString = toQueryString(params)
		return request.get<{ comments: PostComment[] }>(`posts/${postSlug}/comments${queryString}`)
	},
	detail: (postSlug: string, commentId: number) =>
		request.get<PostComment>(`posts/${postSlug}/comments/${commentId}`)
})
