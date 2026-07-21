import {
	FileEditIcon,
	GlobalIcon,
	LicenseIcon,
	MessageMultiple02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMediaQuery } from "usehooks-ts"
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card"
import { dashboardQueries } from "../queries"

export function Cards() {
	const {
		data: { commentCount, draftPostCount, publishedPostCount, totalPostCount },
	} = useSuspenseQuery(dashboardQueries.metrics())

	return (
		<>
			<DashboardCard
				title="Total Posts"
				count={totalPostCount}
				icon={
					<div className="rounded-xs bg-primary/20 p-2">
						<HugeiconsIcon
							className="text-primary"
							strokeWidth={2}
							size={20}
							icon={LicenseIcon}
						/>
					</div>
				}
			/>
			<DashboardCard
				title="Published"
				count={publishedPostCount}
				icon={
					<div className="rounded-xs bg-primary/20 p-2">
						<HugeiconsIcon
							className="text-primary"
							strokeWidth={2}
							size={20}
							icon={GlobalIcon}
						/>
					</div>
				}
			/>
			<DashboardCard
				title="Drafts"
				count={draftPostCount}
				icon={
					<div className="rounded-xs bg-tertiary/20 p-2">
						<HugeiconsIcon
							className="text-tertiary"
							strokeWidth={2}
							size={20}
							icon={FileEditIcon}
						/>
					</div>
				}
			/>
			<DashboardCard
				title="Comments"
				count={commentCount}
				icon={
					<div className="rounded-xs bg-primary/20 p-2">
						<HugeiconsIcon
							className="text-primary"
							strokeWidth={2}
							size={20}
							icon={MessageMultiple02Icon}
						/>
					</div>
				}
			/>
		</>
	)
}

interface DashboardCard {
	title: string
	icon: React.ReactElement
	count: number
}

function DashboardCard({ title, icon, count }: DashboardCard) {
	const isMobile = useMediaQuery("(width < 48rem")

	return (
		<Card size={isMobile ? "sm" : "default"} className="rounded-sm">
			<CardHeader>
				<CardTitle className="font-sans text-primary text-sm uppercase sm:text-base xl:text-lg">
					{title}
				</CardTitle>
				<CardAction>{icon}</CardAction>
			</CardHeader>
			<CardContent className="flex flex-1 items-end">
				<p className="font-bold font-heading text-3xl sm:text-5xl">{count}</p>
			</CardContent>
		</Card>
	)
}
