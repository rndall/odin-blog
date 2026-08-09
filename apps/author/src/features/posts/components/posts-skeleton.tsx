import { Item, ItemContent, ItemGroup, ItemTitle } from "#/components/ui/item"
import { Skeleton } from "#/components/ui/skeleton"

export default function PostsSkeleton({
	...props
}: React.ComponentProps<typeof ItemGroup>) {
	return (
		<ItemGroup {...props}>
			{Array.from({ length: 3 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: skeleton loader
				<PostItemSkeleton key={index} />
			))}
		</ItemGroup>
	)
}

function PostItemSkeleton() {
	return (
		<Item className="bg-white" variant="muted">
			<ItemContent>
				<div className="flex items-center gap-2">
					<Skeleton className="h-5 w-21 rounded-sm bg-muted-foreground/15" />
					<Skeleton className="h-4 w-25 bg-muted-foreground/15" />
				</div>
				<ItemTitle className="w-2/5">
					<Skeleton className="h-7 w-full bg-muted-foreground/15" />
				</ItemTitle>
				<div className="space-y-1 pt-1">
					<Skeleton className="h-4 w-full bg-muted-foreground/15" />
					<Skeleton className="h-4 w-3/4 bg-muted-foreground/15" />
				</div>
			</ItemContent>
		</Item>
	)
}
