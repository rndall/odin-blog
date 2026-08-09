import { queryOptions } from "@tanstack/react-query"

import { validateToken } from "./api"

export const authQueries = {
	all: () => ["auth"],
	me: () =>
		queryOptions({
			queryKey: [...authQueries.all(), "me"],
			queryFn: validateToken,
			staleTime: Infinity,
			retry: false,
		}),
}
