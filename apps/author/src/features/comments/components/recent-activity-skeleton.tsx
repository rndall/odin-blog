import {
	Item,
	ItemContent,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "#/components/ui/item"
import { Skeleton } from "#/components/ui/skeleton"

export default function RecentActivitySkeleton() {
	return (
		<ItemGroup className="gap-2">
			{Array.from({ length: 2 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: skeleton loader
				<li key={index}>
					<ActivityItem />
				</li>
			))}
		</ItemGroup>
	)
}
function ActivityItem() {
	return (
		<Item>
			<ItemMedia>
				<Skeleton className="size-10 rounded-lg bg-muted-foreground/20" />
			</ItemMedia>
			<ItemContent>
				<ItemTitle className="w-auto">
					<Skeleton className="h-5 w-1/2 bg-muted-foreground/20" />
				</ItemTitle>
				<div className="rounded-xs bg-white p-4">
					<div className="space-y-1">
						<Skeleton className="h-4 w-full bg-muted-foreground/25" />
						<Skeleton className="h-4 w-full bg-muted-foreground/25" />
						<Skeleton className="h-4 w-3/5 bg-muted-foreground/25" />
					</div>
				</div>
			</ItemContent>
		</Item>
	)
}
