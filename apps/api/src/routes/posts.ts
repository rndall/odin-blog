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
import { idSchema } from "@/schemas"

const router: Router = Router()

router.get("/", getPosts)
router.post(
	"/",
	authenticate,
	requireRole("AUTHOR"),
	validate({ body: postSchema }),
	createPost,
)
router.get("/:id", validate({ params: idSchema }), getPostById)
router.put(
	"/:id",
	authenticate,
	validate({ params: idSchema, body: postSchema }),
	editPost,
)
router.delete("/:id", authenticate, validate({ params: idSchema }), deletePost)

export default router
