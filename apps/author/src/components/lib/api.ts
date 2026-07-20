import {
	ForbiddenError,
	HttpError,
	NotFoundError,
	UnauthorizedError,
} from "@odin-blog/shared/errors"

const BASE_URL = import.meta.env.VITE_API_URL

const throwHttpError = async (response: Response): Promise<never> => {
	const errorBody = await response.json().catch(() => null)
	const message = errorBody?.message ?? `Response status: ${response.status}`

	switch (response.status) {
		case 401:
			throw new UnauthorizedError(message)
		case 403:
			throw new ForbiddenError(message)
		case 404:
			throw new NotFoundError(message)
		default:
			throw new HttpError(response.status, message)
	}
}

export const api = async <T>(
	path: string,
	init: RequestInit = {},
): Promise<T> => {
	const token = localStorage.getItem("token")
	const response = await fetch(`${BASE_URL}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...init.headers,
		},
	})

	if (response.status === 401) {
		localStorage.removeItem("token")
	}

	if (!response.ok) {
		await throwHttpError(response)
	}

	return response.json()
}
