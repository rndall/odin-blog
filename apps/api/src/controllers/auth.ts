import bcrypt from "bcryptjs"
import type { Response } from "express"

import { prisma } from "@/lib/prisma"
import {
	generateAuthToken,
	verifyExpectedRole,
	verifyUserCredentials,
} from "@/services/auth"
import type {
	LoginRequest,
	RoleLoginRequest,
	SignUpRequest,
} from "@/types/auth"

export const signUp = async (req: SignUpRequest, res: Response) => {
	const { password, ...rest } = req.body

	const hashedPassword = await bcrypt.hash(password, 10)

	const user = await prisma.user.create({
		data: { ...rest, password: hashedPassword },
	})

	const { password: _, bio, ...userWithoutBio } = user

	const token = generateAuthToken(user.id, user.role)

	return res
		.status(201)
		.json({ message: "User sign up successful", token, user: userWithoutBio })
}

export const login = async (req: LoginRequest, res: Response) => {
	const { username, password } = req.body

	const user = await verifyUserCredentials(username, password)

	const token = generateAuthToken(user.id, user.role)

	return res.json({ token, user })
}

export const roleLogin = async (req: RoleLoginRequest, res: Response) => {
	const { username, password, client } = req.body

	const user = await verifyUserCredentials(username, password)
	verifyExpectedRole(user.role, client)

	const token = generateAuthToken(user.id, user.role)

	return res.json({ token, user })
}
