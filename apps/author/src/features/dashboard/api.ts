import { api } from "#/lib/api"

interface DashboardRespoonse {
	totalPostCount: number
	publishedPostCount: number
	draftPostCount: number
	commentCount: number
}

export const getDashboard = () => api<DashboardRespoonse>("/dashboard")
