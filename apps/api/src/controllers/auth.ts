import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "@/config/env"

const JWT_SECRET = env.JWT_SECRET

export const login = (req: Request, res: Response) => {
	const payload = { id: 1 } // TODO: Implement actual login verification
	jwt.sign(payload, JWT_SECRET, (err, token) => {
		if (err) {
			return res.status(500).json({ message: "Failed to generate token" })
		}
		res.json({ token })
	})
}
