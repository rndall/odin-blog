/** biome-ignore-all lint/style/noNonNullAssertion: Validated user through auth middleware */

import { NotFoundError, UnauthorizedError } from "@odin-blog/shared/errors"
import type { Response } from "express"

import { prisma } from "@/lib/prisma"
import type {
	CreateCommentRequest,
	DeleteCommentRequest,
	EditCommentRequest,
	GetCommentRequest,
	GetCommentsRequest,
} from "@/types/comments"

const checkCommentOwnership = async ({
	commentId,
	postSlug,
	userId,
}: {
	commentId: number
	postSlug: string
	userId: number
}) => {
	const comment = await prisma.comment.findUnique({
		where: { id: commentId, post: { slug: postSlug } },
	})
	if (!comment) {
		throw new NotFoundError("Comment not found")
	}
	if (comment.userId !== userId) {
		throw new UnauthorizedError()
	}
}

export const getComments = async (req: GetCommentsRequest, res: Response) => {
	const { slug } = req.params

	const comments = await prisma.comment.findMany({
		where: { post: { slug } },
		orderBy: { createdAt: "asc" },
		select: {
			id: true,
			content: true,
			postId: true,
			createdAt: true,
			updatedAt: true,
			user: { select: { id: true, username: true, fullName: true } },
		},
	})
	res.json({ comments })
}

export const createComment = async (
	req: CreateCommentRequest,
	res: Response,
) => {
	const { slug } = req.params

	const post = await prisma.post.findUnique({
		where: { slug },
	})
	if (!post) {
		throw new NotFoundError("Post not found")
	}

	const comment = await prisma.comment.create({
		data: { ...req.body, postId: post.id, userId: req.user!.id },
	})
	res.status(201).json({ comment })
}

export const getComment = async (req: GetCommentRequest, res: Response) => {
	const { slug, commentId } = req.params

	const comment = await prisma.comment.findUnique({
		where: { id: commentId, post: { slug } },
	})
	if (!comment) {
		throw new NotFoundError("Comment not found")
	}
	res.json({ comment })
}

export const editComment = async (req: EditCommentRequest, res: Response) => {
	const { slug, commentId } = req.params

	const userId = req.user!.id
	const data = req.body
	await checkCommentOwnership({ commentId, postSlug: slug, userId })

	const editedComment = await prisma.comment.update({
		where: { id: commentId, post: { slug } },
		data,
	})
	res.json({ message: "Comment edited successfully", comment: editedComment })
}

export const deleteComment = async (
	req: DeleteCommentRequest,
	res: Response,
) => {
	const { slug, commentId } = req.params

	const userId = req.user!.id
	await checkCommentOwnership({ commentId, postSlug: slug, userId })

	const comment = await prisma.comment.delete({
		where: { id: commentId, post: { slug } },
	})
	res.json({ message: "Comment deleted successfully", comment })
}
