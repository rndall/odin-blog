/** biome-ignore-all lint/style/noNonNullAssertion: Validated user through auth middleware */
import type { Response } from "express"
import { nanoid } from "nanoid"
import slugify from "slugify"

import { NotFoundError, UnauthorizedError } from "@/errors"
import { prisma } from "@/lib/prisma"
import type {
	CreatePostRequest,
	DeletePostRequest,
	EditPostRequest,
	GetPostRequest,
	GetPostsRequest,
} from "@/types/posts"
import { encodeCursor } from "@/utils/pagination"

const checkPostOwnership = async (slug: string, userId: number) => {
	const post = await prisma.post.findUnique({ where: { slug } })
	if (!post) {
		throw new NotFoundError("Post not found")
	}
	if (post.authorId !== userId) {
		throw new UnauthorizedError()
	}
}

export const getPosts = async (req: GetPostsRequest, res: Response) => {
	const { limit, cursor, sort } = req.query

	const posts = await prisma.post.findMany({
		take: limit + 1,
		...(cursor && {
			skip: 1,
			cursor: {
				id: cursor.id,
			},
		}),
		where: { published: true },
		select: {
			id: true,
			title: true,
			content: true,
			author: {
				select: {
					fullName: true,
				},
			},
			publishedAt: true,
			slug: true,
		},
		orderBy: sort,
	})

	const hasMore = posts.length > limit
	const page = hasMore ? posts.slice(0, limit) : posts
	const lastPost = page.at(-1)
	const nextCursor =
		hasMore && lastPost?.publishedAt
			? encodeCursor({ id: lastPost.id, publishedAt: lastPost.publishedAt })
			: null

	res.json({ posts: page, nextCursor })
}

export const createPost = async (req: CreatePostRequest, res: Response) => {
	const { title } = req.body
	const slug = `${slugify(title, { lower: true, strict: true, trim: true })}-${nanoid(10)}`
	const post = await prisma.post.create({
		data: { ...req.body, authorId: req.user!.id, slug },
	})
	res.status(201).json({ message: "Post created", post })
}

export const getPostBySlug = async (req: GetPostRequest, res: Response) => {
	const { slug } = req.params
	const post = await prisma.post.findUnique({ where: { slug } })
	if (!post) {
		throw new NotFoundError("Post not found")
	}
	res.json(post)
}

export const editPost = async (req: EditPostRequest, res: Response) => {
	const { slug } = req.params
	const data = req.body
	await checkPostOwnership(slug, req.user!.id)
	const editedPost = await prisma.post.update({ where: { slug }, data })
	res.json({ message: "Post edited successfully", post: editedPost })
}

export const deletePost = async (req: DeletePostRequest, res: Response) => {
	const { slug } = req.params
	await checkPostOwnership(slug, req.user!.id)
	const post = await prisma.post.delete({ where: { slug } })
	return res.json({ message: "Post deleted successfully", post })
}
