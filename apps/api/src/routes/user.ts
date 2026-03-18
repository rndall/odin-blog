import { Router } from "express"
import { getPosts } from "@/controllers/user"
import { authenticate } from "@/middlewares/authenticate"
import { requireRole } from "@/middlewares/authorize"

const router: Router = Router()

router.get("/posts", authenticate, requireRole("AUTHOR"), getPosts)

export default router
