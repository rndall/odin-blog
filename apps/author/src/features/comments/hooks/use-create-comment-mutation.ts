import type { CommentValues } from "@odin-blog/schemas/comments"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createComment } from "../api"
import { commentQueries } from "../queries"

export function useCreateCommentMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			postSlug,
			comment,
		}: {
			postSlug: string
			comment: CommentValues
		}) => createComment(postSlug, comment),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
			console.log("success")
		},
	})
}
