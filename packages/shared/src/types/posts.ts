import type { User } from "./users"

export interface Post {
	id: number
	title: string
	content: string
	author: User
	publishedAt: string
	published: boolean
	slug: string
}
