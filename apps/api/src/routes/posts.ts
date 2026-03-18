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
router.get("/:id", validate({ params: idParamsSchema }), getPostById)
router.put(
	"/:id",
	authenticate,
	validate({ params: idParamsSchema, body: postSchema }),
	editPost,
)
router.delete(
	"/:id",
	authenticate,
	validate({ params: idParamsSchema }),
	deletePost,
)

router.use("/:id/comments", commentsRouter)

export default router
