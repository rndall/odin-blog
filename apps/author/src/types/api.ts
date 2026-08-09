export type PaginationParams = {
	page: number
	limit: number
}
export type SortParams = { sort: `${"-" | "+" | ""}${string}` }
export type Filters<_T> = Partial<PaginationParams & SortParams>
