import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Represents any generic object payload valid for query parameters.
 */
export type QueryParams = Record<string, unknown> | object

/**
 * Converts a plain object into a sanitized URL query string.
 * Automatically strips out undefined, null, and empty string values.
 */
export const toQueryParams = <T extends QueryParams>(params?: T): string => {
	if (!params) return ""

	const searchParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			if (Array.isArray(value)) {
				value.forEach((val) => {
					searchParams.append(key, String(val))
				})
			} else {
				searchParams.set(key, String(value))
			}
		}
	})

	const queryString = searchParams.toString()
	return queryString ? `?${queryString}` : ""
}
