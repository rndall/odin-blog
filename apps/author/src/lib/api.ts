import { throwHttpError } from "@odin-blog/shared/utils/api.js"

import { type QueryParams, toQueryParams } from "#/lib/utils"

const BASE_URL = import.meta.env.VITE_API_URL

interface Init extends Omit<RequestInit, "body"> {
	params?: QueryParams
	body?: unknown
}
export const api = async <T>(
	path: string,
	{ params, body, ...init }: Init = {},
): Promise<T> => {
	const token = localStorage.getItem("token")
	const queryString = toQueryParams(params)

	const response = await fetch(`${BASE_URL}${path}${queryString}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...init.headers,
		},
		body: JSON.stringify(body),
	})

	if (response.status === 401) {
		localStorage.removeItem("token")
	}

	if (!response.ok) {
		await throwHttpError(response)
	}

	return response.json()
}
