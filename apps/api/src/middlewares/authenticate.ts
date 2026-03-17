import type { WeakRequestHandler } from "express-zod-safe"
import { UnauthorizedError } from "@/errors"
import { passport } from "@/lib/passport"

export const authenticate: WeakRequestHandler = (req, res, next) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(error: Error, user: Express.User | false, info?: { message: string }) => {
			if (error) {
				throw error
			}
			if (!user) {
				throw new UnauthorizedError(info?.message)
			}
			req.user = user
			next()
		},
	)(req, res, next)
}
