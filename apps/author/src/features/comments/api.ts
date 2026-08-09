import type { CommentValues } from "@odin-blog/schemas/comments"
import type { PostComment } from "@odin-blog/shared/types/post-comments"
import { api } from "#/lib/api"
import type { Comment } from "./types"

export interface CommentsFilter {
	cursor?: string
	limit?: number
}

interface CommentsResponse {
	comments: Comment[]
	nextCursor: string | null
}
export const getComments = (filter?: CommentsFilter) =>
	api<CommentsResponse>("/user/comments", { params: filter })

type CommentResponse = Omit<PostComment, "user"> & { userId: number }

interface CreateCommentResponse {
	comment: CommentResponse
}
export const createComment = (postSlug: string, comment: CommentValues) =>
	api<CreateCommentResponse>(`/post/${postSlug}/comments`, {
		method: "POST",
		body: comment,
	})

interface EditCommentResponse {
	message: string
	comment: CommentResponse
}
export const editComment = ({
	postSlug,
	commentId,
	comment,
}: {
	postSlug: string
	commentId: number
	comment: CommentValues
}) =>
	api<EditCommentResponse>(`/posts/${postSlug}/comments/${commentId}`, {
		method: "PUT",
		body: comment,
	})

export const deleteComment = (postSlug: string, commentId: number) =>
	api(`/posts/${postSlug}/comments/${commentId}`, { method: "DELETE" })
