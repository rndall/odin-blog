import type { PostComment } from "@odin-blog/shared/types/post-comments"
import type { Post } from "@odin-blog/shared/types/posts"

export interface Comment
	extends Omit<PostComment, "user" | "updatedAt" | "postId"> {
	user: Omit<PostComment["user"], "role">
	post: Pick<Post, "id" | "title" | "slug">
}
