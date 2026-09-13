import {
	loginSchema,
	roleLoginSchema,
	signUpSchema,
} from "@odin-blog/schemas/auth"

import { Router } from "express"
import validate from "express-zod-safe"

import { login, roleLogin, signUp } from "@/controllers/auth"

const router: Router = Router()

router.post("/sign-up", validate({ body: signUpSchema }), signUp)
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
