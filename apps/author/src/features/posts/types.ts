import type { Post as SharedPost } from "@odin-blog/shared/types/posts"

export interface Post extends Omit<SharedPost, "author"> {
	updatedAt: string
	authorId: number
}
