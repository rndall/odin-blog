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

export const getComments = (filter?: CommentsFilter) =>
	api<CommentsResponse>("/user/comments", { params: filter })
