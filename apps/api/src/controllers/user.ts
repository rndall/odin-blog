/** biome-ignore-all lint/style/noNonNullAssertion: Validated user through auth middleware */
import type { Request, Response } from "express"

import { prisma } from "@/lib/prisma"

export const getMe = async (req: Request, res: Response) => {
	const user = req.user!
	const { password, ...userWithoutPassword } = user
	res.json({ user: userWithoutPassword })
}

export const getPosts = async (req: Request, res: Response) => {
	const authorId = req.user!.id
	const posts = await prisma.post.findMany({
		where: { authorId },
		orderBy: { createdAt: "asc" },
	})
	res.json({ posts })
}

export const getComments = async (req: Request, res: Response) => {
	const authorId = req.user!.id
	const comments = await prisma.comment.findMany({
		where: { post: { authorId } },
		orderBy: { createdAt: "asc" },
	})
	res.json({ comments })
}
