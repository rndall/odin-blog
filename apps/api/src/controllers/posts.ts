/** biome-ignore-all lint/style/noNonNullAssertion: Validated user through auth middleware */
import type { Request, Response } from "express"
import { NotFoundError, UnauthorizedError } from "@/errors"
import { prisma } from "@/lib/prisma"
import type {
	CreatePostRequest,
	DeletePostRequest,
	EditPostRequest,
	GetPostRequest,
} from "@/types/posts"

const checkPostOwnership = async (postId: number, userId: number) => {
	const post = await prisma.post.findUnique({ where: { id: postId } })
	if (!post) {
		throw new NotFoundError("Post not found")
	}
	if (post.authorId !== userId) {
		throw new UnauthorizedError()
	}
}

export const getPosts = async (_req: Request, res: Response) => {
	const posts = await prisma.post.findMany()
	res.json(posts)
}

export const createPost = async (req: CreatePostRequest, res: Response) => {
	const post = await prisma.post.create({
		data: { ...req.body, authorId: req.user!.id },
	})
	res.status(201).json({ message: "Post created", post })
}

export const getPostById = async (req: GetPostRequest, res: Response) => {
	const { id } = req.params
	const post = await prisma.post.findUnique({ where: { id } })
	if (!post) {
		throw new NotFoundError("Post not found")
	}
	res.json(post)
}

export const editPost = async (req: EditPostRequest, res: Response) => {
	const { id } = req.params
	const data = req.body
	await checkPostOwnership(id, req.user!.id)
	const editedPost = await prisma.post.update({ where: { id }, data })
	res.json({ message: "Post edited successfully", post: editedPost })
}

export const deletePost = async (req: DeletePostRequest, res: Response) => {
	const { id } = req.params
	await checkPostOwnership(id, req.user!.id)
	const post = await prisma.post.delete({ where: { id } })
	return res.json({ message: "Post deleted successfully", post })
}
