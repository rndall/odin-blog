import { api } from "#/components/lib/api"

interface DashboardRespoonse {
	totalPostCount: number
	publishedPostCount: number
	draftPostCount: number
	commentCount: number
}

export const getDashboard = () => api<DashboardRespoonse>("/dashboard")
