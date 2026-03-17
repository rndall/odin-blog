import type { Request, Response } from "express"
import { prisma } from "@/lib/prisma"
import type {
	CreatePostRequest,
	DeletePostRequest,
	GetPostRequest,
} from "@/types/posts"

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

export const deletePost = async (req: DeletePostRequest, res: Response) => {
	const { id } = req.params
	try {
		const post = await prisma.post.findUnique({
			where: { id },
		})
		if (!post) {
			return res.status(404).json({ message: "Post not found" })
		}
		if (post.authorId !== req.user!.id) {
			return res.status(403).json({ message: "Forbidden" })
		}
		await prisma.post.delete({ where: { id } })
		return res.json({ message: "Post deleted successfully", post })
	} catch (error) {
		return res.status(500).json({ message: "Failed to delete post", error })
	}
}
