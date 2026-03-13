import type { Request, Response } from "express"
import { prisma } from "lib/prisma"

export const getPosts = async (_req: Request, res: Response) => {
	const posts = await prisma.post.findMany()
	res.json(posts)
}
