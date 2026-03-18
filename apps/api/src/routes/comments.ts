import { commentSchema } from "@odin-blog/schemas/comments"
import { Router } from "express"
import validate from "express-zod-safe"
import {
	createComment,
	deleteComment,
	editComment,
	getComment,
	getComments,
} from "@/controllers/comments"
import { authenticate } from "@/middlewares/authenticate"
import { idParamsSchema } from "@/schemas"
import { postCommentParamsSchema } from "@/schemas/comments"

const router: Router = Router({ mergeParams: true })

router.get("/", validate({ params: idParamsSchema }), getComments)
router.post(
	"/",
	authenticate,
	validate({ params: idParamsSchema, body: commentSchema }),
	createComment,
)
router.get(
	"/:commentId",
	validate({ params: postCommentParamsSchema }),
	getComment,
)
router.put(
	"/:commentId",
	authenticate,
	validate({ params: postCommentParamsSchema, body: commentSchema }),
	editComment,
)
router.delete(
	"/:commentId",
	authenticate,
	validate({ params: postCommentParamsSchema }),
	deleteComment,
)

export default router
