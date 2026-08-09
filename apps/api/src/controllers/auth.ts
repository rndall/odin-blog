import type { Response } from "express"

import { generateAuthToken, verifyUserCredentials } from "@/services/auth"
import type { LoginRequest } from "@/types/auth"

export const login = async (req: LoginRequest, res: Response) => {
	const { username, password, client } = req.body

	const user = await verifyUserCredentials(username, password, client)

	const token = generateAuthToken(user.id, client)

	return res.json({ token, user })
}
