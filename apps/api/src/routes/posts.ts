import { Router } from "express"
import { deletePost, getPostById, getPosts } from "@/controllers/posts"
import { validateParams } from "@/middlewares/validate"
import { idSchema } from "@/schemas"

const router: Router = Router()

router.get("/", getPosts)

router.param("id", validateParams(idSchema))

router.get("/:id", getPostById)
router.delete("/:id", deletePost)

export default router
