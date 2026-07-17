import { Router } from "express"

import { getComments, getPosts } from "@/controllers/user"

import { authenticate } from "@/middlewares/authenticate"
import { requireRole } from "@/middlewares/authorize"

const router: Router = Router()

router.get("/posts", authenticate, requireRole("AUTHOR"), getPosts)
router.get("/comments", authenticate, requireRole("AUTHOR"), getComments)

export default router
