import type { Request, Response } from "express"
import { prisma } from "@/lib/prisma"
import type {
	CreatePostRequest,
	DeletePostRequest,
	EditPostRequest,
	GetPostRequest,
} from "@/types/posts"

const checkPostOwnerShip = async (postId: number, userId: number) => {
	const post = await prisma.post.findUnique({ where: { id: postId } })
	if (!post) {
		return { error: "not_found" as const, post: null }
	}
	if (post.authorId !== userId) {
		return { error: "forbidden" as const, post: null }
	}
	return { error: null, post }
}

const handleOwnershipError = (
	error: "forbidden" | "not_found",
	res: Response,
) => {
	if (error === "not_found")
		return res.status(404).json({ message: "Post not found" })
	if (error === "forbidden")
		return res.status(403).json({ message: "Forbidden" })
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
		return res.status(404).json({ message: "Post not found" })
	}
	res.json(post)
}

export const editPost = async (req: EditPostRequest, res: Response) => {
	const { id } = req.params
	const data = req.body
	const { error } = await checkPostOwnerShip(id, req.user!.id)
	if (error) {
		return handleOwnershipError(error, res)
	}
	const editedPost = await prisma.post.update({ where: { id }, data })
	res.json({ post: editedPost })
}

export const deletePost = async (req: DeletePostRequest, res: Response) => {
	const { id } = req.params
	const { error, post } = await checkPostOwnerShip(id, req.user!.id)
	if (error) {
		return handleOwnershipError(error, res)
	}
	await prisma.post.delete({ where: { id } })
	return res.json({ message: "Post deleted successfully", post })
}
