import { postSchema } from "@odin-blog/schemas/posts"
import { Router } from "express"
import validate from "express-zod-safe"
import {
	createPost,
	deletePost,
	editPost,
	getPostById,
	getPosts,
} from "@/controllers/posts"
import { authenticate } from "@/middlewares/authenticate"
import { requireRole } from "@/middlewares/authorize"
import commentsRouter from "@/routes/comments"
import { idParamsSchema } from "@/schemas"

const router: Router = Router()

router.get("/", getPosts)
router.post(
	"/",
	authenticate,
	requireRole("AUTHOR"),
	validate({ body: postSchema }),
	createPost,
)
router.get("/:postId", validate({ params: idParamsSchema }), getPostById)
router.put(
	"/:postId",
	authenticate,
	validate({ params: idParamsSchema, body: postSchema }),
	editPost,
)
router.delete(
	"/:postId",
	authenticate,
	validate({ params: idParamsSchema }),
	deletePost,
)

router.use("/:postId/comments", commentsRouter)

export default router
