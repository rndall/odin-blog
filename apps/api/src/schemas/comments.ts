import type { CommentOrderByWithRelationInput } from "generated/prisma/models"
import z from "zod"

import { buildSortSchema } from "@/utils/buildSortSchema"
import { postSlugParamsSchema } from "./posts"

export const COMMENTS_SORT_FIELDS = [
	"id",
	"content",
	"createdAt",
	"updatedAt",
] as const satisfies ReadonlyArray<
	keyof Omit<CommentOrderByWithRelationInput, "author" | "comments">
>

const commentsSortSchema = buildSortSchema<CommentOrderByWithRelationInput>(
	COMMENTS_SORT_FIELDS,
	"-createdAt",
	"-id",
)

export const commentSortQuerySchema = z.object({
	sort: commentsSortSchema,
})

export const commentIdParamsSchema = z.object({
	commentId: z.coerce
		.number("ID must be a number")
		.positive("ID must be a positive number"),
})

export const postCommentParamsSchema = commentIdParamsSchema.extend(
	postSlugParamsSchema.shape,
)

export type CommentIdParams = z.infer<typeof commentIdParamsSchema>

export const commentsQuery = commentSortQuerySchema
