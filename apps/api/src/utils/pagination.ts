import type { CursorPayload } from "@odin-blog/schemas/pagination"

export const encodeCursor = (payload: CursorPayload): string => {
	const json = JSON.stringify(payload)
	return Buffer.from(json).toString("base64url")
}
