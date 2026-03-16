import type { Request, Response } from "express"
import { PrismaClientKnownRequestError } from "generated/prisma/internal/prismaNamespace"
import { prisma } from "@/lib/prisma"

export const getPosts = async (_req: Request, res: Response) => {
	const posts = await prisma.post.findMany()
	res.json(posts)
}

export const getPostById = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	const post = await prisma.post.findUnique({ where: { id } })
	if (!post) {
		return res.status(404).json({ message: "Post not found" })
	}
	res.json(post)
}

export const deletePost = async (req: Request, res: Response) => {
	const id = Number(req.params.id)
	try {
		const post = await prisma.post.delete({ where: { id } })
		return res.json({ message: "Post deleted successfully", post })
	} catch (err) {
		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code === "P2025") {
				return res.status(404).json({ message: "Post not found" })
			}
		}
		return res.status(500).json({ message: "Failed to delete post" })
	}
}
