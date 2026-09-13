import type {
	loginSchema,
	roleLoginSchema,
	signUpSchema,
} from "@odin-blog/schemas/auth"
import type { ValidatedRequest } from "express-zod-safe"

export type SignUpRequest = ValidatedRequest<{
	body: typeof signUpSchema
}>
export type LoginRequest = ValidatedRequest<{
	body: typeof loginSchema
}>
export type RoleLoginRequest = ValidatedRequest<{
	body: typeof roleLoginSchema
}>
