import type { postSchema } from "@odin-blog/schemas/posts"
import type { ValidatedRequest } from "express-zod-safe"
import type { IdParamsRequest } from "."

export type CreatePostRequest = ValidatedRequest<{ body: typeof postSchema }>
export type GetPostRequest = IdParamsRequest
export type DeletePostRequest = IdParamsRequest
