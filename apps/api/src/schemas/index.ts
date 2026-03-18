import z from "zod"

export const idParamsSchema = z.object({
	id: z.coerce
		.number("ID must be a number")
		.positive("ID must be a positive number"),
})

export type IdParams = z.infer<typeof idParamsSchema>
