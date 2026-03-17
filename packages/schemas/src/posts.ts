import z from "zod"

export const postSchema = z.object({
	title: z.string().nonempty(),
	content: z.string().nonempty(),
	published: z.boolean().default(false),
})

export type PostValues = z.infer<typeof postSchema>
