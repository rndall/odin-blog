import { useMediaQuery } from "usehooks-ts"
import { Card, CardContent, CardHeader } from "#/components/ui/card"
import { Skeleton } from "#/components/ui/skeleton"

export function CardsSkeleton() {
	return (
		<>
			<DashboardCardSkeleton />
			<DashboardCardSkeleton />
			<DashboardCardSkeleton />
			<DashboardCardSkeleton />
		</>
	)
}

function DashboardCardSkeleton() {
	const isMobile = useMediaQuery("(width < 48rem")

	return (
		<Card size={isMobile ? "sm" : "default"} className="rounded-sm">
			<CardHeader className="h-9">
				<Skeleton className="h-5 w-2/3 sm:h-6 xl:h-7" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-9 w-1/3 sm:h-12" />
			</CardContent>
		</Card>
	)
}
