import { queryOptions } from "@tanstack/react-query"

import { getDashboard } from "./api"

export const dashboardQueries = {
	all: () => ["dashboard"],
	metrics: () =>
		queryOptions({
			queryKey: [...dashboardQueries.all(), "metrics"],
			queryFn: getDashboard,
		}),
}
