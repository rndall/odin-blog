import type { NextFunction, Request, Response } from "express"
import z, { type ZodType } from "zod"

export const validateParams =
	(schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.params)
		if (!result.success) {
			return res.status(400).json(z.treeifyError(result.error))
		}
		next()
	}

export const validateBody =
	(schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body)
		if (!result.success) {
			return res.status(400).json(z.treeifyError(result.error))
		}
		next()
	}
