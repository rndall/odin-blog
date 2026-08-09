import type { LoginValues } from "@odin-blog/schemas/auth"
import type { LoginResponse } from "@odin-blog/shared/responses/auth.ts"
import type { AuthorWithoutBio } from "@odin-blog/shared/types/users.ts"

import { api } from "#/lib/api"

export const validateToken = () => api<{ user: AuthorWithoutBio }>("/user/me")

export const login = (credentials: Omit<LoginValues, "client">) =>
	api<LoginResponse<"AUTHOR">>("/author/login", {
		method: "POST",
		body: credentials,
	})
