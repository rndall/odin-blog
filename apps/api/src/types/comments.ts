import type { commentSchema } from "@odin-blog/schemas/comments"
import type { ValidatedRequest } from "express-zod-safe"
import type { idParamsSchema } from "@/schemas"
import type { postCommentParamsSchema } from "@/schemas/comments"

export type GetCommentsRequest = ValidatedRequest<{
	params: typeof idParamsSchema
}>
export type CreateCommentRequest = ValidatedRequest<{
	params: typeof idParamsSchema
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
