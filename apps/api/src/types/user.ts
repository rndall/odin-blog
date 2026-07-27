import type { ValidatedRequest } from "express-zod-safe"
import type { getCommentsQuery, getPostsQuery } from "@/schemas/user"

export type GetPostsRequest = ValidatedRequest<{
	query: typeof getPostsQuery
}>
export type GetCommentsRequest = ValidatedRequest<{
	query: typeof getCommentsQuery
}>
