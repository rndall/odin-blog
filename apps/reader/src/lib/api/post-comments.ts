import type { CommentValues } from '@odin-blog/schemas/comments'
import type { PostComment } from '@odin-blog/shared/types/post-comments.ts'

import { toQueryString } from '$lib/utils/api'
import type { Request } from '.'

type CreateCommentResponse = Omit<PostComment, 'user'> & {
	userId: number
}

export const postComments = (request: Request) => ({
	list: (postSlug: string, params?: { sort: string }) => {
		const queryString = toQueryString(params)
		return request.get<{ comments: PostComment[] }>(`posts/${postSlug}/comments${queryString}`)
	},
	detail: (postSlug: string, commentId: number) =>
		request.get<PostComment>(`posts/${postSlug}/comments/${commentId}`),
	create: (postSlug: string, comment: CommentValues) =>
		request.post<{ comment: CreateCommentResponse }>(`posts/${postSlug}/comments`, comment)
})
