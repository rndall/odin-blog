export class HttpError extends Error {
	status: number
	constructor(status: number, message: string) {
		super(message)
		this.status = status
	}
}

export class NotFoundError extends HttpError {
	constructor(message = "Not Found") {
		super(404, message)
		this.name = "NotFoundError"
	}
}

export class ForbiddenError extends HttpError {
	constructor(message = "Forbidden") {
		super(403, message)
		this.name = "ForbiddenError"
	}
}

export class UnauthorizedError extends HttpError {
	constructor(message = "Unauthorized") {
		super(401, message)
		this.name = "UnauthorizedError"
	}
}
