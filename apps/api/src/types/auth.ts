import type { loginSchema, roleLoginSchema } from "@odin-blog/schemas/auth"
import type { ValidatedRequest } from "express-zod-safe"

export type LoginRequest = ValidatedRequest<{
	body: typeof loginSchema
}>
export type RoleLoginRequest = ValidatedRequest<{
	body: typeof roleLoginSchema
}>
