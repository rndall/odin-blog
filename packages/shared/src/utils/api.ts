import {
	ForbiddenError,
	HttpError,
	NotFoundError,
	UnauthorizedError,
} from "../errors"

export const throwHttpError = async (response: Response): Promise<never> => {
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
