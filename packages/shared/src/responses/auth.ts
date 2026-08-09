import type {
	AuthorWithoutBio,
	ReaderWithoutBio,
	UserRole,
} from "../types/users"

export interface LoginResponse<T extends UserRole = UserRole> {
	token: string
	user: T extends "AUTHOR" ? AuthorWithoutBio : ReaderWithoutBio
}
