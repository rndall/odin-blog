import type { WeakRequestHandler } from "express-zod-safe"
import type { UserRole } from "generated/prisma/enums"
import { UnauthorizedError } from "@/errors"

export const requireRole =
	(role: UserRole): WeakRequestHandler =>
	(req, _res, next) => {
		if (req.user!.role === role) {
			next()
		}

		throw new UnauthorizedError()
	}
