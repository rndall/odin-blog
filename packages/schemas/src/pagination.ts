import z from "zod"

export const baseCursorSchema = z.object({
	id: z.number(),
})

export type BaseCursor = {
	id: number
} & Record<string, string | number | Date>

export const createCursorSchema = <T extends z.ZodTypeAny>(schema: T) =>
	z.preprocess(
		(val) => (val === "" ? undefined : val),
		z
			.string()
			.transform((val, ctx) => {
				try {
					const decoded = Buffer.from(val, "base64url").toString("utf8")

					return schema.parse(JSON.parse(decoded))
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
	)
