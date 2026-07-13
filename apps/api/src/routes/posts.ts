import { postSchema } from "@odin-blog/schemas/posts"

import { Router } from "express"
import validate from "express-zod-safe"

import {
	createPost,
	deletePost,
	editPost,
	getPostBySlug,
	getPosts,
} from "@/controllers/posts"

import { authenticate } from "@/middlewares/authenticate"
import { requireRole } from "@/middlewares/authorize"

import commentsRouter from "@/routes/comments"

import { getPostsQuery, postSlugParamsSchema } from "@/schemas/posts"

const router: Router = Router()

router.get(
	"/",
	validate({
		query: getPostsQuery,
	}),
	getPosts,
)
router.post(
	"/",
	authenticate,
	requireRole("AUTHOR"),
	validate({ body: postSchema }),
	createPost,
)
router.get("/:slug", validate({ params: postSlugParamsSchema }), getPostBySlug)
router.put(
	"/:slug",
	authenticate,
	validate({ params: postSlugParamsSchema, body: postSchema }),
	editPost,
)
router.delete(
	"/:slug",
	authenticate,
	validate({ params: postSlugParamsSchema }),
	deletePost,
)

router.use("/:slug/comments", commentsRouter)

export default router
