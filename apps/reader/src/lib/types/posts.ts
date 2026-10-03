import type { Post as SharedPost } from '@odin-blog/shared/types/posts.ts'

export type Post = Omit<SharedPost, 'createdAt'>
