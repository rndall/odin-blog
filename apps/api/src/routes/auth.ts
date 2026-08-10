import { loginSchema, roleLoginSchema } from "@odin-blog/schemas/auth"

import { Router } from "express"
import validate from "express-zod-safe"

import { login, roleLogin } from "@/controllers/auth"

const router: Router = Router()

router.post("/login", validate({ body: loginSchema }), login)
router.post(
	"/author/login",
	(req, _res, next) => {
		req.body.client = "AUTHOR"
		next()
	},
	validate({ body: roleLoginSchema }),
	roleLogin,
)

export default router
