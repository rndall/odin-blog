import type { SortingState } from "@tanstack/react-table"

import type { SortParams } from "#/types/api"

export const stateToSort = (
	sorting: SortingState | undefined,
	defaultSort?: SortParams["sort"],
) => {
	if (!sorting || sorting.length === 0) return undefined

	const sort = sorting
		.map((s) => `${s.desc ? "-" : ""}${s.id}`)
		.join(",") as SortParams["sort"]

	return sort === defaultSort ? undefined : sort
}

export const sortToState = (sort: SortParams["sort"] | undefined) => {
	if (!sort) return []

	return sort.split(",").map((s) => ({
		id: s.startsWith("-") ? s.slice(1) : s,
		desc: s.startsWith("-"),
	}))
}
