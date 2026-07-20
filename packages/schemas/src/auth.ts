import { USER_ROLES } from "@odin-blog/shared/types/users"
import * as z from "zod"

export const loginSchema = z.object({
	username: z.string().trim().min(1, "Username is required."),
	password: z.string().min(1, "Password is required."),
	client: z.enum(USER_ROLES),
})
export type LoginValues = z.infer<typeof loginSchema>
