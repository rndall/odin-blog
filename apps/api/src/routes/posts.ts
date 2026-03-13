import { Router } from "express"
import { getPostById, getPosts } from "@/controllers/posts"
import { validateParams } from "@/middlewares/validate"
import { idSchema } from "@/schemas"

const router: Router = Router()

router.get("/", getPosts)
router.get("/:id", validateParams(idSchema), getPostById)

export default router
