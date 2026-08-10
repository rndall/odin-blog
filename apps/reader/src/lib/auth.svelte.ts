import type { User } from '@odin-blog/shared/types/users.ts'
import { api } from './api'

type UserWithoutBio = Omit<User, 'bio'>

class AuthStore {
	// biome-ignore lint/style/noNonNullAssertion: returns null on null
	user = $state<UserWithoutBio | null>(JSON.parse(localStorage.getItem('user')!))
	token = $state(localStorage.getItem('jwt_token'))

	get isAuthenticated() {
		return !!this.token && !!this.user
	}

	setAuth(token: string, user: UserWithoutBio) {
		localStorage.setItem('jwt_token', token)
		localStorage.setItem('user', JSON.stringify(user))
		this.token = token
		this.user = user
	}

	logout() {
		localStorage.removeItem('jwt_token')
		localStorage.removeItem('user')
		this.user = null
		this.token = null
	}

	async validateToken() {
		if (!this.token) {
			this.logout()
			return
		}

		try {
			await api.auth.me()
		} catch (err) {
			console.error('Failed to validate token with server', err)
		}
	}
}

export const auth = new AuthStore()
