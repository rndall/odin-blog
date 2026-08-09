import { useMutation, useQueryClient } from "@tanstack/react-query"

import { editComment } from "../api"
import { commentQueries } from "../queries"

export function useEditCommentMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: editComment,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: commentQueries.lists() })
		},
	})
}
