import type { ValidatedRequest } from "express-zod-safe"
import type { idSchema } from "@/schemas"

export type IdParamsRequest = ValidatedRequest<{ params: typeof idSchema }>
