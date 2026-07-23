import type { BaseCursor } from "@odin-blog/schemas/pagination"

export const encodeCursor = (payload: BaseCursor): string => {
	const json = JSON.stringify(payload)
	return Buffer.from(json).toString("base64url")
}
