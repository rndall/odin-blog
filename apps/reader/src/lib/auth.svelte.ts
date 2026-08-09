import type { ReaderWithoutBio } from '@odin-blog/shared/types/users.js'

class AuthStore {
	// biome-ignore lint/style/noNonNullAssertion: returns null on null
	user = $state<ReaderWithoutBio | null>(JSON.parse(localStorage.getItem('user')!))
	token = $state(localStorage.getItem('jwt_token'))

	get isAuthenticated() {
		return !!this.token && !!this.user
	}

	setAuth(token: string, user: ReaderWithoutBio) {
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
}

export const auth = new AuthStore()
