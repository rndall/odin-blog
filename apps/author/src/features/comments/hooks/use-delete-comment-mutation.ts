import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteComment } from "../api"
import { commentQueries } from "../queries"

export function useDeleteCommentMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			postSlug,
			commentId,
		}: {
			postSlug: string
			commentId: number
		}) => deleteComment(postSlug, commentId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
		},
	})
}
