import type { User } from "./users"

export interface PostComment {
	id: number
	content: string
	postId: number
	createdAt: string
	updatedAt: string
	user: Omit<User, "bio">
}
