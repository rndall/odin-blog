import { queryOptions } from "@tanstack/react-query"
import {
	DEFAULT_LIMIT,
	DEFAULT_PAGE,
	DEFAULT_SORT,
	getPost,
	getPosts,
	type PostFilters,
} from "./api"

export const myPostQueries = {
	all: () => ["my-posts"],
	lists: () => [...myPostQueries.all(), "list"],
	list: (filters?: PostFilters) => {
		const normalized = {
			page: filters?.page ?? DEFAULT_PAGE,
			limit: filters?.limit ?? DEFAULT_LIMIT,
			sort: filters?.sort ?? DEFAULT_SORT,
			search: filters?.search,
		}

		return queryOptions({
			queryKey: [...myPostQueries.lists(), normalized],
			queryFn: () => getPosts(normalized),
		})
	},
	details: () => [...myPostQueries.all(), "defailt"],
	detail: (slug: string) =>
		queryOptions({
			queryKey: [...myPostQueries.details(), slug],
			queryFn: () => getPost(slug),
		}),
}
