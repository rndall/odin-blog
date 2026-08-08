import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deletePost } from "../api"
import { myPostQueries } from "../queries"

export function useDeletePostMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: deletePost,
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: myPostQueries.lists(),
			})
		},
	})
}
