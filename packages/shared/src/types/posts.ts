import type { Author } from "./users"

export interface Post {
	id: number
	title: string
	content: string
	author: Author
	createdAt: string
	publishedAt: string
	published: boolean
	slug: string
}
