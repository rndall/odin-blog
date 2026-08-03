import type { CommentValues } from "@odin-blog/schemas/comments"
import type { PostComment } from "@odin-blog/shared/types/post-comments"
import { api } from "#/components/lib/api"
import type { Comment } from "./types"

export interface CommentsFilter {
	cursor?: string
	limit?: number
}

interface CommentsResponse {
	comments: Comment[]
	nextCursor: string | null
}

interface CreateCommentResponse {
	comment: Omit<PostComment, "user"> & { userId: number }
}

export const getComments = (filter?: CommentsFilter) =>
	api<CommentsResponse>("/user/comments", { params: filter })

export const createComment = (postSlug: string, comment: CommentValues) =>
	api<CreateCommentResponse>(`/post/${postSlug}/comments`, {
		method: "POST",
		body: comment,
	})

export const deleteComment = (postSlug: string, commentId: number) =>
	api(`/posts/${postSlug}/comments/${commentId}`, { method: "DELETE" })
