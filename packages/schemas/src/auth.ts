import z from "zod"

export const loginSchema = z.object({
	username: z.string().trim().nonempty(),
	password: z.string().min(6, "Password must be at least 6 characters"),
})

export type Login = z.infer<typeof loginSchema>
