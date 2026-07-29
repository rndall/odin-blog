import type { PostValues } from "@odin-blog/schemas/posts"
import { api } from "#/components/lib/api"
import type { Filters } from "#/types/api"
import type { Post } from "./types"

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10
export const DEFAULT_SORT = "-createdAt"

export interface PostFilters extends Filters<Post> {
	search?: string
}

interface PostsResponse {
	data: Post[]
	meta: Meta
}

interface Meta {
	total: number
	totalPages: number
	currentPage: number
	limit: number
	from: number
	to: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export const getPosts = (filters?: PostFilters) =>
	api<PostsResponse>("/user/posts", { params: filters })

export const createPost = (post: PostValues) =>
	api<Post>("/posts", { method: "POST", body: post })
