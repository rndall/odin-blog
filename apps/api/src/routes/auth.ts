import { loginSchema } from "@odin-blog/schemas/auth"
import { Router } from "express"
import { login } from "@/controllers/auth"
import { validateBody } from "@/middlewares/validate"

const router: Router = Router()

router.post("/login", validateBody(loginSchema), login)

export default router
