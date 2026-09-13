import type { LoginValues, SignUpValues } from '@odin-blog/schemas/auth'
import type { LoginResponse, SignUpResponse } from '@odin-blog/shared/responses/auth.ts'
import type { User } from '@odin-blog/shared/types/users.ts'

import type { Request } from '.'

export const auth = (request: Request) => ({
	signUp: (credentials: SignUpValues) => request.post<SignUpResponse>('sign-up', credentials),
	signIn: (credentials: LoginValues) => request.post<LoginResponse>('login', credentials),
	me: () => request.get<{ user: User }>('user/me')
})
