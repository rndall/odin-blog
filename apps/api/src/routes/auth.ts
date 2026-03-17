import { loginSchema } from "@odin-blog/schemas/auth"
import { Router } from "express"
import { login } from "@/controllers/auth"
import { validate } from "@/middlewares/validate"

const router: Router = Router()

router.post("/login", validate({ body: loginSchema }), login)

export default router
