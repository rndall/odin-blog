import { loginSchema } from "@odin-blog/schemas/auth"
import { Router } from "express"
import validate from "express-zod-safe"
import { login } from "@/controllers/auth"

const router: Router = Router()

router.post("/login", validate({ body: loginSchema }), login)

export default router
