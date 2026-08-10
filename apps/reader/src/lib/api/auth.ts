import type { LoginValues } from '@odin-blog/schemas/auth'
import type { LoginResponse } from '@odin-blog/shared/responses/auth.ts'
import type { User } from '@odin-blog/shared/types/users.ts'

import type { Request } from '.'

export const auth = (request: Request) => ({
	signIn: (credentials: Omit<LoginValues, 'client'>) =>
		request.post<LoginResponse>('login', credentials),
	me: () => request.get<{ user: User }>('user/me')
})
