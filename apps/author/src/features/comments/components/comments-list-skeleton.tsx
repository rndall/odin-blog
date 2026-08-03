import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card"
import { Field, FieldGroup } from "#/components/ui/field"
import { Skeleton } from "#/components/ui/skeleton"

export default function CommentsListSkeleton() {
	return (
		<ul className="space-y-7">
			{Array.from({ length: 3 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: skeleton loader
				<li key={index}>
					<CommentCardSkeleton />
				</li>
			))}
		</ul>
	)
}

function CommentCardSkeleton() {
	return (
		<Card>
			<CardHeader className="gap-4">
				<CardTitle className="font-bold font-sans">
					<Skeleton className="h-4 w-24 bg-muted-foreground/15" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="h-3.5 w-30 bg-muted-foreground/15" />
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3.5">
				<Skeleton className="h-3.5 w-1/3 bg-muted-foreground/15" />
				<div className="space-y-3">
					<Skeleton className="h-4 bg-muted-foreground/15" />
					<Skeleton className="h-4 bg-muted-foreground/15" />
					<Skeleton className="h-4 w-3/4 bg-muted-foreground/15" />
				</div>
			</CardContent>
			<CardFooter>
				<FieldGroup>
					<Field orientation="responsive" className="justify-end">
						<Skeleton className="h-9 min-w-23 bg-muted-foreground/15" />
					</Field>
				</FieldGroup>
			</CardFooter>
		</Card>
	)
}
