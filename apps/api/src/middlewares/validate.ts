import type { NextFunction, Request, Response } from "express"
import z, { type ZodType } from "zod"

type RequestPart = "params" | "body" | "query"
type TreeifiedZodError = ReturnType<typeof z.treeifyError>

export const validate =
	(schemas: Partial<Record<RequestPart, ZodType>>) =>
	(req: Request, res: Response, next: NextFunction) => {
		const errors: Partial<Record<RequestPart, TreeifiedZodError>> = {}

		for (const [part, schema] of Object.entries(schemas) as [
			RequestPart,
			ZodType,
		][]) {
			const result = schema.safeParse(req[part])
			if (!result.success) {
				errors[part] = z.treeifyError(result.error)
			}
		}

		if (Object.keys(errors).length > 0) {
			return res.status(400).json(errors)
		}

		next()
	}
