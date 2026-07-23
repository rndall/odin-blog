import type { ValidatedRequest } from "express-zod-safe"
import type { getPostsQuery } from "@/schemas/user"

export type GetPostsRequest = ValidatedRequest<{
	query: typeof getPostsQuery
}>
