import { queryOptions } from "@tanstack/react-query"
import { getPosts, type PostsFilter } from "./api"

export const myPostQueries = {
	all: () => ["my-posts"],
	lists: () => [...myPostQueries.all(), "list"],
	list: (filter?: PostsFilter) =>
		queryOptions({
			queryKey: [...myPostQueries.lists(), filter],
			queryFn: () => getPosts(filter),
		}),
}
