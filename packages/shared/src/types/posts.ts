import type { Author } from "./users"

export interface Post {
	id: number
	title: string
	content: string
	author: Author
	publishedAt: string
	published: boolean
	slug: string
}
