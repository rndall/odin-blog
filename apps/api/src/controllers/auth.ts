import type { Login } from "@odin-blog/schemas/auth"
import bcrypt from "bcryptjs"
import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { env } from "@/config/env"
import { prisma } from "@/lib/prisma"

const JWT_SECRET = env.JWT_SECRET

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body as Login

	const user = await prisma.user.findUnique({ where: { username } })
	const isValid = user && (await bcrypt.compare(password, user.password))

	if (!isValid) {
		return res.status(401).json({ message: "Invalid credentials" })
	}

	const payload = { id: user.id }
	jwt.sign(payload, JWT_SECRET, (err, token) => {
		if (err) {
			return res.status(500).json({ message: "Failed to generate token" })
		}
		res.json({ token })
	})
}
