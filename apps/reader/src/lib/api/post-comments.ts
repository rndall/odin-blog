import type { PostComment } from '@odin-blog/shared/types/post-comments'
import type { Request } from '.'

export const postComments = (request: Request) => ({
	list: (postSlug: string) => request.get<{ comments: PostComment[] }>(`posts/${postSlug}/comments`),
	detail: (postSlug: string, commentId: number) =>
		request.get<PostComment>(`posts/${postSlug}/comments/${commentId}`)
})
