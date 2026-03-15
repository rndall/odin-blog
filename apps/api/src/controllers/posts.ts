import type { Request, Response } from "express"
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
