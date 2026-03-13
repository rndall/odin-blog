import z from "zod"

export const idSchema = z.object({
	id: z.coerce
		.number("ID must be a number")
		.positive("ID must be a positive number"),
})

export type IdParams = z.infer<typeof idSchema>
