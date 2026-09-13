import { USER_ROLES } from "@odin-blog/shared/types/users.js"
import * as z from "zod"

export const signUpSchema = z.object({
	username: z.string().trim().min(6, "Username must be at least 6 characters."),
	password: z.string().min(6, "Password must be at least 6 characters."),
	fullName: z.string().trim().min(1, "Full name is required."),
})
export type SignUpValues = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
	username: z.string().trim().min(1, "Username is required."),
	password: z.string().min(1, "Password is required."),
})
export type LoginValues = z.infer<typeof loginSchema>

export const roleLoginSchema = loginSchema.extend(
	z.object({
		client: z.enum(USER_ROLES),
	}).shape,
)
export type RoleLoginValues = z.infer<typeof roleLoginSchema>
