import bcrypt from "bcryptjs"
import type { Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "@/config/env"
import { prisma } from "@/lib/prisma"
import type { LoginRequest } from "@/types/auth"

const JWT_SECRET = env.JWT_SECRET

export const login = async (req: LoginRequest, res: Response) => {
	const { username, password } = req.body

	const user = await prisma.user.findUnique({ where: { username } })
	const isValid = user && (await bcrypt.compare(password, user.password))

	if (!isValid) {
		return res.status(401).json({ message: "Invalid credentials" })
	}

	const payload = { id: user.id }
	jwt.sign(payload, JWT_SECRET, (error, token) => {
		if (error) {
			return res
				.status(500)
				.json({ message: "Failed to generate token", error })
		}
		res.json({ token })
	})
}
