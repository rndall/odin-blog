import { Router } from "express"
import validate from "express-zod-safe"
import { getComments, getMe, getPosts } from "@/controllers/user"
import { authenticate } from "@/middlewares/authenticate"
import { requireRole } from "@/middlewares/authorize"
import { getPostsQuery } from "@/schemas/user"

const router: Router = Router()

router.get("/me", authenticate, getMe)
router.get(
	"/posts",
	authenticate,
	requireRole("AUTHOR"),
	validate({ query: getPostsQuery }),
	getPosts,
)
router.get("/comments", authenticate, requireRole("AUTHOR"), getComments)

export default router
