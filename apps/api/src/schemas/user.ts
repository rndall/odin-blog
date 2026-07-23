import type { PostOrderByWithRelationInput } from "generated/prisma/models"
import z from "zod"
import { buildSortSchema } from "@/utils/buildSortSchema"
import { POSTS_SORT_FIELDS } from "./posts"

const postsSortSchema = buildSortSchema<PostOrderByWithRelationInput>(
	POSTS_SORT_FIELDS,
	"-createdAt",
	"-id",
)

export const getPostsQuery = z
	.object({
		page: z.coerce.number().min(1).default(1),
		limit: z.coerce.number().min(1).max(100).default(10),
	})
	.extend({ sort: postsSortSchema })
