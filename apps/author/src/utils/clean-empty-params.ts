import {
	DEFAULT_LIMIT,
	DEFAULT_PAGE,
} from "#/components/ui/data-table/data-table"

export const cleanEmptyParams = <T extends Record<string, unknown>>(
	search: T,
) => {
	const newSearch = { ...search }
	Object.keys(newSearch).forEach((key) => {
		const value = newSearch[key]
		if (
			value === undefined ||
			value === "" ||
			(typeof value === "number" && Number.isNaN(value))
		)
			delete newSearch[key]
	})

	if (search.page === DEFAULT_PAGE) delete newSearch.page
	if (search.limit === DEFAULT_LIMIT) delete newSearch.limit

	return newSearch
}
