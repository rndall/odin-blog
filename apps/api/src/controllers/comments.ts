/** biome-ignore-all lint/style/noNonNullAssertion: Validated user through auth middleware */
import type { Response } from "express"
import { NotFoundError, UnauthorizedError } from "@/errors"
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
	postId,
	userId,
}: {
	commentId: number
	postId: number
	userId: number
}) => {
	const comment = await prisma.comment.findUnique({
		where: { id: commentId, postId },
	})
	if (!comment) {
		throw new NotFoundError("Comment not found")
	}
	if (comment.userId !== userId) {
		throw new UnauthorizedError()
	}
}

export const getComments = async (req: GetCommentsRequest, res: Response) => {
	const { postId } = req.params
	const comments = await prisma.comment.findMany({
		where: { postId },
		orderBy: { createdAt: "asc" },
		omit: { postId: true },
	})
	res.json({ comments })
}

export const createComment = async (
	req: CreateCommentRequest,
	res: Response,
) => {
	const { postId } = req.params
	const comment = await prisma.comment.create({
		data: { ...req.body, postId, userId: req.user!.id },
	})
	res.status(201).json({ comment })
}

export const getComment = async (req: GetCommentRequest, res: Response) => {
	const { postId, commentId } = req.params
	const comment = await prisma.comment.findUnique({
		where: { id: commentId, postId },
	})
	if (!comment) {
		throw new NotFoundError("Comment not found")
	}
	res.json({ comment })
}

export const editComment = async (req: EditCommentRequest, res: Response) => {
	const { postId, commentId } = req.params
	const userId = req.user!.id
	const data = req.body
	await checkCommentOwnership({ commentId, postId, userId })
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
	const { postId, commentId } = req.params
	const userId = req.user!.id
	await checkCommentOwnership({ commentId, postId, userId })
	const comment = await prisma.comment.delete({
		where: { id: commentId, postId },
	})
	res.json({ message: "Comment deleted successfully", comment })
}
