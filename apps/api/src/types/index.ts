import type { ValidatedRequest } from "express-zod-safe"
import type { idParamsSchema } from "@/schemas"

export type IdParamsRequest = ValidatedRequest<{
	params: typeof idParamsSchema
}>
