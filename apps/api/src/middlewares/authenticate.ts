import type { NextFunction, Request, Response } from "express"
import { passport } from "@/lib/passport"

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(err: Error, user: Express.User | false, info?: { message: string }) => {
			if (err) {
				return res.status(500).json({ message: "Internal server error" })
			}
			if (!user) {
				return res.status(401).json({ message: info?.message })
			}
			req.user = user
			next()
		},
	)(req, res, next)
}
