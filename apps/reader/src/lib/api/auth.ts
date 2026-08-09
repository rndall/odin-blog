import type { LoginValues } from '@odin-blog/schemas/auth'
import type { LoginResponse } from '@odin-blog/shared/responses/auth.js'
import type { Request } from '.'

export const auth = (request: Request) => ({
	signIn: (credentials: Omit<LoginValues, 'client'>) =>
		request.post<LoginResponse<'USER'>>('reader/login', credentials)
})
