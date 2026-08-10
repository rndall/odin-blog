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

const getCommentOrThrow = async (commentId: number, slug: string) => {
	const comment = await prisma.comment.findUnique({
		where: { id: commentId },
		include: {
			post: {
				select: {
					slug: true,
					authorId: true,
				},
			},
		},
	})

	if (!comment || comment.post.slug !== slug) {
		throw new NotFoundError("Comment not found")
	}

	return comment
}

export const getComments = async (req: GetCommentsRequest, res: Response) => {
	const { slug } = req.params
	const { sort } = req.query

	const comments = await prisma.comment.findMany({
		where: { post: { slug } },
		orderBy: sort,
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
	const comment = await getCommentOrThrow(commentId, slug)

	if (comment.userId !== userId) {
		throw new UnauthorizedError()
	}

	const editedComment = await prisma.comment.update({
		where: { id: commentId },
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

	const comment = await getCommentOrThrow(commentId, slug)

	const isCommentOwner = comment.userId === userId
	const isPostOwner = comment.post.authorId === userId

	if (!isCommentOwner && !isPostOwner) {
		throw new UnauthorizedError()
	}

	await prisma.comment.delete({
		where: { id: comment.id },
	})

	res.json({ message: "Comment deleted successfully", comment })
}
