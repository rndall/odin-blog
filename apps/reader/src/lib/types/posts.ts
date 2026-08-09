import type { Post as SharedPost  } from "@odin-blog/shared/types/posts";

export type Post = Omit<SharedPost, 'createdAt'>