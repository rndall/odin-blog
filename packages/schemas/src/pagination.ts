import z from "zod"

export const cursorPayloadSchema = z.object({
	id: z.number(),
	publishedAt: z.coerce.date(),
})
export type CursorPayload = z.infer<typeof cursorPayloadSchema>

export const cursorPaginationQuerySchema = z.object({
	limit: z.coerce.number().positive().max(100).default(10),
	cursor: z.preprocess(
		(val) => (val === "" ? undefined : val),
		z
			.string()
			.transform((val, ctx) => {
				try {
					const decoded = Buffer.from(val, "base64url").toString("utf8")

					return cursorPayloadSchema.parse(JSON.parse(decoded))
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
export type CursorPaginationQuery = z.infer<typeof cursorPaginationQuerySchema>
