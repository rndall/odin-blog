import type { LoginValues } from "@odin-blog/schemas/auth"
import type { Author } from "@odin-blog/shared/types/users"
import { api } from "#/components/lib/api"

type AuthorWithoutBio = Omit<Author, "bio">

interface LoginResponse {
	token: string
	user: AuthorWithoutBio
}

export const validateToken = () => api<AuthorWithoutBio>("/user/me")

export const login = (credentials: Omit<LoginValues, "client">) =>
	api<LoginResponse>("/author/login", {
		method: "POST",
		body: JSON.stringify(credentials),
	})
