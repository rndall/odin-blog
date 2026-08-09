/** biome-ignore-all lint/style/noNonNullAssertion: Validated user through auth middleware */

import type { Request, Response } from "express"

import { prisma } from "@/lib/prisma"

export const getDashboard = async (req: Request, res: Response) => {
	const userId = req.user!.id

	const [postCount, commentCount] = await Promise.all([
		prisma.post.groupBy({
			by: ["published"],
			where: { authorId: userId },
			_count: { _all: true },
		}),
		prisma.comment.count({ where: { post: { authorId: userId } } }),
	])

	const publishedPostCount =
		postCount.find((p) => p.published)?._count._all ?? 0
	const draftPostCount = postCount.find((p) => !p.published)?._count._all ?? 0
	const totalPostCount = publishedPostCount + draftPostCount

	res.json({ totalPostCount, publishedPostCount, draftPostCount, commentCount })
}
