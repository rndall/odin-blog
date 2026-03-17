import type { loginSchema } from "@odin-blog/schemas/auth"
import type { ValidatedRequest } from "express-zod-safe"

export type LoginRequest = ValidatedRequest<{ body: typeof loginSchema }>
