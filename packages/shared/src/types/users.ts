export interface User<T extends UserRole = UserRole> {
	id: number
	username: string
	fullName: string
	role: T
	bio: T extends "AUTHOR" ? string : null
}

export interface Reader extends User<"USER"> {}
export interface Author extends User<"AUTHOR"> {}

export const USER_ROLES = ["USER", "AUTHOR"] as const
export type UserRole = (typeof USER_ROLES)[number]
