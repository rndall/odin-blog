import { cursorPaginationQuerySchema } from "@odin-blog/schemas/pagination"

import type { PostOrderByWithRelationInput } from "generated/prisma/models"
import z from "zod"

import { buildSortSchema } from "@/utils/buildSortSchema"

const POSTS_SORT_FIELDS = [
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

export const getPostsQuery = postsSortQuerySchema.extend(
	cursorPaginationQuerySchema.shape,
)
