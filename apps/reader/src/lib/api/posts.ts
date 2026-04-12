import type { Post } from '@odin-blog/shared/posts'
import type { Request } from '.'

export const posts = (request: Request) => ({
	list: () => request.get<Post[]>('posts')
})
