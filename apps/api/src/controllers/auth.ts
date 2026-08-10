import type { Response } from "express"

import {
	generateAuthToken,
	verifyExpectedRole,
	verifyUserCredentials,
} from "@/services/auth"
import type { LoginRequest, RoleLoginRequest } from "@/types/auth"

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
