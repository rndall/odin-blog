import z from "zod"
import { postSlugParamsSchema } from "./posts"

export const commentIdParamsSchema = z.object({
	commentId: z.coerce
		.number("ID must be a number")
		.positive("ID must be a positive number"),
})

export const postCommentParamsSchema = commentIdParamsSchema.extend(
	postSlugParamsSchema.shape,
)

export type CommentIdParams = z.infer<typeof commentIdParamsSchema>
