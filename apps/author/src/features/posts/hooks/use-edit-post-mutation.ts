import { useMutation, useQueryClient } from "@tanstack/react-query"

import { editPost } from "../api"
import { myPostQueries } from "../queries"

export function useEditPostMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: editPost,
		onSuccess: async (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: myPostQueries.detail(variables.postSlug).queryKey,
			})
			await queryClient.invalidateQueries({
				queryKey: myPostQueries.lists(),
			})
		},
	})
}
