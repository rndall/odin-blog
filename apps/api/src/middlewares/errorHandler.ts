import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err);
	res
		.status(err.status || 500)
		.json({ message: err.message || "Server Error" });
};
