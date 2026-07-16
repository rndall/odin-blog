import type { commentSchema } from "@odin-blog/schemas/comments"
import type { ValidatedRequest } from "express-zod-safe"
import type { postCommentParamsSchema } from "@/schemas/comments"
import type { postSlugParamsSchema } from "@/schemas/posts"

export type GetCommentsRequest = ValidatedRequest<{
	params: typeof postSlugParamsSchema
}>
export type CreateCommentRequest = ValidatedRequest<{
	params: typeof postSlugParamsSchema
	body: typeof commentSchema
}>
export type GetCommentRequest = ValidatedRequest<{
	params: typeof postCommentParamsSchema
}>
export type EditCommentRequest = ValidatedRequest<{
	params: typeof postCommentParamsSchema
	body: typeof commentSchema
}>
export type DeleteCommentRequest = ValidatedRequest<{
	params: typeof postCommentParamsSchema
}>
