import { Prisma } from "generated/prisma/client"
import z from "zod"

export function buildSortSchema<T extends Record<string, unknown>>(
	allowedFields: ReadonlyArray<keyof T & string>,
	defaultSort?: string,
	alwaysAppend?: string,
) {
	const stringSchema = defaultSort
		? z.string().trim().default(defaultSort)
		: z.string().trim()

	const fieldEnum = z.enum(allowedFields as [string, ...string[]])

	const parseParts = (val: string, ctx: z.RefinementCtx) => {
		const parts = val
			.split(",")
			.map((p) => p.trim())
			.filter(Boolean)
		const result: Array<Record<string, Prisma.SortOrder>> = []

		for (const part of parts) {
			const isDesc = part.startsWith("-")
			const field = isDesc ? part.slice(1) : part

			const parsed = fieldEnum.safeParse(field)
			if (!parsed.success) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Invalid sort field: "${field}". Allowed: ${allowedFields.join(", ")}`,
				})
				return z.NEVER
			}
			result.push({
				[parsed.data]: isDesc ? Prisma.SortOrder.desc : Prisma.SortOrder.asc,
			})
		}

		return result as T[]
	}

	return stringSchema.transform((val, ctx) => {
		const userFields = parseParts(val, ctx)
		if (userFields === z.NEVER) return z.NEVER

		if (!alwaysAppend) return userFields

		const appended = parseParts(alwaysAppend, ctx)
		if (appended === z.NEVER) return z.NEVER

		// Deduplicate: drop appended fields already present in user's sort
		const userKeys = new Set(userFields.map((f) => Object.keys(f)[0]))
		const filtered = appended.filter((f) => !userKeys.has(Object.keys(f)[0]))

		return [...userFields, ...filtered] as T[]
	})
}
