import { api } from "#/components/lib/api"
import type { Post } from "./types"

export interface PostsFilter {
	sort?: string
	page?: number
	limit?: number
}

interface PostsResponse {
	data: Post[]
}

export const getPosts = (filter?: PostsFilter) =>
	api<PostsResponse>("/user/posts", { params: filter })
