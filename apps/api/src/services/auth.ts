import { UnauthorizedError } from "@odin-blog/shared/errors"
import { compare } from "bcryptjs"
import type { UserRole } from "generated/prisma/enums"
import jwt from "jsonwebtoken"

import { env } from "@/config/env"
import { prisma } from "@/lib/prisma"

export const generateAuthToken = (userId: number, role: UserRole) => {
	const payload = {
		sub: String(userId),
		role,
	}
	return jwt.sign(payload, env.JWT_SECRET)
}

export const verifyUserCredentials = async (
	username: string,
	password: string,
) => {
	const user = await prisma.user.findUnique({ where: { username } })
	const isValid = user && (await compare(password, user.password))
	if (!isValid) {
		throw new UnauthorizedError("Invalid credentials")
	}

	const { password: _, bio, ...userWithoutPassword } = user
	return userWithoutPassword
}

export const verifyExpectedRole = (role: UserRole, expectedRole: UserRole) => {
	if (role !== expectedRole) {
		throw new UnauthorizedError("Invalid credentials")
	}
}