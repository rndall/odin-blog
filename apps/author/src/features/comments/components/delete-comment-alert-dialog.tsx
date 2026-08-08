import { Delete02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "#/components/ui/alert-dialog"
import { Button } from "#/components/ui/button"
import { Spinner } from "#/components/ui/spinner"
import { toast } from "#/components/ui/toast"
import { useDeleteCommentMutation } from "../hooks/use-delete-comment-mutation"

interface DeleteCommentAlertDialogProps {
	postSlug: string
	commentId: number
}

export default function DeleteCommentAlertDialog({
	postSlug,
	commentId,
}: DeleteCommentAlertDialogProps) {
	const deleteCommentMutation = useDeleteCommentMutation()

	const handleDeleteComment = () => {
		deleteCommentMutation.mutate(
			{
				postSlug,
				commentId,
			},
			{
				onSuccess: () => {
					toast.add({
						type: "success",
						description: "Comment has been deleted successfully.",
					})
				},
				onError: (error) => {
					console.error(error)
					toast.add({
						type: "error",
						description: "Error deleting comment.",
					})
				},
			},
		)
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger
				render={
					<Button variant="destructive">
						<HugeiconsIcon data-icon="inline-start" icon={Delete02Icon} />
						Delete
					</Button>
				}
			/>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<HugeiconsIcon icon={Delete02Icon} />
					</AlertDialogMedia>
					<AlertDialogTitle>Delete comment?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete this comment.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={deleteCommentMutation.isPending}
						onClick={handleDeleteComment}
						variant="destructive"
					>
						Delete
						{deleteCommentMutation.isPending && (
							<Spinner data-icon="inline-end" />
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
