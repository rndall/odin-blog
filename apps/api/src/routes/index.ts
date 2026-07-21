import { Router } from "express"

import { getDashboard } from "@/controllers"
import { authenticate } from "@/middlewares/authenticate"
import { requireRole } from "@/middlewares/authorize"

const router: Router = Router()

router.get("/dashboard", authenticate, requireRole("AUTHOR"), getDashboard)

export default router
