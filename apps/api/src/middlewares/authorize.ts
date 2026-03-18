import type { WeakRequestHandler } from "express-zod-safe"
import type { UserRole } from "generated/prisma/enums"
import { UnauthorizedError } from "@/errors"

export const requireRole =
	(role: UserRole): WeakRequestHandler =>
	(req, _res, next) => {
		// biome-ignore lint/style/noNonNullAssertion: Validated user through auth middleware
		if (req.user!.role === role) {
			return next()
		}

		throw new UnauthorizedError()
	}
