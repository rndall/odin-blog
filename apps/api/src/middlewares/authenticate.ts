import type { WeakRequestHandler } from "express-zod-safe"
import { passport } from "@/lib/passport"

export const authenticate: WeakRequestHandler = (req, res, next) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(error: Error, user: Express.User | false, info?: { message: string }) => {
			if (error) {
				return res.status(500).json({ message: "Server error", error })
			}
			if (!user) {
				return res.status(401).json({ message: info?.message })
			}
			req.user = user
			next()
		},
	)(req, res, next)
}
