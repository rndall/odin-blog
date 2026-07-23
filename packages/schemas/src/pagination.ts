import z from "zod"

export const baseCursorSchema = z.object({
	id: z.number(),
})

export type BaseCursor = {
	id: number
} & Record<string, string | number | Date>

export const postCursorSchema = baseCursorSchema.extend({
	publishedAt: z.coerce.date(),
})

export type PostCursor = z.infer<typeof postCursorSchema>

export const postCursorPaginationQuerySchema = z.object({
	limit: z.coerce.number().positive().max(100).default(10),
	cursor: z.preprocess(
		(val) => (val === "" ? undefined : val),
		z
			.string()
			.transform((val, ctx) => {
				try {
					const decoded = Buffer.from(val, "base64url").toString("utf8")

					return postCursorSchema.parse(JSON.parse(decoded))
				} catch {
					ctx.issues.push({
						code: "custom",
						message: "Invalid cursor",
						input: val,
					})

					return z.NEVER
				}
			})
			.optional(),
	),
})
export type PostCursorPaginationQuery = z.infer<
	typeof postCursorPaginationQuerySchema
>
