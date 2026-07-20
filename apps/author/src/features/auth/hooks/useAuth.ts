import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"

import { login } from "../api"
import { authQueries } from "../queries"

export function useAuth() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const token = localStorage.getItem("token")

	const { data: user, isLoading: isLoadingUser } = useQuery({
		...authQueries.me(),
		enabled: !!token,
	})

	const loginMutation = useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			localStorage.setItem("token", data.token)
			queryClient.setQueryData(authQueries.me().queryKey, data.user)
			router.invalidate()
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
		user,
		isAuthenticated: !!user,
		isLoadingUser,
		loginMutation,
		logout,
	}
}
