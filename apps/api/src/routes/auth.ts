import { loginSchema } from "@odin-blog/schemas/auth"

import { Router } from "express"
import validate from "express-zod-safe"

import { login } from "@/controllers/auth"

const router: Router = Router()

router.post(
	"/reader/login",
	(req, _res, next) => {
		req.body.client = "USER"
		next()
	},
	validate({ body: loginSchema }),
	login,
)
router.post(
	"/author/login",
	(req, _res, next) => {
		req.body.client = "AUTHOR"
		next()
	},
	validate({ body: loginSchema }),
	login,
)

export default router
