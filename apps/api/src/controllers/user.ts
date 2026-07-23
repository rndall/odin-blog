/** biome-ignore-all lint/style/noNonNullAssertion: Validated user through auth middleware */
import type { Request, Response } from "express"

import { prisma } from "@/lib/prisma"
import type { GetPostsRequest } from "@/types/user"

export const getMe = async (req: Request, res: Response) => {
	const user = req.user!
	const { password, ...userWithoutPassword } = user
	res.json({ user: userWithoutPassword })
}

export const getPosts = async (req: GetPostsRequest, res: Response) => {
	const authorId = req.user!.id
	const { limit, page, sort } = req.query
	const skip = (page - 1) * limit
	const [posts, totalPosts] = await prisma.$transaction([
		prisma.post.findMany({
			skip,
			take: limit,
			where: { authorId },
			orderBy: sort,
		}),
		prisma.post.count({ where: { authorId } }),
	])
	const totalPages = Math.ceil(totalPosts / limit)

	res.json({
		data: posts,
		meta: {
			total: totalPosts,
			totalPages,
			currentPage: page,
			limit,
			from: skip + 1,
			to: Math.min(skip + limit, totalPosts),
			hasNextPage: page < totalPages,
			hasPreviousPage: page > 1,
		},
	})
}

export const getComments = async (req: Request, res: Response) => {
	const authorId = req.user!.id
	const comments = await prisma.comment.findMany({
		where: { post: { authorId } },
		orderBy: { createdAt: "asc" },
	})
	res.json({ comments })
}
