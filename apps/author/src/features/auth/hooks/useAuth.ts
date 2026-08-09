import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"

import { login } from "../api"
import { authQueries } from "../queries"

export function useAuth() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const token = localStorage.getItem("token")

	const { data, isLoading: isLoadingUser } = useQuery({
		...authQueries.me(),
		enabled: !!token,
	})

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: ({ token, user }) => {
			localStorage.setItem("token", token)
			queryClient.setQueryData(authQueries.me().queryKey, { user })
			// router.invalidate()
		},
		onError: (error) => {
			console.error(error.message)
		},
	})

	const logout = () => {
		localStorage.removeItem("token")
		queryClient.removeQueries({ queryKey: authQueries.me().queryKey })
		router.navigate({ to: "/login" })
	}

	return {
		user: data?.user,
		isAuthenticated: !!data?.user,
		isLoadingUser,
		loginMutation,
		logout,
	}
}
