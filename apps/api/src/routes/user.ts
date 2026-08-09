import { Router } from "express"
import validate from "express-zod-safe"
import { getComments, getMe, getPosts } from "@/controllers/user"
import { authenticate } from "@/middlewares/authenticate"
import { requireRole } from "@/middlewares/authorize"
import { getCommentsQuery, getPostsQuery } from "@/schemas/user"

const router: Router = Router()

router.get("/me", authenticate, getMe)
router.get(
	"/posts",
	authenticate,
	requireRole("AUTHOR"),
	validate({ query: getPostsQuery }),
	getPosts,
)
router.get(
	"/comments",
	authenticate,
	requireRole("AUTHOR"),
	validate({ query: getCommentsQuery }),
	getComments,
)

export default router
