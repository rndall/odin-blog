import {
	baseCursorSchema,
	createCursorSchema,
} from "@odin-blog/schemas/pagination"

import type { PostOrderByWithRelationInput } from "generated/prisma/models"
import z from "zod"

import { buildSortSchema } from "@/utils/buildSortSchema"

export const POSTS_SORT_FIELDS = [
	"id",
	"title",
	"content",
	"published",
	"authorId",
	"createdAt",
	"updatedAt",
	"publishedAt",
] as const satisfies ReadonlyArray<
	keyof Omit<PostOrderByWithRelationInput, "author" | "comments">
>

const postsSortSchema = buildSortSchema<PostOrderByWithRelationInput>(
	POSTS_SORT_FIELDS,
	"-publishedAt",
	"-id",
)

export const postsSortQuerySchema = z.object({
	sort: postsSortSchema,
})

export const postCursorSchema = baseCursorSchema.extend({
	publishedAt: z.coerce.date(),
})

export type PostCursor = z.infer<typeof postCursorSchema>

const postCursorPaginationQuerySchema = z.object({
	limit: z.coerce.number().positive().max(100).default(10),
	cursor: createCursorSchema(postCursorSchema),
})
export type PostCursorPaginationQuery = z.infer<
	typeof postCursorPaginationQuerySchema
>

export const getPostsQuery = postsSortQuerySchema.extend(
	postCursorPaginationQuerySchema.shape,
)

export const postSlugParamsSchema = z.object({
	slug: z.string().min(1, "Slug is required"),
})
