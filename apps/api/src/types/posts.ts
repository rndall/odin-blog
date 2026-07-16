import type { postSchema } from "@odin-blog/schemas/posts"
import type { ValidatedRequest } from "express-zod-safe"
import type { getPostsQuery, postSlugParamsSchema } from "@/schemas/posts"

export type GetPostsRequest = ValidatedRequest<{
	query: typeof getPostsQuery
}>
export type CreatePostRequest = ValidatedRequest<{ body: typeof postSchema }>
export type GetPostRequest = ValidatedRequest<{
	params: typeof postSlugParamsSchema
}>
export type EditPostRequest = ValidatedRequest<{
	body: typeof postSchema
	params: typeof postSlugParamsSchema
}>
export type DeletePostRequest = ValidatedRequest<{
	params: typeof postSlugParamsSchema
}>
