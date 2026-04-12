interface Author {
	fullName: string
}

export interface Post {
	id: number
	title: string
	content: string
	author: Author
	publishedAt: string
}
