import { useSuspenseQuery } from "@tanstack/react-query"
import {
	getCoreRowModel,
	type PaginationState,
	useReactTable,
} from "@tanstack/react-table"
import { useDebounce } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"

import { DataTable } from "#/components/ui/data-table/data-table"
import { DataTablePagination } from "#/components/ui/data-table/data-table-pagination"
import { DataTableViewOptions } from "#/components/ui/data-table/data-table-view-options"
import { Input } from "#/components/ui/input"
import { useFilters } from "#/hooks/use-filters"
import { sortToState, stateToSort } from "#/utils/table-sort-mapper"
import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_SORT } from "../api"
import { myPostQueries } from "../queries"
import { columns } from "./columns"

export default function PostsTable() {
	const { filters, setFilters } = useFilters("/_authed/posts/")
	const [search, setSearch] = useState(filters.search ?? "")
	const debouncedSearch = useDebounce(search, 300)

	useEffect(() => {
		if (debouncedSearch === (filters.search ?? "")) return
		setFilters({
			search: debouncedSearch,
			page: DEFAULT_PAGE,
		})
	}, [debouncedSearch, setFilters, filters.search])

	const {
		data: {
			data,
			meta: { total },
		},
	} = useSuspenseQuery(myPostQueries.list(filters))

	const pagination: PaginationState = {
		pageIndex: (filters.page ?? DEFAULT_PAGE) - 1,
		pageSize: filters.limit ?? DEFAULT_LIMIT,
	}
	const sorting = sortToState(filters.sort ?? DEFAULT_SORT)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		rowCount: total,
		state: {
			pagination,
			sorting,
		},
		onPaginationChange: (updaterOrValue) => {
			const nextFilters =
				typeof updaterOrValue === "function"
					? updaterOrValue(pagination)
					: updaterOrValue
			setFilters({
				limit: nextFilters.pageSize,
				page: nextFilters.pageIndex + 1,
			})
		},
		onSortingChange: (updaterOrValue) => {
			const nextFilters =
				typeof updaterOrValue === "function"
					? updaterOrValue(sorting)
					: updaterOrValue
			setFilters({ sort: stateToSort(nextFilters, DEFAULT_SORT) })
		},
		manualSorting: true,
		manualPagination: true,
		manualFiltering: true,
	})

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Search posts..."
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					className="max-w-sm"
				/>
				<DataTableViewOptions table={table} />
			</div>
			<DataTable table={table} />
			<DataTablePagination table={table} />
		</div>
	)
}
