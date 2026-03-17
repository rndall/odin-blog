import type { WeakRequestHandler } from "express-zod-safe"
import type { UserRole } from "generated/prisma/enums"

export const requireRole =
	(role: UserRole): WeakRequestHandler =>
	(req, res, next) => {
		if (req.user!.role === role) {
			next()
		}

		return res.status(403).json({ message: "Forbidden" })
	}
