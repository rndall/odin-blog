import { infiniteQueryOptions } from "@tanstack/react-query"
import { type CommentsFilter, getComments } from "./api"

export const commentQueries = {
	all: () => ["comments"],
	lists: () => [...commentQueries.all(), "list"],
	list: (filter?: CommentsFilter) =>
		infiniteQueryOptions({
			queryKey: [...commentQueries.lists(), filter],
			queryFn: ({ pageParam }) => getComments({ ...filter, cursor: pageParam }),
			initialPageParam: undefined as string | undefined,
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		}),
}
